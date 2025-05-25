import type { Publisher, Prisma } from '@src/infra/database/generated/prisma'
import { prisma } from '@src/infra/database/prisma'

export class PublisherRepository {
  async create(payload: Prisma.PublisherCreateInput): Promise<Publisher> {
    return await prisma.publisher.create({ data: payload })
  }

  async findMany(): Promise<Publisher[]> {
    return await prisma.publisher.findMany()
  }
}
