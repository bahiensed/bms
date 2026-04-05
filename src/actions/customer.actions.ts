'use server'

import { revalidatePath } from 'next/cache'
import { Prisma } from '@/generated/prisma/client'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/dal'
import { customerSchema, type CustomerFormValues } from '@/schemas/customer.schema'

type ActionError = { error: string }
type ActionSuccess = { success: string }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildAddressWrite(address: CustomerFormValues['address']): any {
  if (!address) return undefined
  const hasData = Object.entries(address).some(([k, v]) => k !== 'country' && v)
  if (!hasData && !address.country) return undefined
  return { upsert: { create: address, update: address } }
}

export async function createCustomer(data: CustomerFormValues): Promise<ActionError | ActionSuccess> {
  await verifySession()

  const validated = customerSchema.safeParse(data)
  if (!validated.success) return { error: 'Dados inválidos' }

  const { address, birthDate, categoryId, ...rest } = validated.data

  try {
    await prisma.customer.create({
      data: {
        ...rest,
        birthDate:  birthDate ? new Date(birthDate) : null,
        categoryId: categoryId || null,
        address:    buildAddressWrite(address),
      },
    })
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
      return { error: 'Dados duplicados detectados' }
    }
    throw e
  }

  revalidatePath('/customers')
  return { success: 'Cliente criado com sucesso.' }
}

export async function updateCustomer(id: string, data: CustomerFormValues): Promise<ActionError | ActionSuccess> {
  await verifySession()

  const validated = customerSchema.safeParse(data)
  if (!validated.success) return { error: 'Dados inválidos' }

  const { address, birthDate, categoryId, ...rest } = validated.data

  try {
    await prisma.customer.update({
      where: { id },
      data: {
        ...rest,
        birthDate:  birthDate ? new Date(birthDate) : null,
        categoryId: categoryId || null,
        address:    buildAddressWrite(address),
      },
    })
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2025') {
      return { error: 'Cliente não encontrado.' }
    }
    throw e
  }

  revalidatePath('/customers')
  return { success: 'Cliente atualizado com sucesso.' }
}

export async function deleteCustomer(id: string): Promise<ActionError | void> {
  await verifySession()

  try {
    await prisma.customer.delete({ where: { id } })
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2025') {
      return { error: 'Cliente não encontrado.' }
    }
    throw e
  }

  revalidatePath('/customers')
}

export async function toggleCustomerActive(id: string): Promise<ActionError | void> {
  await verifySession()

  const customer = await prisma.customer.findUnique({ where: { id }, select: { isActive: true } })
  if (!customer) return { error: 'Cliente não encontrado.' }

  await prisma.customer.update({ where: { id }, data: { isActive: !customer.isActive } })
  revalidatePath('/customers')
}
