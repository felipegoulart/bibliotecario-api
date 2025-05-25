import type { FastifyReply, FastifyRequest } from 'fastify'
import { StatusCodes } from 'http-status-codes'
import { inputBookCreateSchema, type InputBookCreateDto } from '@src/modules/book/dto/create.dto'
import { z, ZodError } from 'zod/v4'
import { CreateBookUseCase } from '../use-cases/create.use-case'

export const create = async (
  request: FastifyRequest<{ Body: InputBookCreateDto }>,
  reply: FastifyReply
) => {
  const parsedPayload = inputBookCreateSchema.parse(request.body)

  try {
    const createBookUseCase = new CreateBookUseCase()

    const book = await createBookUseCase.execute(parsedPayload)

    return reply.status(StatusCodes.CREATED).send({ data: book })
  } catch (error) {
    if (error instanceof ZodError) {
      return reply.status(StatusCodes.BAD_REQUEST).send({ error: error })
    }
  }
}
