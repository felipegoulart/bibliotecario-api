import type { Prisma } from '@src/infra/database/generated/prisma'
import { prisma } from '@src/infra/database/prisma'

export class BookPrismaRepository {
  async create(payload: Prisma.BookCreateInput) {
    console.log(payload)
  }

  async findMany() {
    return await prisma.book.findMany()
  }
}
