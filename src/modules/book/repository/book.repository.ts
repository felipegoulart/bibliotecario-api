import { prisma } from '@src/infra/database/prisma'
import type { Book, Prisma } from '@src/infra/database/generated/prisma'

export class BookPrismaRepository {
  async create(payload: Prisma.BookUncheckedCreateInput): Promise<Book> {
    return await prisma.book.create({ data: payload })
  }

  async findMany() {
    return await prisma.book.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        Publisher: {
          select: {
            id: true,
            name: true
          }
        },
        Author: {
          select: {
            id: true,
            name: true
          }
        },
        Location: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }
}
