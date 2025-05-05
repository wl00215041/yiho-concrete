// utils/prisma.ts
import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient

// 確保只在伺服器端執行
if (process.server) {
  prisma = new PrismaClient()
}

export default prisma