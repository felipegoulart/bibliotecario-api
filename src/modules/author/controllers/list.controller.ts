import type { FastifyReply, FastifyRequest } from 'fastify'
import { StatusCodes } from 'http-status-codes'
import { ListAuthorUseCase } from '../use-cases/list.use-case'

export const list = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const listAuthorUseCase = new ListAuthorUseCase()

    const authors = await listAuthorUseCase.execute()

    reply.status(StatusCodes.OK).send({
      data: authors
    })
  } catch (error) {
    console.log(error)

    throw error
  }
}
