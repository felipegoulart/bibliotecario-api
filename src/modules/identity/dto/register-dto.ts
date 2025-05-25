import { z } from 'zod/v4'

export const inputUserRegisterDto = z.object({
  email: z.email(),
  password: z.string().min(8),
  name: z.string().min(3)
})

export type InputUserRegisterDto = z.infer<typeof inputUserRegisterDto>
