import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { addressSchema, addressDefaultValues } from './address.schema'

export const ENTITY_TYPES = ['INDIVIDUAL', 'COMPANY'] as const

export const customerSchema = z.object({
  entityType:            z.enum(ENTITY_TYPES),
  name:                  z.string().min(2, 'Mínimo 2 caracteres'),
  tradeName:             z.string().min(2, 'Mínimo 2 caracteres'),
  taxId:                 z.string().min(1, 'Campo obrigatório'),
  stateRegistration:     z.string().nullish(),
  municipalRegistration: z.string().nullish(),
  birthDate:             z.string().nullish(),
  email:                 z.string().email('E-mail inválido'),
  phoneCountryCode:      z.string().min(1, 'DDI obrigatório'),
  phone:                 z.string().min(1, 'Campo obrigatório'),
  notes:                 z.string().nullish(),
  categoryId:            z.string().min(1, 'Categoria obrigatória'),
  isActive:              z.boolean(),
  moduleRecords:         z.boolean().default(false),
  modulePurchasing:      z.boolean().default(false),
  moduleInventory:       z.boolean().default(false),
  moduleFinance:         z.boolean().default(false),
  address:               addressSchema.optional(),
})

export const ownerSchema = z.object({
  firstName: z.string().min(2, 'Mínimo 2 caracteres'),
  lastName:  z.string().min(2, 'Mínimo 2 caracteres'),
  email:     z.string().email('E-mail inválido'),
})

export const customerCreateSchema = customerSchema.extend({
  owner: ownerSchema,
})

export type CustomerFormValues       = z.infer<typeof customerSchema>
export type OwnerFormValues          = z.infer<typeof ownerSchema>
export type CustomerCreateFormValues = z.infer<typeof customerCreateSchema>

export const customerResolver       = zodResolver(customerSchema)
export const customerCreateResolver = zodResolver(customerCreateSchema)

export const ownerDefaultValues: OwnerFormValues = {
  firstName: '',
  lastName:  '',
  email:     '',
}

export const customerDefaultValues: CustomerFormValues = {
  entityType:            'COMPANY',
  name:                  '',
  tradeName:             '',
  taxId:                 '',
  stateRegistration:     '',
  municipalRegistration: '',
  birthDate:             '',
  email:                 '',
  phoneCountryCode:      '55',
  phone:                 '',
  notes:                 '',
  categoryId:            '',
  isActive:              true,
  moduleRecords:         false,
  modulePurchasing:      false,
  moduleInventory:       false,
  moduleFinance:         false,
  address:               addressDefaultValues,
}

export const customerCreateDefaultValues: CustomerCreateFormValues = {
  ...customerDefaultValues,
  owner: ownerDefaultValues,
}
