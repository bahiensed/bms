import { notFound } from 'next/navigation'
import { getCustomer } from '@/actions/customer.actions'
import { CustomerForm } from '@/components/customers/customer-form'

export default async function EditCustomerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const customer = await getCustomer(id)
  if (!customer) notFound()

  return (
    <div className="flex flex-col gap-6">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
        Editar cliente
      </h1>
      <CustomerForm
        id={id}
        defaultValues={{
          firstName: customer.firstName,
          lastName:  customer.lastName,
          email:     customer.email,
          isActive:  customer.isActive,
        }}
      />
    </div>
  )
}
