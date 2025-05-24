import Fastify from 'fastify'
import fastifyCors from '@fastify/cors'
import fastifyRequestContext from '@fastify/request-context'
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'
import { authRoutes } from './routes/auth-routes'
import { bookRoutes } from './routes/book-routes'
import authPlugin from './plugins/auth-plugin'
import { env } from './env'

const app = Fastify({
  logger: env.NODE_ENV !== 'test'
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyCors, {
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
})

app.register(fastifyRequestContext, {
  hook: 'onRequest'
})

app.register(authPlugin)

app.register(authRoutes, { prefix: 'auth' })
app.register(bookRoutes, { prefix: 'books' })

export { app }
