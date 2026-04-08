'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, Controller, useWatch } from 'react-hook-form'
import { toast } from 'sonner'
import {
  customerResolver,
  customerCreateResolver,
  customerDefaultValues,
  customerCreateDefaultValues,
  type CustomerFormValues,
  type CustomerCreateFormValues,
} from '@/schemas/customer.schema'
import { createCustomer, updateCustomer } from '@/actions/customer.actions'
import { maskCpf, maskCnpj, maskPhone } from '@/lib/masks'
import { PHONE_COUNTRY_CODES } from '@/constants/phone-country-codes'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { MaskedInput } from '@/components/ui/masked-input'
import { AddressSection } from '@/components/address/address-section'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '@/components/ui/field'
import { AddCustomerCategoryDialog } from '@/components/customers/add-customer-category-dialog'
import { Checkbox } from '@/components/ui/checkbox'

interface Category {
  id: string
  name: string
}

interface CustomerFormProps {
  id?: string
  defaultValues?: CustomerFormValues
  categories?: Category[]
}

export function CustomerForm({ id, defaultValues, categories = [] }: CustomerFormProps) {
  const isEditing = !!id
  const [serverError, setServerError] = useState<string | null>(null)
  const [localCategories, setLocalCategories] = useState(categories)
  const router = useRouter()

  const form = useForm<CustomerCreateFormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver:      isEditing ? (customerResolver as any) : customerCreateResolver,
    defaultValues: isEditing ? (defaultValues ?? customerDefaultValues) : customerCreateDefaultValues,
  })

  const { control, handleSubmit, setValue, formState: { isSubmitting, errors } } = form

  const entityType = useWatch({ control, name: 'entityType' })
  const isIndividual = entityType === 'INDIVIDUAL'

  async function onSubmit(data: CustomerCreateFormValues) {
    setServerError(null)
    const result = isEditing
      ? await updateCustomer(id, data as CustomerFormValues)
      : await createCustomer(data)
    if ('error' in result) {
      setServerError(result.error)
    } else {
      toast.success(result.success)
      if (!isEditing) router.push('/customers')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
          {isEditing ? 'Editar cliente' : 'Novo cliente'}
        </h1>
        {isEditing && (
          <Controller
            name="isActive"
            control={control}
            render={({ field }) => (
              <div className="flex items-center gap-2">
                <Switch id="isActive" checked={field.value} onCheckedChange={field.onChange} />
                <label htmlFor="isActive" className="text-sm cursor-pointer">Ativo?</label>
              </div>
            )}
          />
        )}
      </div>

      <FieldGroup>
        {/* Tipo */}
        <div className="grid grid-cols-12 gap-3">
          <Controller
            name="entityType"
            control={control}
            render={({ field }) => (
              <Field className="col-span-4">
                <FieldLabel>Tipo:</FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="COMPANY">Pessoa Jurídica</SelectItem>
                    <SelectItem value="INDIVIDUAL">Pessoa Física</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            )}
          />
        </div>

        {/* Nome principal + Nome secundário (labels mudam por tipo) */}
        <div className="grid grid-cols-12 gap-3">
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <Field className="col-span-6" data-invalid={fieldState.invalid}>
                <FieldLabel>{isIndividual ? 'Nome:' : 'Razão Social:'}</FieldLabel>
                <Input {...field} autoComplete="off" aria-invalid={fieldState.invalid} />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name="tradeName"
            control={control}
            render={({ field, fieldState }) => (
              <Field className="col-span-6" data-invalid={fieldState.invalid}>
                <FieldLabel>{isIndividual ? 'Sobrenome:' : 'Nome Fantasia:'}</FieldLabel>
                <Input {...field} autoComplete="off" aria-invalid={fieldState.invalid} />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </div>

        {/* Documento fiscal + campos específicos por tipo */}
        {isIndividual ? (
          <div className="grid grid-cols-12 gap-3">
            <Controller
              name="taxId"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="col-span-6" data-invalid={fieldState.invalid}>
                  <FieldLabel>CPF:</FieldLabel>
                  <MaskedInput
                    value={field.value}
                    onChange={field.onChange}
                    maskFn={maskCpf}
                    autoComplete="off"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="birthDate"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="col-span-6" data-invalid={fieldState.invalid}>
                  <FieldLabel>Data de Nascimento:</FieldLabel>
                  <Input {...field} value={field.value ?? ''} type="date" aria-invalid={fieldState.invalid} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </div>
        ) : (
          <div className="grid grid-cols-12 gap-3">
            <Controller
              name="taxId"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="col-span-4" data-invalid={fieldState.invalid}>
                  <FieldLabel>CNPJ:</FieldLabel>
                  <MaskedInput
                    value={field.value}
                    onChange={field.onChange}
                    maskFn={maskCnpj}
                    autoComplete="off"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="stateRegistration"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="col-span-4" data-invalid={fieldState.invalid}>
                  <FieldLabel>Insc. Estadual:</FieldLabel>
                  <Input {...field} value={field.value ?? ''} autoComplete="off" aria-invalid={fieldState.invalid} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="municipalRegistration"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="col-span-4" data-invalid={fieldState.invalid}>
                  <FieldLabel>Insc. Municipal:</FieldLabel>
                  <Input {...field} value={field.value ?? ''} autoComplete="off" aria-invalid={fieldState.invalid} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </div>
        )}

        {/* E-mail + DDI + Telefone */}
        <div className="grid grid-cols-12 gap-3">
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Field className="col-span-6" data-invalid={fieldState.invalid}>
                <FieldLabel>E-mail:</FieldLabel>
                <Input {...field} type="email" autoComplete="off" aria-invalid={fieldState.invalid} />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name="phoneCountryCode"
            control={control}
            render={({ field }) => (
              <Field className="col-span-2">
                <FieldLabel>DDI:</FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PHONE_COUNTRY_CODES.map((c) => (
                      <SelectItem key={c.code} value={c.code}>{c.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            )}
          />
          <Controller
            name="phone"
            control={control}
            render={({ field, fieldState }) => (
              <Field className="col-span-4" data-invalid={fieldState.invalid}>
                <FieldLabel>Telefone:</FieldLabel>
                <MaskedInput
                  value={field.value}
                  onChange={field.onChange}
                  maskFn={maskPhone}
                  autoComplete="off"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </div>

        {/* Categoria */}
        <Controller
          name="categoryId"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex items-center justify-between">
                <FieldLabel>Categoria:</FieldLabel>
                <AddCustomerCategoryDialog onCreated={(cat) => {
                  setLocalCategories(prev => [...prev, cat])
                  field.onChange(cat.id)
                }} />
              </div>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger aria-invalid={fieldState.invalid}>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {localCategories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Notas */}
        <Controller
          name="notes"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Notas:</FieldLabel>
              <Textarea {...field} value={field.value ?? ''} rows={3} aria-invalid={fieldState.invalid} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

      </FieldGroup>

      <FieldSeparator />

      <p className="text-sm font-medium">Endereço</p>
      <AddressSection
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        control={control as any}
        setValue={setValue}
        errors={errors}
        prefix="address"
      />

      {!isEditing && (
        <>
          <FieldSeparator />

          <p className="text-sm font-medium">Administrador</p>
          <p className="text-sm text-muted-foreground -mt-4">
            Dados de acesso ao sistema Sequoia para o responsável por esta empresa.
          </p>

          <FieldGroup>
            <div className="grid grid-cols-2 gap-3">
              <Controller
                name="owner.firstName"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Nome:</FieldLabel>
                    <Input {...field} autoComplete="given-name" aria-invalid={fieldState.invalid} />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="owner.lastName"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Sobrenome:</FieldLabel>
                    <Input {...field} autoComplete="family-name" aria-invalid={fieldState.invalid} />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </div>
            <Controller
              name="owner.email"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>E-mail:</FieldLabel>
                  <Input {...field} type="email" autoComplete="off" aria-invalid={fieldState.invalid} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
        </>
      )}

      <FieldSeparator />

      <p className="text-sm font-medium">Módulos do Sequoia</p>
      <p className="text-sm text-muted-foreground -mt-4">
        Itens marcados em cinza são sempre acessíveis e não podem ser desativados.
      </p>

      {/* Always-on — 3 colunas, 2 linhas */}
      <div className="grid grid-cols-3 gap-3 max-w-lg">
        {[
          'Dashboard', 'Buy Licenses', 'View Licenses',
          'Customers', 'Sales',        'System',
        ].map((label) => (
          <label key={label} className="flex items-center gap-2 text-sm opacity-60 cursor-not-allowed">
            <Checkbox checked disabled />
            {label}
          </label>
        ))}
      </div>

      {/* Records */}
      <p className="text-sm font-medium mt-2">Records</p>
      <div className="grid grid-cols-3 gap-3 max-w-lg">
        {(
          [
            { name: 'moduleRecordsSuppliers', label: 'Suppliers' },
            { name: 'moduleRecordsProducts',  label: 'Products'  },
            { name: 'moduleRecordsServices',  label: 'Services'  },
          ] as const
        ).map(({ name, label }) => (
          <Controller key={name} name={name} control={control} render={({ field }) => (
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              {label}
            </label>
          )} />
        ))}
        <label className="flex items-center gap-2 text-sm opacity-60 cursor-not-allowed">
          <Checkbox checked disabled />
          Customers
        </label>
      </div>

      {/* Categories */}
      <p className="text-sm font-medium mt-2">Categories</p>
      <div className="grid grid-cols-3 gap-3 max-w-lg">
        {(
          [
            { name: 'moduleCategoriesSuppliers', label: 'Supplier Cat.' },
            { name: 'moduleCategoriesProducts',  label: 'Product Cat.'  },
            { name: 'moduleCategoriesServices',  label: 'Service Cat.'  },
          ] as const
        ).map(({ name, label }) => (
          <Controller key={name} name={name} control={control} render={({ field }) => (
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              {label}
            </label>
          )} />
        ))}
        <label className="flex items-center gap-2 text-sm opacity-60 cursor-not-allowed">
          <Checkbox checked disabled />
          Customer Cat.
        </label>
      </div>

      {/* Purchasing */}
      <p className="text-sm font-medium mt-2">Purchasing</p>
      <div className="grid grid-cols-3 gap-3 max-w-lg">
        <label className="flex items-center gap-2 text-sm opacity-60 cursor-not-allowed">
          <Checkbox checked disabled />
          Buy Licenses
        </label>
        {(
          [
            { name: 'modulePurchasingProducts', label: 'Products' },
            { name: 'modulePurchasingServices', label: 'Services' },
          ] as const
        ).map(({ name, label }) => (
          <Controller key={name} name={name} control={control} render={({ field }) => (
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              {label}
            </label>
          )} />
        ))}
      </div>

      {/* Inventory */}
      <p className="text-sm font-medium mt-2">Inventory</p>
      <div className="grid grid-cols-3 gap-3 max-w-lg">
        <label className="flex items-center gap-2 text-sm opacity-60 cursor-not-allowed">
          <Checkbox checked disabled />
          View Licenses
        </label>
        <Controller name="moduleInventoryProducts" control={control} render={({ field }) => (
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
            Products
          </label>
        )} />
      </div>

      {/* Finance */}
      <p className="text-sm font-medium mt-2">Finance</p>
      <div className="grid grid-cols-3 gap-3 max-w-lg">
        <Controller name="moduleFinance" control={control} render={({ field }) => (
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
            Finance
          </label>
        )} />
      </div>

      {serverError && <FieldError>{serverError}</FieldError>}
      <Field orientation="horizontal">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Salvando…' : isEditing ? 'Salvar alterações' : 'Criar cliente'}
        </Button>
        <Button type="button" variant="outline" onClick={() => form.reset()}>
          Limpar
        </Button>
      </Field>
    </form>
  )
}
