import type { FastifyReply, FastifyRequest } from 'fastify'
import { StatusCodes } from 'http-status-codes'
import { ListPublisherUseCase } from '../use-cases/list.use-case'

export const list = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const listPublisherUseCase = new ListPublisherUseCase()

    const publishers = await listPublisherUseCase.execute()

    reply.status(StatusCodes.CREATED).send({
      data: publishers
    })
  } catch (error) {
    console.log(error)

    throw error
  }
}
