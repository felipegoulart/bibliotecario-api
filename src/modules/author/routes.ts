import type { FastifyInstance } from 'fastify'
import { create } from './controllers/create.controller'
import { guards } from '@src/helpers/guards'
import { list } from './controllers/list.controller'

export const authorRoutes = async (app: FastifyInstance) => {
  app.route({
    method: 'POST',
    url: '/',
    ...guards(app),
    handler: create
  })

  app.route({
    method: 'GET',
    url: '/',
    ...guards(app),
    handler: list
  })
}
