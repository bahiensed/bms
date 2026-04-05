import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { addressSchema, addressDefaultValues } from './address.schema'

export const companySchema = z.object({
  legalName:              z.string().min(2, 'Mínimo 2 caracteres'),
  tradeName:              z.string().min(2, 'Mínimo 2 caracteres'),
  taxId:                  z.string().min(1, 'CNPJ obrigatório'),
  stateRegistration:      z.string().nullish(),
  municipalRegistration:  z.string().nullish(),
  email:                  z.string().email('E-mail inválido'),
  phoneCountryCode:       z.string().min(1, 'DDI obrigatório'),
  phone:                  z.string().min(1, 'Telefone obrigatório'),
  isActive:               z.boolean(),
  address:                addressSchema.optional(),
})

export type CompanyFormValues = z.infer<typeof companySchema>

export const companyResolver = zodResolver(companySchema)

export const companyDefaultValues: CompanyFormValues = {
  legalName:             '',
  tradeName:             '',
  taxId:                 '',
  stateRegistration:     '',
  municipalRegistration: '',
  email:                 '',
  phoneCountryCode:      '55',
  phone:                 '',
  isActive:              true,
  address:               addressDefaultValues,
}
