import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { ZodError } from 'zod/v4'

import type { FastifyReply, FastifyRequest } from 'fastify'

import { inputUserRegisterDto, type InputUserRegisterDto } from '../dto/register-dto'
import { RegisterUseCase } from '../use-case/register.user-case'

export const register = async (
  request: FastifyRequest<{ Body: InputUserRegisterDto }>,
  reply: FastifyReply
) => {
  try {
    const { email, password, name } = inputUserRegisterDto.parse(request.body)

    const registerUseCase = new RegisterUseCase()

    await registerUseCase.execute({ email, password, name })

    return reply.status(StatusCodes.CREATED).send({ message: ReasonPhrases.CREATED })
  } catch (error) {
    console.error(error)

    throw error
  }
}
