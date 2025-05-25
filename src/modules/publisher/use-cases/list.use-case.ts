import { PublisherRepository } from '../repositories/publisher.repository'
import type { Publisher } from '@src/infra/database/generated/prisma'

export class ListPublisherUseCase {
  constructor(private readonly publisherRepository = new PublisherRepository()) {}

  async execute(): Promise<Publisher[]> {
    return await this.publisherRepository.findMany()
  }
}
