import dayjs from 'dayjs'
import { FastifyInstance } from 'fastify'

import { prisma } from '../../lib/prisma.ts'
import { AuthenticateFromLinkSchema } from '../../schemas/authenticate-from-link-schema.ts'

export async function AuthenticateFromLink(server: FastifyInstance) {
  server.get('/auth-links/authenticate', async (request, reply) => {
    try {
      const { code, redirect } = AuthenticateFromLinkSchema.parse(request.query)

      const authLinkFromCode = await prisma.authLink.findFirst({
        where: {
          code,
        },
      })

      if (!authLinkFromCode) {
        throw new Error('Auth link not found')
      }

      const daysSinceAuthLinkWasCreated = dayjs().diff(
        authLinkFromCode.createdAt,
        'days',
      )

      if (daysSinceAuthLinkWasCreated > 7) {
        throw new Error('Auth link expired, please generate a new one')
      }

      const token = await reply.jwtSign({
        userId: authLinkFromCode.userId,
      })

      // primeiro apaga o cookie
      reply.clearCookie('auth')

      // depois seta o novo cookie do jeito certo salvando realmente
      reply.setCookie('auth', token, {
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      })

      await prisma.authLink.delete({
        where: {
          code,
        },
      })

      reply.redirect(redirect)
    } catch (error) {
      reply.status(400).send({ error })
    }
  })
}
