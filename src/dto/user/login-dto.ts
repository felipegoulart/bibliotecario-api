import { z } from 'zod'

export const inputUserLoginDto = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

export type InputUserLoginDto = z.infer<typeof inputUserLoginDto>
