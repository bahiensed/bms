import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

export const supplierCategorySchema = z.object({
  name:        z.string().min(2, 'Mínimo 2 caracteres'),
  description: z.string().optional(),
  isActive:    z.boolean(),
})

export type SupplierCategoryFormValues = z.infer<typeof supplierCategorySchema>

export const supplierCategoryResolver = zodResolver(supplierCategorySchema)

export const supplierCategoryDefaultValues: SupplierCategoryFormValues = {
  name:        '',
  description: '',
  isActive:    true,
}
