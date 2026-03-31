'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/dal'
import { supplierSchema, type SupplierFormValues } from '@/schemas/supplier.schema'

type ActionError = { error: string }

export async function createSupplier(data: SupplierFormValues): Promise<ActionError | void> {
  await verifySession()

  const validated = supplierSchema.safeParse(data)
  if (!validated.success) return { error: 'Dados inválidos' }

  const { firstName, lastName, email } = validated.data

  const existing = await prisma.supplier.findUnique({ where: { email }, select: { id: true } })
  if (existing) return { error: 'Este e-mail já está em uso' }

  await prisma.supplier.create({
    data: { firstName, lastName, email },
  })

  revalidatePath('/suppliers')
  redirect('/suppliers')
}

export async function updateSupplier(id: string, data: SupplierFormValues): Promise<ActionError | void> {
  await verifySession()

  const validated = supplierSchema.safeParse(data)
  if (!validated.success) return { error: 'Dados inválidos' }

  const existing = await prisma.supplier.findUnique({ where: { email: validated.data.email }, select: { id: true } })
  if (existing && existing.id !== id) return { error: 'Este e-mail já está em uso' }

  await prisma.supplier.update({
    where: { id },
    data: validated.data,
  })

  revalidatePath('/suppliers')
  redirect('/suppliers')
}

export async function deleteSupplier(id: string): Promise<ActionError | void> {
  await verifySession()

  await prisma.supplier.delete({ where: { id } })
  revalidatePath('/suppliers')
}

export async function toggleSupplierActive(id: string): Promise<ActionError | void> {
  await verifySession()

  const supplier = await prisma.supplier.findUnique({ where: { id }, select: { isActive: true } })
  if (!supplier) return { error: 'Fornecedor não encontrado.' }

  await prisma.supplier.update({ where: { id }, data: { isActive: !supplier.isActive } })
  revalidatePath('/suppliers')
}

export async function getSuppliers() {
  await verifySession()

  return prisma.supplier.findMany({
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

export async function getSupplier(id: string) {
  await verifySession()

  return prisma.supplier.findUnique({
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
