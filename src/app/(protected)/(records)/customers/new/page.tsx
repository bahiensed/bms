import { getCustomerCategories } from '@/queries/customer-categories'
import { CustomerForm } from '@/components/customers/customer-form'

export default async function NewCustomerPage() {
  const categories = await getCustomerCategories()
  return <CustomerForm categories={categories} />
}
