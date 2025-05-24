import { AuthController } from '@src/controllers/auth-controller'
import { inputUserRegisterDto } from '@src/dto/user/register-dto'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider, FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

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
}
