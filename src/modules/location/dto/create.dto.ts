import { z } from 'zod/v4'

export const InputLocationCreateSchema = z.object({
  name: z.string().min(3),
  description: z.string().optional()
})

export type inputLocationCreateDto = z.infer<typeof InputLocationCreateSchema>
