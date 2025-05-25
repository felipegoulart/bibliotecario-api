import Fastify from 'fastify'
import fastifyCors from '@fastify/cors'
import fastifyRequestContext from '@fastify/request-context'

import authPlugin from './plugins/auth-plugin'
import { bookRoutes } from './modules/book/routes'
import { env } from './env'
import { identityRoutes } from './modules/identity/routes'

const app = Fastify({
  logger: env.NODE_ENV !== 'test'
})

app.register(fastifyCors, {
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
})

app.register(fastifyRequestContext, {
  hook: 'onRequest'
})

app.register(authPlugin)

app.register(identityRoutes, { prefix: 'auth' })
app.register(bookRoutes, { prefix: 'books' })

export { app }
