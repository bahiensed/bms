'use client'

import Link from 'next/link'
import type { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import { useTransition } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header'
import { ConfirmDeleteDialog } from '@/components/ui/confirm-delete-dialog'
import { toggleCustomerCategoryActive, deleteCustomerCategory } from '@/actions/customer-category.actions'

export type CustomerCategoryRow = {
  id: string
  name: string
  description: string | null
  isActive: boolean
  createdAt: Date
}

function ActionsCell({ row }: { row: { original: CustomerCategoryRow } }) {
  const [isPending, startTransition] = useTransition()
  const category = row.original

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" disabled={isPending}>
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Abrir menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={`/customer-categories/${category.id}`}>Editar</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => startTransition(async () => {
            const result = await toggleCustomerCategoryActive(category.id)
            if (result?.error) toast.error(result.error)
            else toast.success(category.isActive ? 'Categoria desativada.' : 'Categoria reativada.')
          })}
        >
          {category.isActive ? 'Desativar' : 'Reativar'}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <ConfirmDeleteDialog
          isPending={isPending}
          description={`A categoria "${category.name}" será excluída permanentemente.`}
          onConfirm={() => startTransition(async () => {
            const result = await deleteCustomerCategory(category.id)
            if (result?.error) toast.error(result.error)
            else toast.success('Categoria excluída com sucesso.')
          })}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const customerCategoryColumns: ColumnDef<CustomerCategoryRow>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nome" />,
    cell: ({ row }) => (
      <Link href={`/customer-categories/${row.original.id}`} className="hover:underline">
        {row.original.name}
      </Link>
    ),
  },
  {
    accessorKey: 'description',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Descrição" />,
    cell: ({ row }) => row.original.description ?? '—',
  },
  {
    accessorKey: 'isActive',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) =>
      row.original.isActive ? (
        <Badge variant="default">Ativa</Badge>
      ) : (
        <Badge variant="destructive">Inativa</Badge>
      ),
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Criado em" />,
    cell: ({ row }) =>
      new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' }).format(row.original.createdAt),
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => <ActionsCell row={row} />,
  },
]
