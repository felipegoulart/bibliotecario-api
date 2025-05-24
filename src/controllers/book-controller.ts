import type { FastifyReply, FastifyRequest } from 'fastify'

export class BookController {
  async list(request: FastifyRequest, reply: FastifyReply) {
    return reply.status(200).send([])
  }
}
