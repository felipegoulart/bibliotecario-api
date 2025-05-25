import { prisma } from '@src/infra/database/prisma'
import type { Book, Prisma } from '@src/infra/database/generated/prisma'

export class BookPrismaRepository {
  async create(payload: Prisma.BookUncheckedCreateInput): Promise<Book> {
    return await prisma.book.create({ data: payload })
  }

  async findMany(): Promise<Book[]> {
    return await prisma.book.findMany()
  }
}
