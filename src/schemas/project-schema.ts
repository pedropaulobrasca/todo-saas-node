import { z } from 'zod'

export const ProjectSchema = z.object({
  title: z.string().min(3).max(50),
})
