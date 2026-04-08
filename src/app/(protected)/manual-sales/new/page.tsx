import { getActivePackages } from '@/queries/packages'
import { getActiveCustomers } from '@/queries/customers'
import { SaleForm } from '@/components/sales/sale-form'

export default async function NewManualSalePage() {
  const [packages, customers] = await Promise.all([
    getActivePackages(),
    getActiveCustomers(),
  ])

  return <SaleForm packages={packages} customers={customers} />
}
