import { ulid } from 'ulid'
import { AuthorRepository } from '../repositories/author.repository'
import type { Author } from '@src/infra/database/generated/prisma'

export class CreateAuthorUseCase {
  constructor(private readonly authorRepository = new AuthorRepository()) {}

  async execute(name: string): Promise<Author> {
    return await this.authorRepository.create({ id: ulid(), name })
  }
}
