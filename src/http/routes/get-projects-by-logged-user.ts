import { FastifyInstance } from 'fastify'

import { prisma } from '../../lib/prisma.ts'
import { useLoggedUser } from '../hooks/useLoggedUser.ts'

export async function GetProjectByLoggedUser(server: FastifyInstance) {
  server.get('/projects', async (request, reply) => {
    const user = await useLoggedUser(request, reply, server)

    if (!user) {
      reply.status(401).send({ error: 'Unauthorized' })
      return
    }

    const projects = await prisma.project.findMany({
      where: {
        userId: Number(user.id),
      },
    })

    reply.status(200).send({ projects })
  })
}
