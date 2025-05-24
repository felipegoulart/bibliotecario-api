import { hash } from 'bcryptjs'

export class Password {
  private constructor(private readonly password: string) {}

  static async create(password: string) {
    const hashedPassword = await hash(password, 10)
    return new Password(hashedPassword)
  }

  static fromHash(hash: string) {
    return new Password(hash)
  }

  get value(): string {
    return this.password
  }
}
