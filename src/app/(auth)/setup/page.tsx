import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { SetupForm } from '@/components/auth/setup-form'

export default async function SetupPage() {
  const count = await prisma.user.count()
  if (count > 0) redirect('/sign-in')

  return <SetupForm />
}
