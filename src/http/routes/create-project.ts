import { FastifyInstance } from 'fastify'

import { prisma } from '../../lib/prisma.ts'
import { ProjectSchema } from '../../schemas/project-schema.ts'

export async function CreateProject(server: FastifyInstance) {
  server.post('/projects', async (request, reply) => {
    try {
      const { title, userId } = ProjectSchema.parse(request.body)

      const user = await prisma.user.findUnique({
        where: {
          id: Number(userId),
        },
      })

      if (!user) {
        reply.status(401).send({ error: 'Unauthorized' })
        return
      }

      const newProject = await prisma.project.create({
        data: {
          title,
          userId: user.id,
        },
      })

      reply.status(201).send(newProject)
    } catch (error) {
      reply.status(400).send({ error })
    }
  })
}
