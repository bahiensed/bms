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
import { togglePackageActive, deletePackage } from '@/actions/package.actions'

export type PackageRow = {
  id: string
  name: string
  description: string | null
  price: number
  quantity: number
  isActive: boolean
  createdAt: Date
  license: { component: string }
}

function ActionsCell({ row }: { row: { original: PackageRow } }) {
  const [isPending, startTransition] = useTransition()
  const pkg = row.original

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
          <Link href={`/packages/${pkg.id}`}>Editar</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => startTransition(async () => {
            const result = await togglePackageActive(pkg.id)
            if (result?.error) toast.error(result.error)
            else toast.success(pkg.isActive ? 'Package desativado.' : 'Package reativado.')
          })}
        >
          {pkg.isActive ? 'Desativar' : 'Reativar'}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <ConfirmDeleteDialog
          isPending={isPending}
          description={`O package "${pkg.name}" será excluído permanentemente.`}
          onConfirm={() => startTransition(async () => {
            const result = await deletePackage(pkg.id)
            if (result?.error) toast.error(result.error)
            else toast.success('Package excluído com sucesso.')
          })}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

export const packageColumns: ColumnDef<PackageRow>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nome" />,
    cell: ({ row }) => (
      <Link href={`/packages/${row.original.id}`} className="hover:underline">
        {row.original.name}
      </Link>
    ),
  },
  {
    id: 'license',
    accessorFn: (row) => row.license.component,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Licença" />,
    cell: ({ row }) => row.original.license.component,
  },
  {
    accessorKey: 'quantity',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Qtd. Licenças" />,
    cell: ({ row }) => row.original.quantity,
  },
  {
    accessorKey: 'price',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Preço" />,
    cell: ({ row }) => usd.format(row.original.price),
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
        <Badge variant="default">Ativo</Badge>
      ) : (
        <Badge variant="destructive">Inativo</Badge>
      ),
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => <ActionsCell row={row} />,
  },
]
