"use client"

import { useState, useActionState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
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
import { deleteAccount } from "@/app/actions/auth"

export function DeleteAccountForm() {
  const [state, dispatch, isPending] = useActionState(deleteAccount, undefined)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Card className="w-full border-destructive">
      <CardHeader>
        <CardTitle className="text-destructive">Excluir conta</CardTitle>
        <CardDescription>
          Esta ação é irreversível. Todos os seus dados serão permanentemente apagados.
        </CardDescription>
      </CardHeader>

      <form action={dispatch}>
        <CardContent className="flex flex-col gap-4">
          {state?.error && (
            <p className="text-sm text-destructive">{state.error}</p>
          )}

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="currentPasswordDelete">Senha atual</Label>
            <InputGroup aria-invalid={!!state?.errors?.currentPassword}>
              <InputGroupInput
                id="currentPasswordDelete"
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
          <Button type="submit" variant="destructive" className="w-full" disabled={isPending}>
            {isPending ? "Excluindo…" : "Excluir minha conta"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
