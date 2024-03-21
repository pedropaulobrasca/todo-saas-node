import { FastifyInstance } from 'fastify'

import { prisma } from '../../lib/prisma.ts'

export async function GetTodoByUserId(server: FastifyInstance) {
  server.get('/todos/:id', async (request, reply) => {
    const { id } = request.params as { id: string }

    const todos = await prisma.todo.findMany({
      where: {
        userId: Number(id),
      },
      include: {
        project: true,
      },
    })

    reply.status(200).send({ todos })
  })
}
