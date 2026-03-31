import { CustomerForm } from '@/components/customers/customer-form'

export default function NewCustomerPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
        Novo cliente
      </h1>
      <CustomerForm />
    </div>
  )
}
