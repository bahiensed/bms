'use client'

import { DataTable } from './data-table'
import { getColumns, type UserRow } from './columns'

interface UsersDataTableProps {
  currentUserId: string
  data: UserRow[]
}

export function UsersDataTable({ currentUserId, data }: UsersDataTableProps) {
  const columns = getColumns(currentUserId)
  return <DataTable columns={columns} data={data} />
}
