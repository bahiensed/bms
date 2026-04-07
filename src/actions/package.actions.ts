'use server'

import { revalidatePath } from 'next/cache'
import { Prisma } from '@/generated/prisma/client'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/dal'
import { packageSchema, type PackageFormValues } from '@/schemas/package.schema'

type ActionError   = { error: string }
type ActionSuccess = { success: string }

export async function createPackage(data: PackageFormValues): Promise<ActionError | ActionSuccess> {
  await verifySession()

  const validated = packageSchema.safeParse(data)
  if (!validated.success) return { error: 'Dados inválidos' }

  const { licenseId, price, ...rest } = validated.data

  await prisma.package.create({
    data: {
      ...rest,
      price:   new Prisma.Decimal(price),
      license: { connect: { id: licenseId } },
    },
  })

  revalidatePath('/packages')
  return { success: 'Package criado com sucesso.' }
}

export async function updatePackage(id: string, data: PackageFormValues): Promise<ActionError | ActionSuccess> {
  await verifySession()

  const validated = packageSchema.safeParse(data)
  if (!validated.success) return { error: 'Dados inválidos' }

  const { licenseId, price, ...rest } = validated.data

  try {
    await prisma.package.update({
      where: { id },
      data: {
        ...rest,
        price:   new Prisma.Decimal(price),
        license: { connect: { id: licenseId } },
      },
    })
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2025') {
      return { error: 'Package não encontrado.' }
    }
    throw e
  }

  revalidatePath('/packages')
  return { success: 'Package atualizado com sucesso.' }
}

export async function deletePackage(id: string): Promise<ActionError | void> {
  await verifySession()

  try {
    await prisma.package.delete({ where: { id } })
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2025') {
      return { error: 'Package não encontrado.' }
    }
    throw e
  }

  revalidatePath('/packages')
}

export async function togglePackageActive(id: string): Promise<ActionError | void> {
  await verifySession()

  const pkg = await prisma.package.findUnique({ where: { id }, select: { isActive: true } })
  if (!pkg) return { error: 'Package não encontrado.' }

  await prisma.package.update({ where: { id }, data: { isActive: !pkg.isActive } })
  revalidatePath('/packages')
}
