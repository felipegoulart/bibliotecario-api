import type { FastifyInstance, FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify'
import { authenticate } from './controllers/authenticate.controller'
import { register } from './controllers/register.controller'
import { guards } from '@src/helpers/guards'
import { me } from './controllers/me.controller'

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

  app.route({
    method: 'GET',
    url: '/me',
    ...guards(app),
    handler: me
  })
}
