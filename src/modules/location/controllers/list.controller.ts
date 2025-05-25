import type { FastifyReply, FastifyRequest } from 'fastify'
import { StatusCodes } from 'http-status-codes'
import { ListLocationUseCase } from '../use-cases/list.use-case'

export const list = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const listLocationUseCase = new ListLocationUseCase()

    const locations = await listLocationUseCase.execute()

    reply.status(StatusCodes.OK).send({
      data: locations
    })
  } catch (error) {
    console.log(error)

    throw error
  }
}
