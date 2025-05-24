import type { InputUserRegisterDto } from '@src/dto/user/register-dto'
import { UserPrismaRepository } from '@src/repositories/user-repository'
import { Password } from '@src/value-objects/password'
import { ulid } from 'ulid'

export class AuthService {
  constructor(private readonly userRepository = new UserPrismaRepository()) {}

  async register(dto: InputUserRegisterDto): Promise<void> {
    const { email, password } = dto

    const userExists = await this.userRepository.findByEmail(email)

    if (userExists) {
      throw new Error('User already exists')
    }

    const id = ulid()
    const hashedPassword = await Password.create(password)

    await this.userRepository.create({ id, email, password: hashedPassword.value })
  }
}
