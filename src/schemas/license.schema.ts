import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

export const licenseSchema = z.object({
  component:   z.string().min(2, 'Mínimo 2 caracteres'),
  description: z.string().optional(),
  isActive:    z.boolean(),
})

export type LicenseFormValues = z.infer<typeof licenseSchema>

export const licenseResolver = zodResolver(licenseSchema)

export const licenseDefaultValues: LicenseFormValues = {
  component:   '',
  description: '',
  isActive:    true,
}
