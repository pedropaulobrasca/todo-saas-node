import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const peter = await prisma.user.upsert({
    where: { email: 'peter@prisma.io' },
    update: {},
    create: {
      email: 'peter@prisma.io',
      name: 'Peter',
    },
  })

  const project = await prisma.project.upsert({
    where: { id: 1, title: 'My first project' },
    update: {},
    create: {
      title: 'My first project',
      userId: peter.id,
    },
  })

  const todo = await prisma.todo.upsert({
    where: { id: 1, title: 'My first todo' },
    update: {},
    create: {
      title: 'My first todo',
      projectId: project.id,
      userId: peter.id,
    },
  })

  console.log({ peter, project, todo })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
