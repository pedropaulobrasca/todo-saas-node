import { FastifyInstance } from 'fastify'

import { prisma } from '../../lib/prisma.ts'
import { TodoSchema } from '../../schemas/todo-schema.ts'

export async function CreateTodo(server: FastifyInstance) {
  server.post('/todos', async (request, reply) => {
    try {
      const { title, userId, projectId, description } = TodoSchema.parse(
        request.body,
      )

      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      })

      if (!user) {
        reply.status(404).send({ error: 'User not found' })
        return
      }

      const project = await prisma.project.findUnique({
        where: {
          id: projectId,
        },
      })

      if (!project || project.userId !== userId) {
        reply
          .status(404)
          .send({ error: 'Project not found or does not belong to the user' })
        return
      }

      const newTodo = await prisma.todo.create({
        data: {
          title: String(title),
          userId: Number(userId),
          projectId: Number(projectId),
          description: String(description),
          status: 'idle',
        },
      })

      reply.status(201).send(newTodo)
    } catch (error) {
      reply.status(400).send({ error })
    }
  })
}
