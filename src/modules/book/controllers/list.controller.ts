import type { FastifyReply, FastifyRequest } from 'fastify'
import { StatusCodes } from 'http-status-codes'
import { ListBookUseCase } from '../use-cases/list.use-case'

export const list = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const listBookUseCase = new ListBookUseCase()

    const books = await listBookUseCase.execute()

    return reply.status(StatusCodes.OK).send({ data: books })
  } catch (error) {
    console.error(error)

    throw error
  }
}
