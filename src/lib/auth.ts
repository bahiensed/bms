import { z } from "zod"

export const SignInSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(1, "Senha obrigatória"),
})

export const SignUpSchema = z.object({
  firstName: z.string().min(2, "Nome deve ter ao menos 2 caracteres"),
  lastName: z.string().min(2, "Sobrenome deve ter ao menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  password: z
    .string()
    .min(8, "Senha deve ter ao menos 8 caracteres")
    .regex(/[a-zA-Z]/, "Deve conter ao menos uma letra")
    .regex(/[0-9]/, "Deve conter ao menos um número")
    .regex(/[^a-zA-Z0-9]/, "Deve conter ao menos um caractere especial"),
})

export const ResetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, "Senha deve ter ao menos 8 caracteres")
    .regex(/[a-zA-Z]/, "Deve conter ao menos uma letra")
    .regex(/[0-9]/, "Deve conter ao menos um número")
    .regex(/[^a-zA-Z0-9]/, "Deve conter ao menos um caractere especial"),
})

export const ChangePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Senha atual obrigatória"),
  newPassword: z
    .string()
    .min(8, "Senha deve ter ao menos 8 caracteres")
    .regex(/[a-zA-Z]/, "Deve conter ao menos uma letra")
    .regex(/[0-9]/, "Deve conter ao menos um número")
    .regex(/[^a-zA-Z0-9]/, "Deve conter ao menos um caractere especial"),
})

export const ChangeEmailSchema = z.object({
  newEmail: z.string().email("E-mail inválido"),
  currentPassword: z.string().min(1, "Senha obrigatória"),
})

export const DeleteAccountSchema = z.object({
  currentPassword: z.string().min(1, "Senha obrigatória"),
})

export type SignInInput = z.infer<typeof SignInSchema>
export type SignUpInput = z.infer<typeof SignUpSchema>
export type ResetPasswordInput = z.infer<typeof ResetPasswordSchema>
