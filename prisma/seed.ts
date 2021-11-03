import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.profile.upsert({
    where: { email: 'test@gmail.com' },
    update: {},
    create: {
      email: 'test@gmail.com',
      name: 'Test user',
      username: 'user.test',
      password: 'test123'
    }
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(console.log)
