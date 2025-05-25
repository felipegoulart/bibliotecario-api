import { UserPrismaRepository } from '@src/modules/identity/repositories/user.repository'
import { Password } from '@src/modules/identity/value-objects/password'
import type { InputUserRegisterDto } from '../dto/register-dto'
import { ulid } from 'ulid'

export class RegisterUseCase {
  constructor(private readonly userRepository = new UserPrismaRepository()) {}

  async execute(dto: InputUserRegisterDto) {
    const { email, password, name } = dto

    const userExists = await this.userRepository.findByEmail(email)

    if (userExists) {
      throw new Error('User already exists')
    }

    const id = ulid()
    const hashedPassword = await Password.create(password)

    await this.userRepository.create({ id, name, email, password: hashedPassword.value })
  }
}
