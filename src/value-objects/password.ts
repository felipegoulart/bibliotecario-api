import { compare, hash } from 'bcryptjs'

export class Password {
  private constructor(private readonly password: string) {}

  get value(): string {
    return this.password
  }

  static async create(password: string) {
    const hashedPassword = await hash(password, 10)
    return new Password(hashedPassword)
  }

  static fromHash(hash: string) {
    return new Password(hash)
  }

  static async compare(password: string, hash: string) {
    return await compare(password, hash)
  }
}
