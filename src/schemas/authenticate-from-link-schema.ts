import { z } from 'zod'

export const AuthenticateFromLinkSchema = z.object({
  redirect: z.string().url(),
  code: z.string().cuid2(),
})
