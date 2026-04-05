'use client'

import { DataTable } from '@/components/ui/data-table'
import { customerCategoryColumns, type CustomerCategoryRow } from './columns'

interface CustomerCategoriesDataTableProps {
  data: CustomerCategoryRow[]
}

export function CustomerCategoriesDataTable({ data }: CustomerCategoriesDataTableProps) {
  return (
    <DataTable
      columns={customerCategoryColumns}
      data={data}
      emptyMessage="Nenhuma categoria de cliente encontrada."
    />
  )
}
