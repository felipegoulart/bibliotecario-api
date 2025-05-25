import type { FastifyInstance, FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify'

import { guards } from '@src/helpers/guards'
import { list } from './controllers/list.controller'
import { create } from './controllers/create.controller'
import type { InputBookCreateDto } from './dto/input-dto'

export const bookRoutes: FastifyPluginAsync = async (app: FastifyInstance) => {
  app.route({
    method: 'GET',
    url: '/',
    ...guards(app),
    handler: (request: FastifyRequest, reply: FastifyReply) => list(request, reply)
  })

  app.route({
    method: 'POST',
    url: '/',
    ...guards(app),
    handler: (request: FastifyRequest<{ Body: InputBookCreateDto }>, reply: FastifyReply) =>
      create(request, reply)
  })
}
