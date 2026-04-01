import { notFound } from 'next/navigation'
import { getSupplier } from '@/queries/suppliers'
import { SupplierForm } from '@/components/suppliers/supplier-form'

export default async function EditSupplierPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supplier = await getSupplier(id)
  if (!supplier) notFound()

  return (
    <div className="flex flex-col gap-6">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
        Editar fornecedor
      </h1>
      <SupplierForm
        id={id}
        defaultValues={{
          firstName: supplier.firstName,
          lastName:  supplier.lastName,
          email:     supplier.email,
          isActive:  supplier.isActive,
        }}
      />
    </div>
  )
}
