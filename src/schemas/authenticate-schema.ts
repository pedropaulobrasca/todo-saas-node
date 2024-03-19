import { z } from 'zod'

export const AuthenticateSchema = z.object({
  email: z.string().email(),
})
