import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().url().min(1),
  API_BASE_URL: z.string().url(),
  AUTH_REDIRECT_URL: z.string().url(),
})

export const env = envSchema.parse(process.env)
