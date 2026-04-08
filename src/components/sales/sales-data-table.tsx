'use client'

import { DataTable } from '@/components/ui/data-table'
import { saleColumns, type SaleRow } from './columns'

interface SalesDataTableProps {
  data: SaleRow[]
}

export function SalesDataTable({ data }: SalesDataTableProps) {
  return (
    <DataTable
      columns={saleColumns}
      data={data}
      filterColumn="customer"
      filterPlaceholder="Filtrar por customer…"
      emptyMessage="Nenhuma venda registrada."
    />
  )
}
