import type { FastifyReply, FastifyRequest } from 'fastify'
import { StatusCodes } from 'http-status-codes'
import { InputPublisherCreateSchema } from '../dto/create.dto'
import { CreatePublisherUseCase } from '../use-cases/create.use-case'

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const { name } = InputPublisherCreateSchema.parse(request.body)

  try {
    const createPublisherUseCase = new CreatePublisherUseCase()

    const publisher = await createPublisherUseCase.execute(name)

    reply.status(StatusCodes.CREATED).send({
      data: {
        id: publisher.id,
        name: publisher.name
      }
    })
  } catch (error) {
    console.log(error)

    throw error
  }
}
