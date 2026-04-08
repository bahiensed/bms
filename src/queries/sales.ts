import 'server-only'

import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/dal'

export async function getSales() {
  await verifySession()

  const rows = await prisma.sale.findMany({
    select: {
      id:       true,
      quantity: true,
      soldAt:   true,
      package: {
        select: { name: true, price: true, quantity: true },
      },
      customer: {
        select: { name: true },
      },
      soldBy: {
        select: { firstName: true, lastName: true },
      },
    },
    orderBy: { soldAt: 'desc' },
  })

  return rows.map(r => ({ ...r, package: { ...r.package, price: Number(r.package.price) } }))
}
