import { z } from 'zod/v4'

console.log(process.env.PORT)

const EnvSchema = z.object({
  PORT: z.coerce.number(),
  JWT_SECRET: z.base64()
})

export const env = EnvSchema.parse(process.env)
