import { AuthService } from '@src/services/auth-service'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'

export class AuthController {
  constructor(private readonly authService = new AuthService()) {}

  async register(request: FastifyRequest<{ Body: { email: string; password: string } }>, reply: FastifyReply) {
    const { email, password } = request.body

    await this.authService.register({ email, password })

    return reply.status(StatusCodes.CREATED).send(ReasonPhrases.CREATED)
  }
}
