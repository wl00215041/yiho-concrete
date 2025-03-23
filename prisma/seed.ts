// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()

// async function main() {
//   const admin = await prisma.user.upsert({
//     where: { email: 'admin@demo.io' },
//     update: {},
//     create: {
//       email: 'admin@demo.io',
//       name: 'Admin',
//       password: 'admin',
//     }
//   })
// }
// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })