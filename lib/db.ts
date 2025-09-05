import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Override DATABASE_URL for SQLite in development
const databaseUrl = process.env.NODE_ENV === 'production' 
  ? process.env.DATABASE_URL 
  : 'file:./dev.db'

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl
    }
  }
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma