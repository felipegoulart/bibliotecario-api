import type { FastifyRequest, FastifyReply } from 'fastify'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import { AuthService } from '@src/services/auth-service'
import type { InputUserRegisterDto } from '@src/dto/user/register-dto'
import type { InputUserLoginDto } from '@src/dto/user/login-dto'

export class AuthController {
  constructor(private readonly authService = new AuthService()) {}

  async register(request: FastifyRequest<{ Body: InputUserRegisterDto }>, reply: FastifyReply) {
    const { email, password, name } = request.body

    await this.authService.register({ email, password, name })

    return reply.status(StatusCodes.CREATED).send(ReasonPhrases.CREATED)
  }

  async login(request: FastifyRequest<{ Body: InputUserLoginDto }>, reply: FastifyReply) {
    const { email, password } = request.body

    const id = await this.authService.login({ email, password })

    const accessToken = await reply.jwtSign(
      { sub: id },
      {
        sign: {
          expiresIn: '1d'
        }
      }
    )

    return reply.status(StatusCodes.OK).send({ accessToken })
  }
}
