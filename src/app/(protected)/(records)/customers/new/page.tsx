import { getCustomerCategories } from '@/queries/customer-categories'
import { CustomerForm } from '@/components/customers/customer-form'

export default async function NewCustomerPage() {
  const categories = await getCustomerCategories()

  return (
    <div className="flex flex-col gap-6">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
        Novo cliente
      </h1>
      <CustomerForm categories={categories} />
    </div>
  )
}
