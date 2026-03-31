'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { customerResolver, customerDefaultValues, type CustomerFormValues } from '@/schemas/customer.schema'
import { createCustomer, updateCustomer } from '@/actions/customer.actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

interface CustomerFormProps {
  id?: string
  defaultValues?: CustomerFormValues
}

export function CustomerForm({ id, defaultValues }: CustomerFormProps) {
  const isEditing = !!id
  const [serverError, setServerError] = useState<string | null>(null)

  const { register, control, handleSubmit, formState: { errors, isSubmitting } } = useForm<CustomerFormValues>({
    resolver: customerResolver,
    defaultValues: defaultValues ?? customerDefaultValues,
  })

  async function onSubmit(data: CustomerFormValues) {
    setServerError(null)
    const result = isEditing ? await updateCustomer(id, data) : await createCustomer(data)
    if (result?.error) setServerError(result.error)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-lg">
      {serverError && (
        <p className="text-sm text-destructive">{serverError}</p>
      )}

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="firstName">Nome</Label>
          <Input id="firstName" {...register('firstName')} autoComplete="off" />
          {errors.firstName && <p className="text-xs text-destructive">{errors.firstName.message}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="lastName">Sobrenome</Label>
          <Input id="lastName" {...register('lastName')} autoComplete="off" />
          {errors.lastName && <p className="text-xs text-destructive">{errors.lastName.message}</p>}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">E-mail</Label>
        <Input id="email" type="email" {...register('email')} autoComplete="off" />
        {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
      </div>

      {isEditing && (
        <div className="flex items-center gap-3">
          <Controller
            name="isActive"
            control={control}
            render={({ field }) => (
              <Switch
                id="isActive"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <Label htmlFor="isActive" className="cursor-pointer">Cliente ativo</Label>
        </div>
      )}

      <div className="flex gap-2 pt-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Salvando…' : isEditing ? 'Salvar alterações' : 'Criar cliente'}
        </Button>
        <Button type="button" variant="outline" onClick={() => history.back()}>
          Cancelar
        </Button>
      </div>
    </form>
  )
}
