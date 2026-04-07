'use client'

import { DataTable } from '@/components/ui/data-table'
import { packageColumns, type PackageRow } from './columns'

interface PackagesDataTableProps {
  data: PackageRow[]
}

export function PackagesDataTable({ data }: PackagesDataTableProps) {
  return (
    <DataTable
      columns={packageColumns}
      data={data}
      emptyMessage="Nenhum package encontrado."
    />
  )
}
