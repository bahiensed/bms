'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { Prisma } from '@/generated/prisma/client'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/dal'
import { supplierSchema, type SupplierFormValues } from '@/schemas/supplier.schema'

type ActionError = { error: string }

export async function createSupplier(data: SupplierFormValues): Promise<ActionError | void> {
  await verifySession()

  const validated = supplierSchema.safeParse(data)
  if (!validated.success) return { error: 'Dados inválidos' }

  const { firstName, lastName, email } = validated.data

  try {
    await prisma.supplier.create({
      data: { firstName, lastName, email },
    })
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
      return { error: 'Este e-mail já está em uso' }
    }
    throw e
  }

  revalidatePath('/suppliers')
  redirect('/suppliers')
}

export async function updateSupplier(id: string, data: SupplierFormValues): Promise<ActionError | void> {
  await verifySession()

  const validated = supplierSchema.safeParse(data)
  if (!validated.success) return { error: 'Dados inválidos' }

  try {
    const existing = await prisma.supplier.findUnique({ where: { email: validated.data.email }, select: { id: true } })
    if (existing && existing.id !== id) return { error: 'Este e-mail já está em uso' }

    await prisma.supplier.update({
      where: { id },
      data: validated.data,
    })
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2025') {
      return { error: 'Fornecedor não encontrado.' }
    }
    throw e
  }

  revalidatePath('/suppliers')
  redirect('/suppliers')
}

export async function deleteSupplier(id: string): Promise<ActionError | void> {
  await verifySession()

  try {
    await prisma.supplier.delete({ where: { id } })
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2025') {
      return { error: 'Fornecedor não encontrado.' }
    }
    throw e
  }

  revalidatePath('/suppliers')
}

export async function toggleSupplierActive(id: string): Promise<ActionError | void> {
  await verifySession()

  const supplier = await prisma.supplier.findUnique({ where: { id }, select: { isActive: true } })
  if (!supplier) return { error: 'Fornecedor não encontrado.' }

  await prisma.supplier.update({ where: { id }, data: { isActive: !supplier.isActive } })
  revalidatePath('/suppliers')
}
