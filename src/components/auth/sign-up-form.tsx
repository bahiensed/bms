"use client"

import { useState, useActionState } from "react"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group"
import { signup } from "@/app/actions/auth"

export function SignUpForm() {
  const [state, dispatch, isPending] = useActionState(signup, undefined)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Criar conta</CardTitle>
        <CardDescription>Preencha os dados abaixo para criar sua conta.</CardDescription>
      </CardHeader>

      <form action={dispatch}>
        <CardContent className="flex flex-col gap-4">
          {state?.error && (
            <p className="text-sm text-destructive">{state.error}</p>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="firstName">Nome</Label>
              <Input
                id="firstName"
                name="firstName"
                placeholder="João"
                autoComplete="given-name"
                aria-invalid={!!state?.errors?.firstName}
              />
              {state?.errors?.firstName?.[0] && (
                <p className="text-xs text-destructive">{state.errors.firstName[0]}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="lastName">Sobrenome</Label>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Silva"
                autoComplete="family-name"
                aria-invalid={!!state?.errors?.lastName}
              />
              {state?.errors?.lastName?.[0] && (
                <p className="text-xs text-destructive">{state.errors.lastName[0]}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="voce@exemplo.com"
              autoComplete="email"
              aria-invalid={!!state?.errors?.email}
            />
            {state?.errors?.email?.[0] && (
              <p className="text-xs text-destructive">{state.errors.email[0]}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="password">Senha</Label>
            <InputGroup aria-invalid={!!state?.errors?.password}>
              <InputGroupInput
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                aria-invalid={!!state?.errors?.password}
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
            {state?.errors?.password?.[0] && (
              <p className="text-xs text-destructive">{state.errors.password[0]}</p>
            )}
          </div>
        </CardContent>

        <CardFooter className="mt-2 flex flex-col gap-3">
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Criando conta…" : "Criar conta"}
          </Button>
          <p className="text-sm text-muted-foreground text-center">
            Já tem conta?{" "}
            <Link href="/sign-in" className="text-foreground underline underline-offset-4 hover:no-underline">
              Entrar
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}
