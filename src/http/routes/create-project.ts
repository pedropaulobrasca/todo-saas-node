import { FastifyInstance } from 'fastify'

import { prisma } from '../../lib/prisma.ts'
import { ProjectSchema } from '../../schemas/project-schema.ts'

export async function CreateProject(server: FastifyInstance) {
  server.post('/projects', async (request, reply) => {
    try {
      const { title } = ProjectSchema.parse(request.body)

      const newProject = await prisma.project.create({
        data: {
          title,
          userId: 1,
        },
      })

      reply.status(201).send(newProject)
    } catch (error) {
      reply.status(400).send({ error })
    }
  })
}
