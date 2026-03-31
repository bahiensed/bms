import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

export const supplierSchema = z.object({
  firstName: z.string().min(2, 'Mínimo 2 caracteres'),
  lastName:  z.string().min(2, 'Mínimo 2 caracteres'),
  email:     z.string().email('E-mail inválido'),
  isActive:  z.boolean().default(true),
})

export type SupplierFormValues = z.infer<typeof supplierSchema>

export const supplierResolver = zodResolver(supplierSchema)

export const supplierDefaultValues: SupplierFormValues = {
  firstName: '',
  lastName:  '',
  email:     '',
  isActive:  true,
}
