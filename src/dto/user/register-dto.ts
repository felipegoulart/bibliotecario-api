import { z } from 'zod'

export const inputUserRegisterDto = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

export type InputUserRegisterDto = z.infer<typeof inputUserRegisterDto>
