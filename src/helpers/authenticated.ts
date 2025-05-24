import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'

export const auth = (app: FastifyInstance) => ({
  onRequest: (request: FastifyRequest, reply: FastifyReply) => app.authenticate(request, reply)
})
