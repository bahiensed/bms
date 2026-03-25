"use client"

import { useState, useActionState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { requestEmailChange } from "@/app/actions/auth"

export function ChangeEmailForm() {
  const [state, dispatch, isPending] = useActionState(requestEmailChange, undefined)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Alterar e-mail</CardTitle>
        <CardDescription>
          Um link de confirmação será enviado para o novo endereço.
        </CardDescription>
      </CardHeader>

      <form action={dispatch}>
        <CardContent className="flex flex-col gap-4">
          {state?.error && (
            <p className="text-sm text-destructive">{state.error}</p>
          )}
          {state?.success && (
            <p className="text-sm text-green-600">{state.success}</p>
          )}

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="newEmail">Novo e-mail</Label>
            <Input
              id="newEmail"
              name="newEmail"
              type="email"
              placeholder="novo@exemplo.com"
              autoComplete="email"
              aria-invalid={!!state?.errors?.newEmail}
            />
            {state?.errors?.newEmail?.[0] && (
              <p className="text-xs text-destructive">{state.errors.newEmail[0]}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="currentPasswordEmail">Senha atual</Label>
            <InputGroup aria-invalid={!!state?.errors?.currentPassword}>
              <InputGroupInput
                id="currentPasswordEmail"
                name="currentPassword"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                aria-invalid={!!state?.errors?.currentPassword}
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
            {state?.errors?.currentPassword?.[0] && (
              <p className="text-xs text-destructive">{state.errors.currentPassword[0]}</p>
            )}
          </div>
        </CardContent>

        <CardFooter>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Enviando…" : "Alterar e-mail"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
