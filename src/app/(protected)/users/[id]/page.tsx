import { notFound } from 'next/navigation'
import { getUser } from '@/queries/users'
import { UserForm } from '@/components/users/user-form'

export default async function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const user = await getUser(id)
  if (!user) notFound()

  return (
    <div className="flex flex-col gap-6">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
        Editar usuário
      </h1>
      <UserForm
        id={id}
        defaultValues={{
          firstName: user.firstName,
          lastName:  user.lastName,
          email:     user.email,
          role:      user.role as 'OWNER' | 'ADMIN' | 'COMERCIAL' | 'FINANCE' | 'USER',
          isActive:  user.isActive,
        }}
      />
    </div>
  )
}
