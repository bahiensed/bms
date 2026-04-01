'use client'

import { DataTable } from '@/components/ui/data-table'
import { supplierColumns, type SupplierRow } from './columns'

interface SuppliersDataTableProps {
  data: SupplierRow[]
}

export function SuppliersDataTable({ data }: SuppliersDataTableProps) {
  return (
    <DataTable
      columns={supplierColumns}
      data={data}
      emptyMessage="Nenhum fornecedor encontrado."
    />
  )
}
