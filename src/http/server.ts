import { fastifyCookie } from '@fastify/cookie'
import { fastifyCors } from '@fastify/cors'
import { fastifyJwt } from '@fastify/jwt'
import chalk from 'chalk'
import { fastify } from 'fastify'

import { AuthenticateFromLink } from './routes/authenticate-from-link.ts'
import { CreateProject } from './routes/create-project.ts'
import { CreateTodo } from './routes/create-todo.ts'
import { CreateUser } from './routes/create-user.ts'
import { GetProfile } from './routes/get-profile.ts'
import { GetProjectByUserId } from './routes/get-projects-by-user-id.ts'
import { GetTodoByUserId } from './routes/get-todos-by-user-id.ts'
import { Authenticate } from './routes/send-auth-link.ts'
import { SignOut } from './routes/sign-out.ts'

export const server = fastify()

server.register(fastifyCors, {
  origin: '*',
})

server.register(fastifyJwt, {
  secret: 'mysecret', // env.JWT_SECRET_KEY (is not working and i dont know why...)
})

server.register(fastifyCookie)

server.register(CreateUser)
server.register(CreateProject)
server.register(CreateTodo)
server.register(Authenticate)
server.register(AuthenticateFromLink)
server.register(SignOut)
server.register(GetProfile)
server.register(GetProjectByUserId)
server.register(GetTodoByUserId)

server.get('/', async (request, reply) => {
  reply.send({ hello: 'world' })
})

const start = async () => {
  try {
    await server.listen({ port: 3000 })
    console.log(chalk.bold.green('🟢 Server running at http://localhost:3000/'))
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

start()
