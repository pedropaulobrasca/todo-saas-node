import { FastifyInstance } from 'fastify'

import { prisma } from '../../lib/prisma.ts'

export async function GetProjectByUserId(server: FastifyInstance) {
  server.get('/projects/:id', async (request, reply) => {
    const { id } = request.params as { id: string }

    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    })

    if (!user) {
      reply.status(401).send({ error: 'Unauthorized' })
      return
    }

    // Modificação aqui para incluir a contagem de todos
    const projects = await prisma.project.findMany({
      where: {
        userId: Number(user.id),
      },
      include: {
        _count: {
          select: { todos: true }, // Conta quantos todos cada projeto tem
        },
      },
    })

    // Ajusta a resposta para incluir a contagem de todos
    const projectsWithTodoCount = projects.map((project) => ({
      ...project,
      todoCount: project._count.todos,
    }))

    reply.status(200).send({ projects: projectsWithTodoCount })
  })
}
