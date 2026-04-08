import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

export const saleSchema = z.object({
  packageId:  z.string().min(1, 'Package obrigatório'),
  customerId: z.string().min(1, 'Customer obrigatório'),
  quantity:   z.number().int('Deve ser inteiro').positive('Deve ser maior que zero'),
  soldAt:     z.string().min(1, 'Data obrigatória'),
})

export type SaleFormValues = z.infer<typeof saleSchema>

export const saleResolver = zodResolver(saleSchema)

export const saleDefaultValues: SaleFormValues = {
  packageId:  '',
  customerId: '',
  quantity:   1,
  soldAt:     '',
}
