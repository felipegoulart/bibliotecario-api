import type { FastifyReply, FastifyRequest } from 'fastify'
import { StatusCodes } from 'http-status-codes'
import { InputLocationCreateSchema } from '../dto/create.dto'
import { CreateLocationUseCase } from '../use-cases/create.use-case'

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const parsedPayload = InputLocationCreateSchema.parse(request.body)

  try {
    const createLocationUseCase = new CreateLocationUseCase()

    const location = await createLocationUseCase.execute(parsedPayload)

    reply.status(StatusCodes.CREATED).send({
      data: {
        id: location.id,
        name: location.name,
        description: location.description
      }
    })
  } catch (error) {
    console.log(error)

    throw error
  }
}
