import type { FastifyReply, FastifyRequest } from 'fastify'
import { InputAuthorCreateSchema } from '../dto/create.dto'
import { StatusCodes } from 'http-status-codes'
import { CreateAuthorUseCase } from '../use-cases/create.use-case'

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const { name } = InputAuthorCreateSchema.parse(request.body)

  try {
    const createAuthorUseCase = new CreateAuthorUseCase()

    const author = await createAuthorUseCase.execute(name)

    reply.status(StatusCodes.CREATED).send({
      data: {
        id: author.id,
        name: author.name
      }
    })
  } catch (error) {
    console.log(error)

    throw error
  }
}
