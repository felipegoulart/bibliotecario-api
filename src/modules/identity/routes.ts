import type { FastifyInstance, FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify'
import { authenticate } from './controllers/authenticate.controller'
import { register } from './controllers/register.controller'
import type { inputAuthenticateLoginDto } from './dto/authenticate.dto'

export const identityRoutes: FastifyPluginAsync = async (app: FastifyInstance) => {
  app.route({
    method: 'POST',
    url: '/register',
    handler: (request: FastifyRequest<{ Body: inputAuthenticateLoginDto }>, reply: FastifyReply) =>
      authenticate(request, reply)
  })

  app.route({
    method: 'POST',
    url: '/login',
    handler: (request: FastifyRequest<{ Body: inputAuthenticateLoginDto }>, reply: FastifyReply) =>
      authenticate(request, reply)
  })
}
