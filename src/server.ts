import chalk from 'chalk'
import { fastify } from 'fastify'

const server = fastify()
server.get('/', async () => {
  return 'Hello, World!'
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
