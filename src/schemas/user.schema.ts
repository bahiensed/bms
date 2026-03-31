import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

export const ASSIGNABLE_ROLES = ['OWNER', 'ADMIN', 'COMERCIAL', 'FINANCE', 'USER'] as const

export const userSchema = z.object({
  firstName: z.string().min(2, 'Mínimo 2 caracteres'),
  lastName:  z.string().min(2, 'Mínimo 2 caracteres'),
  email:     z.string().email('E-mail inválido'),
  role:      z.enum(ASSIGNABLE_ROLES, { error: 'Perfil inválido' }),
  isActive:  z.boolean().default(true),
})

export type UserFormValues = z.infer<typeof userSchema>

export const userResolver = zodResolver(userSchema)

export const userDefaultValues: UserFormValues = {
  firstName: '',
  lastName:  '',
  email:     '',
  role:      'USER',
  isActive:  true,
}
