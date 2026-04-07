import 'server-only'

import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/dal'

export async function getPackages() {
  await verifySession()

  return prisma.package.findMany({
    select: {
      id:          true,
      name:        true,
      description: true,
      price:       true,
      quantity:    true,
      isActive:    true,
      createdAt:   true,
      license: {
        select: { component: true },
      },
    },
    orderBy: { name: 'asc' },
  })
}

export async function getPackage(id: string) {
  await verifySession()

  return prisma.package.findUnique({
    where: { id },
    select: {
      id:          true,
      name:        true,
      description: true,
      price:       true,
      quantity:    true,
      isActive:    true,
      licenseId:   true,
    },
  })
}
