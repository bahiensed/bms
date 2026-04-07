import { notFound } from 'next/navigation'
import { getPackage } from '@/queries/packages'
import { getLicenses } from '@/queries/licenses'
import { PackageForm } from '@/components/packages/package-form'

export default async function EditPackagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [pkg, licenses] = await Promise.all([getPackage(id), getLicenses()])
  if (!pkg) notFound()

  return (
    <div className="flex flex-col gap-6">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
        Editar package
      </h1>
      <PackageForm
        id={id}
        licenses={licenses}
        defaultValues={{
          licenseId:   pkg.licenseId,
          name:        pkg.name,
          quantity:    pkg.quantity,
          description: pkg.description ?? '',
          price:       Number(pkg.price),
          isActive:    pkg.isActive,
        }}
      />
    </div>
  )
}
