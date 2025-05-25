import { ulid } from 'ulid'
import { BookPrismaRepository } from '../repository/book.repository'
import type { InputBookCreateDto } from '../dto/create.dto'

export class CreateBookUseCase {
  constructor(private readonly bookRepository = new BookPrismaRepository()) {}

  async execute(dto: InputBookCreateDto) {
    const id = ulid()

    const book = await this.bookRepository.create({
      id,
      ...dto
    })

    return book
  }
}
