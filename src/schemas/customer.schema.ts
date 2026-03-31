import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

export const customerSchema = z.object({
  firstName: z.string().min(2, 'Mínimo 2 caracteres'),
  lastName:  z.string().min(2, 'Mínimo 2 caracteres'),
  email:     z.string().email('E-mail inválido'),
  isActive:  z.boolean().default(true),
})

export type CustomerFormValues = z.infer<typeof customerSchema>

export const customerResolver = zodResolver(customerSchema)

export const customerDefaultValues: CustomerFormValues = {
  firstName: '',
  lastName:  '',
  email:     '',
  isActive:  true,
}
