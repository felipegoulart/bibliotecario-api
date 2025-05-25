import type { FastifyReply, FastifyRequest } from 'fastify'
import { StatusCodes } from 'http-status-codes'

export const list = async (request: FastifyRequest, reply: FastifyReply) => {
  return reply.status(StatusCodes.OK).send([])
}
