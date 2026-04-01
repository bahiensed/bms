'use client'

import { DataTable } from '@/components/ui/data-table'
import { customerColumns, type CustomerRow } from './columns'

interface CustomersDataTableProps {
  data: CustomerRow[]
}

export function CustomersDataTable({ data }: CustomersDataTableProps) {
  return (
    <DataTable
      columns={customerColumns}
      data={data}
      emptyMessage="Nenhum cliente encontrado."
    />
  )
}
