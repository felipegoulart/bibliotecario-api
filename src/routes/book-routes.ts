import { BookController } from '@src/controllers/book-controller'
import { auth } from '@src/helpers/authenticated'
import type { FastifyInstance, FastifyPluginAsync } from 'fastify'

const bookController = new BookController()

export const bookRoutes: FastifyPluginAsync = async (app: FastifyInstance) => {
  app.route({
    method: 'GET',
    url: '/',
    handler: bookController.list.bind(bookController)
  })
}
