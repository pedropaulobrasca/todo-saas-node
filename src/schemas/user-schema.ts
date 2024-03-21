import { z } from 'zod'

export const UserSchema = z.object({
  name: z.string().min(3).max(50),
  email: z.string().email(),
})

export const UserSchemaWithAllFields = UserSchema.extend({
  id: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
