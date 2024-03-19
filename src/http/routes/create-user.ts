import { FastifyInstance } from 'fastify'

import { prisma } from '../../lib/prisma.js'
import { UserSchema } from '../../schemas/user-schema.js'

export async function createUser(server: FastifyInstance) {
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
