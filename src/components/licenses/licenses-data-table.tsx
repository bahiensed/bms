'use client'

import { DataTable } from '@/components/ui/data-table'
import { licenseColumns, type LicenseRow } from './columns'

interface LicensesDataTableProps {
  data: LicenseRow[]
}

export function LicensesDataTable({ data }: LicensesDataTableProps) {
  return (
    <DataTable
      columns={licenseColumns}
      data={data}
      filterColumn="component"
      filterPlaceholder="Filtrar por componente…"
      emptyMessage="Nenhuma licença encontrada."
    />
  )
}
