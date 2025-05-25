import { BookPrismaRepository } from '../repository/book.repository'

export class ListBookUseCase {
  constructor(private readonly bookRepository = new BookPrismaRepository()) {}

  async execute() {
    return await this.bookRepository.findMany()
  }
}
