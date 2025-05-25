import type { FastifyInstance, FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify'
import { authenticate } from './controllers/authenticate.controller'
import { register } from './controllers/register.controller'

export const identityRoutes: FastifyPluginAsync = async (app: FastifyInstance) => {
  app.route({
    method: 'POST',
    url: '/register',
    handler: register
  })

  app.route({
    method: 'POST',
    url: '/login',
    handler: authenticate
  })
}
