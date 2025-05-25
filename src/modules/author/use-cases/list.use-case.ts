import { AuthorRepository } from '../repositories/author.repository'
import type { Author } from '@src/infra/database/generated/prisma'

export class ListAuthorUseCase {
  constructor(private readonly authorRepository = new AuthorRepository()) {}

  async execute(): Promise<Author[]> {
    return await this.authorRepository.findMany()
  }
}
