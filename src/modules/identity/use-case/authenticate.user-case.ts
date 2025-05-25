import { UserPrismaRepository } from '@src/modules/identity/repositories/user.repository'
import { Password } from '@src/modules/identity/value-objects/password'
import type { inputAuthenticateLoginDto } from '../dto/authenticate.dto'

export class AuthenticateUseCase {
  constructor(private readonly userRepository = new UserPrismaRepository()) {}

  async execute({ email, password }: inputAuthenticateLoginDto) {
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
