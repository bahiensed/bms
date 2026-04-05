import { getSupplierCategories } from '@/queries/supplier-categories'
import { SupplierForm } from '@/components/suppliers/supplier-form'

export default async function NewSupplierPage() {
  const categories = await getSupplierCategories()

  return (
    <div className="flex flex-col gap-6">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
        Novo fornecedor
      </h1>
      <SupplierForm categories={categories} />
    </div>
  )
}
