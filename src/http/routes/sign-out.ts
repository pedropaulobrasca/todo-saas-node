import { FastifyInstance } from 'fastify'

export async function SignOut(server: FastifyInstance) {
  server.post('/sign-out', async (request, reply) => {
    try {
      reply.clearCookie('auth')
    } catch (error) {
      reply.status(400).send({ error })
    }
  })
}
