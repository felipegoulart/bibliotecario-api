import { z } from 'zod/v4'

export const inputBookCreateSchema = z.object({
  authorId: z.ulid(),
  borrowed: z.boolean().optional(),
  borrowedAt: z.date().optional(),
  borrowedTo: z.string().optional(),
  description: z.string().optional(),
  locationId: z.ulid(),
  publishedAt: z.date().optional(),
  publisherId: z.ulid(),
  title: z.string().min(1),
  userId: z.ulid()
})

export type InputBookCreateDto = z.infer<typeof inputBookCreateSchema>
