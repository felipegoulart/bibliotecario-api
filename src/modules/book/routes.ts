import type { FastifyInstance, FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify'
import { guards } from '@src/helpers/guards'
import { list } from './controllers/list.controller'
import { create } from './controllers/create.controller'

export const bookRoutes: FastifyPluginAsync = async (app: FastifyInstance) => {
  app.route({
    method: 'GET',
    url: '/',
    ...guards(app),
    handler: list
  })

  app.route({
    method: 'POST',
    url: '/',
    ...guards(app),
    handler: create
  })
}
