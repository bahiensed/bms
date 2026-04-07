'use server'

import { revalidatePath } from 'next/cache'
import { Prisma } from '@/generated/prisma/client'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/dal'
import { licenseSchema, type LicenseFormValues } from '@/schemas/license.schema'

type ActionError   = { error: string }
type ActionSuccess = { success: string }

export async function createLicense(data: LicenseFormValues): Promise<ActionError | ActionSuccess> {
  await verifySession()

  const validated = licenseSchema.safeParse(data)
  if (!validated.success) return { error: 'Dados inválidos' }

  await prisma.license.create({ data: validated.data })

  revalidatePath('/licenses')
  return { success: 'Licença criada com sucesso.' }
}

export async function updateLicense(id: string, data: LicenseFormValues): Promise<ActionError | ActionSuccess> {
  await verifySession()

  const validated = licenseSchema.safeParse(data)
  if (!validated.success) return { error: 'Dados inválidos' }

  try {
    await prisma.license.update({ where: { id }, data: validated.data })
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2025') {
      return { error: 'Licença não encontrada.' }
    }
    throw e
  }

  revalidatePath('/licenses')
  return { success: 'Licença atualizada com sucesso.' }
}

export async function deleteLicense(id: string): Promise<ActionError | void> {
  await verifySession()

  try {
    await prisma.license.delete({ where: { id } })
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2025') {
      return { error: 'Licença não encontrada.' }
    }
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2003') {
      return { error: 'Esta licença está em uso por um ou mais packages.' }
    }
    throw e
  }

  revalidatePath('/licenses')
}

export async function toggleLicenseActive(id: string): Promise<ActionError | void> {
  await verifySession()

  const license = await prisma.license.findUnique({ where: { id }, select: { isActive: true } })
  if (!license) return { error: 'Licença não encontrada.' }

  await prisma.license.update({ where: { id }, data: { isActive: !license.isActive } })
  revalidatePath('/licenses')
}
