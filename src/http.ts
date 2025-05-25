import Fastify from 'fastify'
import fastifyCors from '@fastify/cors'
import fastifyRequestContext from '@fastify/request-context'

import authPlugin from './plugins/auth-plugin'
import { bookRoutes } from './modules/book/routes'
import { env } from './env'
import { identityRoutes } from './modules/identity/routes'
import fastifyJwt from '@fastify/jwt'
import { z, ZodError } from 'zod/v4'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { authorRoutes } from './modules/author/routes'
import { publisherRoutes } from './modules/publisher/routes'
import { locationRoutes } from './modules/location/routes'

const app = Fastify({
  logger: env.NODE_ENV !== 'test'
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '1d'
  }
})

app.register(fastifyCors, {
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
})

app.register(fastifyRequestContext, {
  hook: 'onRequest'
})

app.register(authPlugin)

app.register(identityRoutes, { prefix: '/auth' })
app.register(bookRoutes, { prefix: '/books' })
app.register(authorRoutes, { prefix: '/authors' })
app.register(publisherRoutes, { prefix: '/publishers' })
app.register(locationRoutes, { prefix: '/locations' })

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(StatusCodes.BAD_REQUEST)
      .send({ message: ReasonPhrases.BAD_REQUEST, issues: z.treeifyError(error) })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return reply
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send({ message: ReasonPhrases.INTERNAL_SERVER_ERROR })
})

export { app }
