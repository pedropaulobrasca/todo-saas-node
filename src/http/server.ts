import chalk from 'chalk'
import { fastify } from 'fastify'

import { createProject } from './routes/create-project.js'
import { createTodo } from './routes/create-todo.js'
import { createUser } from './routes/create-user.js'

export const server = fastify()

server.register(createUser)
server.register(createProject)
server.register(createTodo)

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
