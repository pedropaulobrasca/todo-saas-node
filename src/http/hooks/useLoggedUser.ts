import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'

import { prisma } from '../../lib/prisma.ts'

export async function useLoggedUser(
  request: FastifyRequest,
  reply: FastifyReply,
  server: FastifyInstance,
) {
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
  }

  return user
}
