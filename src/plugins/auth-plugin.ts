import { fastifyPlugin } from 'fastify-plugin'
import type { FastifyPluginCallback, FastifyReply, FastifyRequest } from 'fastify'
import fastifyJwt from '@fastify/jwt'
import { env } from '@src/env'

declare module 'fastify' {
  export interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>
  }
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: {
      id: string
    }
  }
}

const authPlugin: FastifyPluginCallback = (server, _, done) => {
  server.register(fastifyJwt, { secret: env.JWT_SECRET, sign: { expiresIn: '1d' } })

  server.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify()
    } catch (error) {
      reply.send(error)
    }
  })

  done()
}

export default fastifyPlugin(authPlugin)
