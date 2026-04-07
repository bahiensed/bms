import { LicenseForm } from '@/components/licenses/license-form'

export default function NewLicensePage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
        Nova licença
      </h1>
      <LicenseForm />
    </div>
  )
}
