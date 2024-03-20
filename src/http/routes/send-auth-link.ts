import { createId } from '@paralleldrive/cuid2'
import chalk from 'chalk'
import { FastifyInstance } from 'fastify'

import { env } from '../../env.ts'
import { prisma } from '../../lib/prisma.ts'
import { AuthenticateSchema } from '../../schemas/authenticate-schema.ts'

export async function Authenticate(server: FastifyInstance) {
  server.post('/authenticate', async (request, reply) => {
    try {
      const { email } = AuthenticateSchema.parse(request.body)

      // Verifica se tem user com o email
      const userFromEmail = await prisma.user.findFirst({
        where: {
          email,
        },
      })

      if (!userFromEmail) {
        throw new Error('User not found')
      }

      const authLinkCode = createId()

      await prisma.authLink.create({
        data: {
          userId: userFromEmail.id,
          code: authLinkCode,
        },
      })

      // Aqui futuramente vai vir o envio de email

      const authLink = new URL('/auth-links/authenticate', env.API_BASE_URL)

      authLink.searchParams.set('code', authLinkCode)
      authLink.searchParams.set('redirect', env.AUTH_REDIRECT_URL)

      console.log(chalk.blue('🔓 ' + authLink.toString()))

      reply.status(201).send(1)
    } catch (error) {
      reply.status(400).send({ error })
    }
  })
}
