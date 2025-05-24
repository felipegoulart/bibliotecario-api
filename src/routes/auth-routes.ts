import { z } from 'zod'

import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider, FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

import { AuthController } from '@src/controllers/auth-controller'
import { inputUserLoginDto } from '@src/dto/user/login-dto'
import { inputUserRegisterDto } from '@src/dto/user/register-dto'

const authController = new AuthController()

export const authRoutes: FastifyPluginAsyncZod = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'POST',
    url: '/register',
    schema: {
      body: inputUserRegisterDto,
      response: {
        201: z.object({
          message: z.string()
        })
      }
    },
    handler: authController.register.bind(authController)
  })

  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'POST',
    url: '/login',
    schema: {
      body: inputUserLoginDto,
      response: {
        200: z.object({
          accessToken: z.string()
        })
      }
    },
    handler: authController.login.bind(authController)
  })
}
