import { z } from 'zod/v4'

export const InputAuthorCreateSchema = z.object({
  name: z.string().min(3)
})

export type inputAuthorCreateDto = z.infer<typeof InputAuthorCreateSchema>
