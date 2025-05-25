import { ulid } from 'ulid'
import { PublisherRepository } from '../repositories/publisher.repository'
import type { Publisher } from '@src/infra/database/generated/prisma'

export class CreatePublisherUseCase {
  constructor(private readonly publisherRepository = new PublisherRepository()) {}

  async execute(name: string): Promise<Publisher> {
    return await this.publisherRepository.create({ id: ulid(), name })
  }
}
