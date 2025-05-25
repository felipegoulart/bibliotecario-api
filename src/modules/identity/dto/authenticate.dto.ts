import { z } from 'zod/v4'

export const inputAuthenticateLoginSchema = z.object({
  email: z.email(),
  password: z.string().min(8)
})

export type inputAuthenticateLoginDto = z.infer<typeof inputAuthenticateLoginSchema>
