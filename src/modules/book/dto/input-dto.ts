import { z } from 'zod/v4'

export const inputBookCreateSchema = z.object({
  title: z.string().min(1),
  publishedAt: z.date().optional(),
  borrowed: z.boolean().optional(),
  borrowedTo: z.string().optional(),
  borrowedAt: z.date().optional(),
  authorId: z.ulid(),
  publisherId: z.ulid(),
  locationId: z.ulid(),
  userId: z.ulid()
})

export type InputBookCreateDto = z.infer<typeof inputBookCreateSchema>
