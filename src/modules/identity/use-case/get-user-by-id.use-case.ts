import { UserPrismaRepository } from '@src/modules/identity/repositories/user.repository'
import { Password } from '@src/modules/identity/value-objects/password'
import type { InputUserRegisterDto } from '../dto/register-dto'
import { ulid } from 'ulid'

export class GetUserByIdUseCase {
  constructor(private readonly userRepository = new UserPrismaRepository()) {}

  async execute(id: string) {
    const user = await this.userRepository.findById(id)

    if (!user) {
      throw new Error('User not found')
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email
    }
  }
}
