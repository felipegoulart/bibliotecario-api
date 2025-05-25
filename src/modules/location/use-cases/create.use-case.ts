import { ulid } from 'ulid'
import { LocationRepository } from '../repositories/location.repository'
import type { Location } from '@src/infra/database/generated/prisma'
import type { inputLocationCreateDto } from '../dto/create.dto'

export class CreateLocationUseCase {
  constructor(private readonly locationRepository = new LocationRepository()) {}

  async execute({ name, description }: inputLocationCreateDto): Promise<Location> {
    return await this.locationRepository.create({
      id: ulid(),
      name: name,
      description: description
    })
  }
}
