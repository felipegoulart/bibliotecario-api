import type { FastifyReply, FastifyRequest } from 'fastify'
import { StatusCodes } from 'http-status-codes'
import { inputBookCreateSchema, type InputBookCreateDto } from '@src/modules/book/dto/input-dto'
import { z, ZodError } from 'zod/v4'

export const create = async (
  request: FastifyRequest<{ Body: InputBookCreateDto }>,
  reply: FastifyReply
) => {
  try {
    // TODO: Should create repository
    const {
      authorId,
      title,
      locationId,
      publisherId,
      userId,
      borrowed,
      borrowedAt,
      borrowedTo,
      publishedAt
    } = inputBookCreateSchema.parse(request.body)

    return reply.status(StatusCodes.CREATED).send()
  } catch (error) {
    if (error instanceof ZodError) {
      return reply.status(StatusCodes.BAD_REQUEST).send({ error: error })
    }
  }
}
