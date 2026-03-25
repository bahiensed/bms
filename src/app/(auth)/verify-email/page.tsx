import Link from "next/link"
import { prisma } from "@/lib/prisma"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Props {
  searchParams: Promise<{ token?: string }>
}

export default async function VerifyEmailPage({ searchParams }: Props) {
  const { token } = await searchParams

  // Sem token — usuário chegou aqui após o sign-up
  if (!token) {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Verifique seu e-mail</CardTitle>
          <CardDescription>E-mail de confirmação enviado.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Clique no link que enviamos para confirmar sua conta. O link expira em 24 horas.
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

  const record = await prisma.emailVerificationToken.findUnique({
    where: { token },
  })

  // Token inválido ou expirado
  if (!record || record.expiresAt < new Date()) {
    if (record) {
      await prisma.emailVerificationToken.delete({ where: { token } })
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
            Crie uma nova conta para receber um novo link de confirmação.
          </p>
        </CardContent>
        <CardFooter>
          <Button asChild variant="outline" className="w-full">
            <Link href="/sign-up">Criar conta</Link>
          </Button>
        </CardFooter>
      </Card>
    )
  }

  // Token válido — marca usuário como verificado e apaga o token atomicamente
  await prisma.$transaction([
    prisma.user.update({
      where: { id: record.userId },
      data: { emailVerified: new Date() },
    }),
    prisma.emailVerificationToken.delete({ where: { token } }),
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
