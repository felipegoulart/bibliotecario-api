import type { Prisma, User } from '@src/infra/database/generated/prisma'
import { prisma } from '@src/infra/database/prisma'

export class UserPrismaRepository {
  async create(payload: Prisma.UserCreateInput): Promise<void> {
    await prisma.user.create({
      data: payload
    })
  }

  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        email
      }
    })
  }

  async findById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        id
      }
    })
  }
}
