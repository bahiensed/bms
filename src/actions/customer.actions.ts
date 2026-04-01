'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { Prisma } from '@/generated/prisma/client'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/dal'
import { customerSchema, type CustomerFormValues } from '@/schemas/customer.schema'

type ActionError = { error: string }

export async function createCustomer(data: CustomerFormValues): Promise<ActionError | void> {
  await verifySession()

  const validated = customerSchema.safeParse(data)
  if (!validated.success) return { error: 'Dados inválidos' }

  const { firstName, lastName, email } = validated.data

  try {
    await prisma.customer.create({
      data: { firstName, lastName, email },
    })
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
      return { error: 'Este e-mail já está em uso' }
    }
    throw e
  }

  revalidatePath('/customers')
  redirect('/customers')
}

export async function updateCustomer(id: string, data: CustomerFormValues): Promise<ActionError | void> {
  await verifySession()

  const validated = customerSchema.safeParse(data)
  if (!validated.success) return { error: 'Dados inválidos' }

  try {
    const existing = await prisma.customer.findUnique({ where: { email: validated.data.email }, select: { id: true } })
    if (existing && existing.id !== id) return { error: 'Este e-mail já está em uso' }

    await prisma.customer.update({
      where: { id },
      data: validated.data,
    })
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2025') {
      return { error: 'Cliente não encontrado.' }
    }
    throw e
  }

  revalidatePath('/customers')
  redirect('/customers')
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
