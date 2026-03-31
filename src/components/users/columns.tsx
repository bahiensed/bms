'use client'

import Link from 'next/link'
import type { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
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
import { toggleUserActive, deleteUser, resendWelcomeEmail } from '@/actions/user.actions'
import { useTransition } from 'react'

export type UserRow = {
  id: string
  firstName: string
  lastName: string
  email: string
  role: string
  isActive: boolean
  createdAt: Date
}

const ROLE_LABELS: Record<string, string> = {
  SUPER_ADMIN: 'Super Admin',
  OWNER: 'Owner',
  ADMIN: 'Admin',
  COMERCIAL: 'Comercial',
  FINANCE: 'Finance',
  USER: 'User',
}

function ActionsCell({ row, currentUserId }: { row: { original: UserRow }; currentUserId: string }) {
  const [isPending, startTransition] = useTransition()
  const user = row.original
  const isSelf = user.id === currentUserId

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
          <Link href={`/users/${user.id}`}>Editar</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          disabled={isSelf}
          onClick={() => startTransition(async () => { await toggleUserActive(user.id) })}
        >
          {user.isActive ? 'Desativar' : 'Reativar'}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => startTransition(async () => { await resendWelcomeEmail(user.id) })}
        >
          Reenviar e-mail
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive focus:text-destructive"
          disabled={isSelf}
          onClick={() => startTransition(async () => { await deleteUser(user.id) })}
        >
          Excluir
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function getColumns(currentUserId: string): ColumnDef<UserRow>[] {
  return [
    {
      id: 'name',
      accessorFn: (row) => `${row.firstName} ${row.lastName}`,
      header: ({ column }) => <DataTableColumnHeader column={column} title="Nome" />,
      cell: ({ row }) => `${row.original.firstName} ${row.original.lastName}`,
    },
    {
      accessorKey: 'email',
      header: ({ column }) => <DataTableColumnHeader column={column} title="E-mail" />,
    },
    {
      accessorKey: 'role',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Role" />,
      cell: ({ row }) => (
        <Badge variant="secondary">{ROLE_LABELS[row.original.role] ?? row.original.role}</Badge>
      ),
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
      accessorKey: 'createdAt',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Criado em" />,
      cell: ({ row }) =>
        new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' }).format(row.original.createdAt),
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => <ActionsCell row={row} currentUserId={currentUserId} />,
    },
  ]
}
