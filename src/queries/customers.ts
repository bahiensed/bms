import 'server-only'

import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/dal'

export async function getCustomers() {
  await verifySession()

  return prisma.customer.findMany({
    select: {
      id:        true,
      firstName: true,
      lastName:  true,
      email:     true,
      isActive:  true,
      createdAt: true,
    },
    orderBy: { createdAt: 'asc' },
  })
}

export async function getCustomer(id: string) {
  await verifySession()

  return prisma.customer.findUnique({
    where: { id },
    select: {
      id:        true,
      firstName: true,
      lastName:  true,
      email:     true,
      isActive:  true,
    },
  })
}
