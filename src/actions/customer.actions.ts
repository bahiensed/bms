'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/dal'
import { customerSchema, type CustomerFormValues } from '@/schemas/customer.schema'

type ActionError = { error: string }

export async function createCustomer(data: CustomerFormValues): Promise<ActionError | void> {
  await verifySession()

  const validated = customerSchema.safeParse(data)
  if (!validated.success) return { error: 'Dados inválidos' }

  const { firstName, lastName, email } = validated.data

  const existing = await prisma.customer.findUnique({ where: { email }, select: { id: true } })
  if (existing) return { error: 'Este e-mail já está em uso' }

  await prisma.customer.create({
    data: { firstName, lastName, email },
  })

  revalidatePath('/customers')
  redirect('/customers')
}

export async function updateCustomer(id: string, data: CustomerFormValues): Promise<ActionError | void> {
  await verifySession()

  const validated = customerSchema.safeParse(data)
  if (!validated.success) return { error: 'Dados inválidos' }

  const existing = await prisma.customer.findUnique({ where: { email: validated.data.email }, select: { id: true } })
  if (existing && existing.id !== id) return { error: 'Este e-mail já está em uso' }

  await prisma.customer.update({
    where: { id },
    data: validated.data,
  })

  revalidatePath('/customers')
  redirect('/customers')
}

export async function deleteCustomer(id: string): Promise<ActionError | void> {
  await verifySession()

  await prisma.customer.delete({ where: { id } })
  revalidatePath('/customers')
}

export async function toggleCustomerActive(id: string): Promise<ActionError | void> {
  await verifySession()

  const customer = await prisma.customer.findUnique({ where: { id }, select: { isActive: true } })
  if (!customer) return { error: 'Cliente não encontrado.' }

  await prisma.customer.update({ where: { id }, data: { isActive: !customer.isActive } })
  revalidatePath('/customers')
}

export async function getCustomers() {
  await verifySession()

  return prisma.customer.findMany({
    select: {
      id:        true,
      firstName: true,
      lastName:  true,
      email:     true,
      isActive:  true,
      createdAt: true,
    },
    orderBy: { createdAt: 'asc' },
  })
}

export async function getCustomer(id: string) {
  await verifySession()

  return prisma.customer.findUnique({
    where: { id },
    select: {
      id:        true,
      firstName: true,
      lastName:  true,
      email:     true,
      isActive:  true,
    },
  })
}
