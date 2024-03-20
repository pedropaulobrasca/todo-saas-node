import { FastifyInstance } from 'fastify'

import { prisma } from '../../lib/prisma.ts'

export async function GetProfile(server: FastifyInstance) {
  server.get('/me', async (request, reply) => {
    try {
      const authCookie = request.cookies.auth

      if (!authCookie) {
        reply.status(401).send({ error: 'Unauthorized' })
        return
      }

      const payload: { userId: string } = await server.jwt.verify(authCookie)

      if (!payload) {
        reply.status(401).send({ error: 'Unauthorized' })
        return
      }

      const user = await prisma.user.findUnique({
        where: {
          id: Number(payload.userId),
        },
      })

      if (!user) {
        reply.status(404).send({ error: 'User not found' })
        return
      }

      reply.status(201).send(user)
    } catch (error) {
      reply.status(400).send({ error })
    }
  })
}
