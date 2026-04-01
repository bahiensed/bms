'use server'

import { randomBytes } from 'crypto'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { Prisma } from '@/generated/prisma/client'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/dal'
import { sendWelcomeEmail } from '@/lib/email'
import { userSchema, type UserFormValues } from '@/schemas/user.schema'

type ActionError = { error: string }

export async function createUser(data: UserFormValues): Promise<ActionError | void> {
  await verifySession()

  const validated = userSchema.safeParse(data)
  if (!validated.success) return { error: 'Dados inválidos' }

  const { firstName, lastName, email, role } = validated.data

  let user: { id: string }
  try {
    user = await prisma.user.create({
      data: { firstName, lastName, email, role, password: null, emailVerified: new Date() },
      select: { id: true },
    })
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
      return { error: 'Este e-mail já está em uso' }
    }
    throw e
  }

  const token = randomBytes(32).toString('hex')
  await prisma.passwordResetToken.create({
    data: { token, userId: user.id, expiresAt: new Date(Date.now() + 72 * 60 * 60 * 1000) },
  })

  await sendWelcomeEmail(email, token)

  revalidatePath('/users')
  redirect('/users')
}

export async function updateUser(id: string, data: UserFormValues): Promise<ActionError | void> {
  await verifySession()

  const validated = userSchema.safeParse(data)
  if (!validated.success) return { error: 'Dados inválidos' }

  try {
    const existing = await prisma.user.findUnique({ where: { email: validated.data.email }, select: { id: true } })
    if (existing && existing.id !== id) return { error: 'Este e-mail já está em uso' }

    await prisma.user.update({
      where: { id },
      data: validated.data,
    })
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2025') {
      return { error: 'Usuário não encontrado.' }
    }
    throw e
  }

  revalidatePath('/users')
  redirect('/users')
}

export async function deleteUser(userId: string): Promise<ActionError | void> {
  const session = await verifySession()

  if (session.user!.id === userId) return { error: 'Você não pode excluir sua própria conta.' }

  try {
    await prisma.user.delete({ where: { id: userId } })
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2025') {
      return { error: 'Usuário não encontrado.' }
    }
    throw e
  }

  revalidatePath('/users')
}

export async function toggleUserActive(userId: string): Promise<ActionError | void> {
  const session = await verifySession()

  if (session.user!.id === userId) return { error: 'Você não pode desativar sua própria conta.' }

  const user = await prisma.user.findUnique({ where: { id: userId }, select: { isActive: true } })
  if (!user) return { error: 'Usuário não encontrado.' }

  await prisma.user.update({ where: { id: userId }, data: { isActive: !user.isActive } })
  revalidatePath('/users')
}

export async function resendWelcomeEmail(userId: string): Promise<ActionError | void> {
  await verifySession()

  const user = await prisma.user.findUnique({ where: { id: userId }, select: { email: true, password: true } })
  if (!user) return { error: 'Usuário não encontrado.' }
  if (user.password) return { error: 'Este usuário já definiu sua senha.' }

  await prisma.passwordResetToken.deleteMany({ where: { userId } })

  const token = randomBytes(32).toString('hex')
  await prisma.passwordResetToken.create({
    data: { token, userId, expiresAt: new Date(Date.now() + 72 * 60 * 60 * 1000) },
  })

  await sendWelcomeEmail(user.email, token)
}
