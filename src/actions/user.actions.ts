'use server'

import { randomBytes } from 'crypto'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
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

  const existing = await prisma.user.findUnique({ where: { email }, select: { id: true } })
  if (existing) return { error: 'Este e-mail já está em uso' }

  const user = await prisma.user.create({
    data: { firstName, lastName, email, role, password: null, emailVerified: new Date() },
    select: { id: true },
  })

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

  const existing = await prisma.user.findUnique({ where: { email: validated.data.email }, select: { id: true } })
  if (existing && existing.id !== id) return { error: 'Este e-mail já está em uso' }

  await prisma.user.update({
    where: { id },
    data: validated.data,
  })

  revalidatePath('/users')
  redirect('/users')
}

export async function deleteUser(userId: string): Promise<ActionError | void> {
  const session = await verifySession()

  if (session.user!.id === userId) return { error: 'Você não pode excluir sua própria conta.' }

  await prisma.user.delete({ where: { id: userId } })
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

  const user = await prisma.user.findUnique({ where: { id: userId }, select: { email: true } })
  if (!user) return { error: 'Usuário não encontrado.' }

  await prisma.passwordResetToken.deleteMany({ where: { userId } })

  const token = randomBytes(32).toString('hex')
  await prisma.passwordResetToken.create({
    data: { token, userId, expiresAt: new Date(Date.now() + 72 * 60 * 60 * 1000) },
  })

  await sendWelcomeEmail(user.email, token)
}

export async function getUsers() {
  await verifySession()

  return prisma.user.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
    },
    orderBy: { createdAt: 'asc' },
  })
}

export async function getUser(id: string) {
  await verifySession()

  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      role: true,
      isActive: true,
    },
  })
}
