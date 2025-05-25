import { BookPrismaRepository } from '../repository/book.repository'
import type { Book } from '@src/infra/database/generated/prisma'

export class CreateBookUseCase {
  constructor(private readonly bookRepository = new BookPrismaRepository()) {}

  async execute(): Promise<Book[]> {
    return await this.bookRepository.findMany()
  }
}
