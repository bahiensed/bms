import 'server-only'

import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/dal'

export async function getUsers() {
  await verifySession()

  return prisma.user.findMany({
    select: {
      id:        true,
      firstName: true,
      lastName:  true,
      email:     true,
      role:      true,
      isActive:  true,
      createdAt: true,
    },
    orderBy: { createdAt: 'asc' },
  })
}

export async function getUser(id: string) {
  await verifySession()

  return prisma.user.findUnique({
    where: { id },
    select: {
      id:        true,
      firstName: true,
      lastName:  true,
      email:     true,
      role:      true,
      isActive:  true,
    },
  })
}
