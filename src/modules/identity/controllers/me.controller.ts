import { StatusCodes } from 'http-status-codes'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { GetUserByIdUseCase } from '../use-case/get-user-by-id.use-case'

export const me = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const getUserByIdUseCase = new GetUserByIdUseCase()

    const user = await getUserByIdUseCase.execute(request.user.sub)

    return reply.status(StatusCodes.OK).send({ data: user })
  } catch (error) {
    console.error(error)

    throw error
  }
}
