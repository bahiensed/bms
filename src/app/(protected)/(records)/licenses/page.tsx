import Link from 'next/link'
import { getLicenses } from '@/queries/licenses'
import { LicensesDataTable } from '@/components/licenses/licenses-data-table'
import { Button } from '@/components/ui/button'

export default async function LicensesPage() {
  const licenses = await getLicenses()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
          Licenças
        </h1>
        <Button asChild>
          <Link href="/licenses/new">Nova licença</Link>
        </Button>
      </div>

      <LicensesDataTable data={licenses} />
    </div>
  )
}
