import { notFound } from 'next/navigation'
import { getLicense } from '@/queries/licenses'
import { LicenseForm } from '@/components/licenses/license-form'

export default async function EditLicensePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const license = await getLicense(id)
  if (!license) notFound()

  return (
    <div className="flex flex-col gap-6">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
        Editar licença
      </h1>
      <LicenseForm
        id={id}
        defaultValues={{
          component:   license.component,
          description: license.description ?? '',
          isActive:    license.isActive,
        }}
      />
    </div>
  )
}
