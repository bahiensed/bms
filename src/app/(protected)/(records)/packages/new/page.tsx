import { getLicenses } from '@/queries/licenses'
import { PackageForm } from '@/components/packages/package-form'

export default async function NewPackagePage() {
  const licenses = await getLicenses()

  return (
    <div className="flex flex-col gap-6">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
        Novo package
      </h1>
      <PackageForm licenses={licenses} />
    </div>
  )
}
