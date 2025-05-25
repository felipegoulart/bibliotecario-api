import type { Author, Prisma } from '@src/infra/database/generated/prisma'
import { prisma } from '@src/infra/database/prisma'

export class AuthorRepository {
  async create(payload: Prisma.AuthorCreateInput): Promise<Author> {
    return await prisma.author.create({ data: payload })
  }

  async findMany(): Promise<Author[]> {
    return await prisma.author.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
  }
}
