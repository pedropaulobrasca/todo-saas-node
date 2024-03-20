import { FastifyInstance } from 'fastify'

import { prisma } from '../../lib/prisma.ts'
import { UserSchema } from '../../schemas/user-schema.ts'

export async function CreateUser(server: FastifyInstance) {
  server.post('/users', async (request, reply) => {
    try {
      const { name, email } = UserSchema.parse(request.body)

      const newUser = await prisma.user.create({
        data: {
          name,
          email,
        },
      })

      reply.status(201).send(newUser)
    } catch (error) {
      reply.status(400).send({ error })
    }
  })
}
