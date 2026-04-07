'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'sonner'
import { packageResolver, packageDefaultValues, type PackageFormValues } from '@/schemas/package.schema'
import { createPackage, updatePackage } from '@/actions/package.actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'

interface License {
  id: string
  component: string
}

interface PackageFormProps {
  id?: string
  defaultValues?: PackageFormValues
  licenses?: License[]
}

export function PackageForm({ id, defaultValues, licenses = [] }: PackageFormProps) {
  const isEditing = !!id
  const [serverError, setServerError] = useState<string | null>(null)
  const router = useRouter()

  const form = useForm<PackageFormValues>({
    resolver: packageResolver,
    defaultValues: defaultValues ?? packageDefaultValues,
  })

  const { control, handleSubmit, formState: { isSubmitting } } = form

  async function onSubmit(data: PackageFormValues) {
    setServerError(null)
    const result = isEditing
      ? await updatePackage(id, data)
      : await createPackage(data)
    if ('error' in result) {
      setServerError(result.error)
    } else {
      toast.success(result.success)
      if (!isEditing) router.push('/packages')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 max-w-lg">
      <FieldGroup>
        <Controller
          name="licenseId"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Licença:</FieldLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger aria-invalid={fieldState.invalid}>
                  <SelectValue placeholder="Selecione uma licença" />
                </SelectTrigger>
                <SelectContent>
                  {licenses.map((l) => (
                    <SelectItem key={l.id} value={l.id}>{l.component}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Nome do Pacote:</FieldLabel>
              <Input {...field} autoComplete="off" aria-invalid={fieldState.invalid} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="quantity"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Quantidade de Licenças:</FieldLabel>
              <Input
                type="number"
                step="1"
                min="1"
                {...field}
                value={field.value === 0 ? '' : field.value}
                onChange={(e) => field.onChange(e.target.valueAsNumber)}
                autoComplete="off"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Descrição:</FieldLabel>
              <Textarea {...field} value={field.value ?? ''} rows={3} aria-invalid={fieldState.invalid} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="price"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Preço (US$):</FieldLabel>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 select-none text-muted-foreground">$</span>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  className="pl-7"
                  {...field}
                  value={field.value === 0 ? '' : field.value}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  autoComplete="off"
                  aria-invalid={fieldState.invalid}
                />
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {isEditing && (
          <Controller
            name="isActive"
            control={control}
            render={({ field }) => (
              <Field orientation="horizontal">
                <Switch
                  id="isActive"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <FieldLabel htmlFor="isActive" className="cursor-pointer">Package ativo:</FieldLabel>
              </Field>
            )}
          />
        )}
      </FieldGroup>

      {serverError && <FieldError>{serverError}</FieldError>}
      <Field orientation="horizontal">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Salvando…' : isEditing ? 'Salvar alterações' : 'Criar package'}
        </Button>
        <Button type="button" variant="outline" onClick={() => form.reset()}>
          Limpar
        </Button>
      </Field>
    </form>
  )
}
