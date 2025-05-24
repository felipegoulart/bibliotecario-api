import { ulid } from 'ulid'
import type { InputUserLoginDto } from '@src/dto/user/login-dto'
import type { InputUserRegisterDto } from '@src/dto/user/register-dto'
import { UserPrismaRepository } from '@src/repositories/user-repository'
import { Password } from '@src/value-objects/password'

export class AuthService {
  constructor(private readonly userRepository = new UserPrismaRepository()) {}

  async register(dto: InputUserRegisterDto): Promise<void> {
    const { email, password, name } = dto

    const userExists = await this.userRepository.findByEmail(email)

    if (userExists) {
      throw new Error('User already exists')
    }

    const id = ulid()
    const hashedPassword = await Password.create(password)

    await this.userRepository.create({ id, name, email, password: hashedPassword.value })
  }

  async login({ email, password }: InputUserLoginDto): Promise<{ id: string }> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new Error('User not found')
    }

    const isPasswordValid = await Password.compare(password, user.password)

    if (!isPasswordValid) {
      throw new Error('Invalid password')
    }

    return { id: user.id }
  }
}
