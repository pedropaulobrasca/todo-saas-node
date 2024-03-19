import { z } from 'zod'

export const TodoSchema = z.object({
  title: z.string().min(3).max(50),
  userId: z.number(),
  projectId: z.number(),
})
