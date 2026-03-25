"use server"

import { redirect } from "next/navigation"
import { AuthError } from "next-auth"
import bcrypt from "bcryptjs"
import { randomBytes } from "crypto"
import { z, flattenError } from "zod"
import { signIn, signOut } from "@/auth"
import { prisma } from "@/lib/prisma"
import { SignInSchema, SignUpSchema, ResetPasswordSchema } from "@/lib/auth"
import { sendVerificationEmail, sendPasswordResetEmail } from "@/lib/email"

type AuthState = {
  errors?: Record<string, string[] | undefined>
  error?: string
} | undefined

export async function login(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  }

  const validated = SignInSchema.safeParse(data)
  if (!validated.success) return { error: "Dados inválidos" }

  // Pré-check: bloqueia com mensagem específica se e-mail não verificado
  const existingUser = await prisma.user.findUnique({
    where: { email: validated.data.email },
    select: { emailVerified: true },
  })
  if (existingUser && existingUser.emailVerified === null) {
    return { error: "Verifique seu e-mail antes de entrar. Cheque sua caixa de entrada." }
  }

  try {
    await signIn("credentials", { ...validated.data, redirectTo: "/profile" })
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "E-mail ou senha incorretos" }
    }
    throw error // re-throw para o redirect funcionar
  }
}

export async function signup(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const data = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
  }

  const validated = SignUpSchema.safeParse(data)
  if (!validated.success) {
    return { errors: flattenError(validated.error).fieldErrors }
  }

  const { firstName, lastName, email, password } = validated.data

  const existing = await prisma.user.findUnique({
    where: { email },
    select: { id: true, emailVerified: true },
  })

  if (existing) {
    if (existing.emailVerified !== null) {
      return { error: "Este e-mail já está em uso" }
    }
    // Conta não verificada: apaga tokens antigos e reenvía novo link
    await prisma.emailVerificationToken.deleteMany({ where: { userId: existing.id } })
    const token = randomBytes(32).toString("hex")
    await prisma.emailVerificationToken.create({
      data: { token, userId: existing.id, expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) },
    })
    await sendVerificationEmail(email, token)
    redirect("/verify-email")
  }

  const hashedPassword = await bcrypt.hash(password, 12)

  const user = await prisma.user.create({
    data: { firstName, lastName, email, password: hashedPassword },
    select: { id: true },
  })

  const token = randomBytes(32).toString("hex")
  await prisma.emailVerificationToken.create({
    data: { token, userId: user.id, expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) },
  })
  await sendVerificationEmail(email, token)

  redirect("/verify-email")
}

export async function forgotPassword(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const email = formData.get("email")
  const validated = z.string().email("E-mail inválido").safeParse(email)
  if (!validated.success) return { error: "E-mail inválido" }

  const user = await prisma.user.findUnique({
    where: { email: validated.data },
    select: { id: true },
  })

  // Resposta idêntica independente de o e-mail existir (evita enumeração)
  if (!user) redirect("/forgot-password?sent=true")

  await prisma.passwordResetToken.deleteMany({ where: { userId: user.id } })

  const token = randomBytes(32).toString("hex")
  await prisma.passwordResetToken.create({
    data: { token, userId: user.id, expiresAt: new Date(Date.now() + 60 * 60 * 1000) },
  })

  await sendPasswordResetEmail(validated.data, token)
  redirect("/forgot-password?sent=true")
}

export async function resetPassword(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const token = formData.get("token") as string
  const validated = ResetPasswordSchema.safeParse({ password: formData.get("password") })

  if (!validated.success) {
    return { errors: flattenError(validated.error).fieldErrors }
  }

  const record = await prisma.passwordResetToken.findUnique({
    where: { token },
    select: { userId: true, expiresAt: true },
  })

  if (!record || record.expiresAt < new Date()) {
    return { error: "Link inválido ou expirado. Solicite um novo." }
  }

  const hashedPassword = await bcrypt.hash(validated.data.password, 12)

  await prisma.$transaction([
    prisma.user.update({
      where: { id: record.userId },
      data: { password: hashedPassword },
    }),
    prisma.passwordResetToken.delete({ where: { token } }),
  ])

  redirect("/sign-in?reset=true")
}

export async function logout(): Promise<void> {
  await signOut({ redirectTo: "/" })
}
