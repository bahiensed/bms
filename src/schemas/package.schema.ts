import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

export const packageSchema = z.object({
  licenseId:   z.string().min(1, 'Licença obrigatória'),
  name:        z.string().min(2, 'Mínimo 2 caracteres'),
  quantity:    z.coerce.number({ invalid_type_error: 'Quantidade inválida' }).int('Deve ser inteiro').positive('Deve ser maior que zero'),
  description: z.string().optional(),
  price:       z.coerce.number({ invalid_type_error: 'Preço inválido' }).positive('Deve ser maior que zero'),
  isActive:    z.boolean(),
})

export type PackageFormValues = z.infer<typeof packageSchema>

export const packageResolver = zodResolver(packageSchema)

export const packageDefaultValues: PackageFormValues = {
  licenseId:   '',
  name:        '',
  quantity:    1,
  description: '',
  price:       0,
  isActive:    true,
}
