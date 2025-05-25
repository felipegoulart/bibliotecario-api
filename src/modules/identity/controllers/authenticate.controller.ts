import { StatusCodes } from 'http-status-codes'
import { ZodError } from 'zod/v4'

import type { FastifyReply, FastifyRequest } from 'fastify'

import {
  inputAuthenticateLoginSchema,
  type inputAuthenticateLoginDto
} from '../dto/authenticate.dto'
import { AuthenticateUseCase } from '../use-case/authenticate.use-case'

export const authenticate = async (
  request: FastifyRequest<{ Body: inputAuthenticateLoginDto }>,
  reply: FastifyReply
) => {
  const { email, password } = inputAuthenticateLoginSchema.parse(request.body)

  try {
    const authenticateUseCase = new AuthenticateUseCase()
    const { id } = await authenticateUseCase.execute({ email, password })

    const accessToken = await reply.jwtSign(
      { sub: id },
      {
        sign: {
          expiresIn: '1d'
        }
      }
    )

    reply.status(StatusCodes.OK).send({ accessToken })
  } catch (error) {
    console.error(error)

    throw error
  }
}
