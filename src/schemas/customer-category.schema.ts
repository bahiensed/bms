import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

export const customerCategorySchema = z.object({
  name:        z.string().min(2, 'Mínimo 2 caracteres'),
  description: z.string().optional(),
  isActive:    z.boolean(),
})

export type CustomerCategoryFormValues = z.infer<typeof customerCategorySchema>

export const customerCategoryResolver = zodResolver(customerCategorySchema)

export const customerCategoryDefaultValues: CustomerCategoryFormValues = {
  name:        '',
  description: '',
  isActive:    true,
}
