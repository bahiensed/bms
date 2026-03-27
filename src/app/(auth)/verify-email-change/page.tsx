import Link from 'next/link'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

interface Props {
  searchParams: Promise<{ token?: string }>
}

export default async function VerifyEmailChangePage({ searchParams }: Props) {
  const { token } = await searchParams

  if (!token) redirect("/profile")

  const record = await prisma.emailChangeToken.findUnique({
    where: { token },
  })

  if (!record || record.expiresAt < new Date()) {
    if (record) {
      await prisma.emailChangeToken.delete({ where: { token } })
    }
    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Link inválido ou expirado</CardTitle>
          <CardDescription>
            Este link de confirmação não é válido ou já expirou.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Solicite um novo link na página de perfil.
          </p>
        </CardContent>
        <CardFooter>
          <Button asChild variant="outline" className="w-full">
            <Link href="/profile">Ir para o perfil</Link>
          </Button>
        </CardFooter>
      </Card>
    )
  }

  await prisma.$transaction([
    prisma.user.update({
      where: { id: record.userId },
      data: { email: record.newEmail, emailVerified: new Date() },
    }),
    prisma.emailChangeToken.delete({ where: { token } }),
  ])

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>E-mail alterado!</CardTitle>
        <CardDescription>Seu e-mail foi atualizado com sucesso.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Faça login novamente com seu novo endereço de e-mail.
        </p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href="/sign-in">Entrar</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
