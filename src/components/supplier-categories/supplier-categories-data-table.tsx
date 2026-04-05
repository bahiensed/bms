'use client'

import { DataTable } from '@/components/ui/data-table'
import { supplierCategoryColumns, type SupplierCategoryRow } from './columns'

interface SupplierCategoriesDataTableProps {
  data: SupplierCategoryRow[]
}

export function SupplierCategoriesDataTable({ data }: SupplierCategoriesDataTableProps) {
  return (
    <DataTable
      columns={supplierCategoryColumns}
      data={data}
      emptyMessage="Nenhuma categoria de fornecedor encontrada."
    />
  )
}
