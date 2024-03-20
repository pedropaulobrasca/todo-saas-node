import { FastifyInstance } from 'fastify'

import { prisma } from '../../lib/prisma.ts'
import { TodoSchema } from '../../schemas/todo-schema.ts'

export async function CreateTodo(server: FastifyInstance) {
  server.post('/todos', async (request, reply) => {
    try {
      const { title, userId, projectId } = TodoSchema.parse(request.body)

      const newTodo = await prisma.todo.create({
        data: {
          title,
          userId,
          projectId,
        },
      })

      reply.status(201).send(newTodo)
    } catch (error) {
      reply.status(400).send({ error })
    }
  })
}
