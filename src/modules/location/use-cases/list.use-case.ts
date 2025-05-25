import { LocationRepository } from '../repositories/location.repository'
import type { Location } from '@src/infra/database/generated/prisma'
import type { inputLocationCreateDto } from '../dto/create.dto'

export class ListLocationUseCase {
  constructor(private readonly locationRepository = new LocationRepository()) {}

  async execute(): Promise<Location[]> {
    return await this.locationRepository.findMany()
  }
}
