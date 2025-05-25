import type { Location, Prisma } from '@src/infra/database/generated/prisma'
import { prisma } from '@src/infra/database/prisma'

export class LocationRepository {
  async create(payload: Prisma.LocationCreateInput): Promise<Location> {
    return await prisma.location.create({ data: payload })
  }

  async findMany(): Promise<Location[]> {
    return await prisma.location.findMany()
  }

  async findOne(id: string): Promise<Location | null> {
    return await prisma.location.findUnique({ where: { id } })
  }
}
