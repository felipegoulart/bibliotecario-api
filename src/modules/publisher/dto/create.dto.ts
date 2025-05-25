import { z } from 'zod/v4'

export const InputPublisherCreateSchema = z.object({
  name: z.string().min(3)
})

export type inputPublisherCreateDto = z.infer<typeof InputPublisherCreateSchema>
