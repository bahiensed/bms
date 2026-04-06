'use server'

import { randomBytes } from 'crypto'
import { revalidatePath } from 'next/cache'
import { Prisma } from '@/generated/prisma/client'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/dal'
import { sendSequoiaWelcomeEmail } from '@/lib/email'
import {
  customerSchema,
  customerCreateSchema,
  type CustomerFormValues,
  type CustomerCreateFormValues,
} from '@/schemas/customer.schema'

type ActionError = { error: string }
type ActionSuccess = { success: string }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildAddressWrite(address: CustomerFormValues['address']): any {
  if (!address) return undefined
  const hasData = Object.entries(address).some(([k, v]) => k !== 'country' && v)
  if (!hasData && !address.country) return undefined
  return { upsert: { create: address, update: address } }
}

export async function createCustomer(data: CustomerCreateFormValues): Promise<ActionError | ActionSuccess> {
  await verifySession()

  const validated = customerCreateSchema.safeParse(data)
  if (!validated.success) return { error: 'Dados inválidos' }

  const { address, birthDate, categoryId, owner, ...rest } = validated.data

  const existingOwner = await prisma.user.findUnique({ where: { email: owner.email }, select: { id: true } })
  if (existingOwner) return { error: 'Este e-mail de administrador já está em uso' }

  let token: string
  try {
    ;({ token } = await prisma.$transaction(async (tx) => {
      const customer = await tx.customer.create({
        data: {
          ...rest,
          birthDate:  birthDate ? new Date(birthDate) : null,
          categoryId: categoryId || null,
          address:    buildAddressWrite(address),
        },
        select: { id: true },
      })

      const user = await tx.user.create({
        data: {
          firstName:     owner.firstName,
          lastName:      owner.lastName,
          email:         owner.email,
          role:          'OWNER',
          customerId:    customer.id,
          password:      null,
          emailVerified: new Date(),
        },
        select: { id: true },
      })

      const t = randomBytes(32).toString('hex')
      await tx.passwordResetToken.create({
        data: { token: t, userId: user.id, expiresAt: new Date(Date.now() + 72 * 60 * 60 * 1000) },
      })

      return { token: t }
    }))
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
      return { error: 'Dados duplicados detectados' }
    }
    throw e
  }

  await sendSequoiaWelcomeEmail(owner.email, token)

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
