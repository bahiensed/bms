import Link from "next/link"
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"
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
  searchParams: Promise<{ sent?: string }>
}

export default async function ForgotPasswordPage({ searchParams }: Props) {
  const { sent } = await searchParams

  if (sent === "true") {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>E-mail enviado</CardTitle>
          <CardDescription>
            Se este e-mail estiver cadastrado, você receberá um link em breve.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Verifique sua caixa de entrada. O link expira em 1 hora.
          </p>
        </CardContent>
        <CardFooter>
          <Button asChild variant="outline" className="w-full">
            <Link href="/sign-in">Voltar para o login</Link>
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return <ForgotPasswordForm />
}
