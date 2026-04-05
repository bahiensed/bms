import { notFound } from 'next/navigation'
import { getCustomer } from '@/queries/customers'
import { getCustomerCategories } from '@/queries/customer-categories'
import { CustomerForm } from '@/components/customers/customer-form'

export default async function EditCustomerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [customer, categories] = await Promise.all([
    getCustomer(id),
    getCustomerCategories(),
  ])
  if (!customer) notFound()

  return (
    <div className="flex flex-col gap-6">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
        Editar cliente
      </h1>
      <CustomerForm
        id={id}
        categories={categories}
        defaultValues={{
          entityType:            customer.entityType as 'INDIVIDUAL' | 'COMPANY',
          name:                  customer.name,
          tradeName:             customer.tradeName,
          taxId:                 customer.taxId,
          stateRegistration:     customer.stateRegistration     ?? '',
          municipalRegistration: customer.municipalRegistration ?? '',
          birthDate:             customer.birthDate ? customer.birthDate.toISOString().slice(0, 10) : '',
          email:                 customer.email,
          phoneCountryCode:      customer.phoneCountryCode,
          phone:                 customer.phone,
          notes:                 customer.notes                 ?? '',
          categoryId:            customer.categoryId            ?? '',
          isActive:              customer.isActive,
          address: customer.address ? {
            zip:          customer.address.zip          ?? '',
            street:       customer.address.street       ?? '',
            number:       customer.address.number       ?? '',
            complement:   customer.address.complement   ?? '',
            neighborhood: customer.address.neighborhood ?? '',
            city:         customer.address.city         ?? '',
            state:        customer.address.state        ?? '',
            country:      customer.address.country      ?? 'BR',
          } : undefined,
        }}
      />
    </div>
  )
}
