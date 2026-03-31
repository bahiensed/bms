import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

interface Props {
  searchParams: Promise<{ token?: string }>
}

export default async function VerifyEmailPage({ searchParams }: Props) {
  const { token } = await searchParams

  if (!token) {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Verifique seu e-mail</CardTitle>
          <CardDescription>E-mail de confirmação enviado.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Clique no link que enviamos para confirmar. O link expira em 1 hora.
          </p>
        </CardContent>
        <CardFooter>
          <Button asChild variant="outline" className="w-full">
            <Link href="/sign-in">Ir para o login</Link>
          </Button>
        </CardFooter>
      </Card>
    )
  }

  const record = await prisma.emailToken.findUnique({
    where: { token },
  })

  if (!record || record.expiresAt < new Date()) {
    if (record) {
      await prisma.emailToken.delete({ where: { token } })
    }
    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Link inválido ou expirado</CardTitle>
          <CardDescription>
            Este link de verificação não é válido ou já expirou.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Solicite um novo link na página de perfil.
          </p>
        </CardContent>
        <CardFooter>
          <Button asChild variant="outline" className="w-full">
            <Link href="/sign-in">Ir para o login</Link>
          </Button>
        </CardFooter>
      </Card>
    )
  }

  if (record.type === 'CHANGE') {
    await prisma.$transaction([
      prisma.user.update({
        where: { id: record.userId },
        data: { email: record.newEmail!, emailVerified: new Date() },
      }),
      prisma.emailToken.delete({ where: { token } }),
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

  // VERIFICATION
  await prisma.$transaction([
    prisma.user.update({
      where: { id: record.userId },
      data: { emailVerified: new Date() },
    }),
    prisma.emailToken.delete({ where: { token } }),
  ])

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>E-mail confirmado!</CardTitle>
        <CardDescription>Sua conta foi verificada com sucesso.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Você já pode entrar com seu e-mail e senha.
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
