import { getLicenses } from '@/queries/licenses'
import { PackageForm } from '@/components/packages/package-form'

export default async function NewPackagePage() {
  const licenses = await getLicenses()
  return <PackageForm licenses={licenses} />
}
