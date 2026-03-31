'use client'

import { useState, useActionState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group'
import { setupSuperAdmin } from '@/actions/auth'

export function SetupForm() {
  const [state, dispatch, isPending] = useActionState(setupSuperAdmin, undefined)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Configuração inicial</CardTitle>
        <CardDescription>Crie a conta do administrador principal do sistema.</CardDescription>
      </CardHeader>

      <form action={dispatch}>
        <CardContent className="flex flex-col gap-4">
          {state?.error && (
            <p className="text-sm text-destructive">{state.error}</p>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="firstName">Nome:</Label>
              <Input
                id="firstName"
                name="firstName"
                placeholder="Ada"
                autoComplete="given-name"
                aria-invalid={!!state?.errors?.firstName}
              />
              {state?.errors?.firstName?.[0] && (
                <p className="text-xs text-destructive">{state.errors.firstName[0]}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="lastName">Sobrenome:</Label>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Lovelace"
                autoComplete="family-name"
                aria-invalid={!!state?.errors?.lastName}
              />
              {state?.errors?.lastName?.[0] && (
                <p className="text-xs text-destructive">{state.errors.lastName[0]}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">E-mail:</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="admin@empresa.com"
              autoComplete="email"
              aria-invalid={!!state?.errors?.email}
            />
            {state?.errors?.email?.[0] && (
              <p className="text-xs text-destructive">{state.errors.email[0]}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="password">Senha:</Label>
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

        <CardFooter className="mt-6">
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Configurando…" : "Criar administrador"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
