import 'server-only'

import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/dal'

export async function getSuppliers() {
  await verifySession()

  return prisma.supplier.findMany({
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

export async function getSupplier(id: string) {
  await verifySession()

  return prisma.supplier.findUnique({
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
