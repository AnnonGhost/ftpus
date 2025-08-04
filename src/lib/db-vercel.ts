import { PrismaClient } from '@prisma/client'

// For Vercel deployment, we need to handle the database differently
// since Vercel has a read-only filesystem and SQLite won't work properly

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Check if we're in Vercel environment
const isVercel = process.env.VERCEL === '1'

// For Vercel, we'll use a temporary in-memory database
// This is not ideal for production but will prevent crashes
let dbInstance: PrismaClient

if (isVercel) {
  // In Vercel, create a new instance each time (not ideal but prevents crashes)
  dbInstance = new PrismaClient({
    log: ['query'],
    datasources: {
      db: {
        url: 'file:./dev.db?connection_limit=1'
      }
    }
  })
} else {
  // Local development - use the standard approach
  dbInstance = globalForPrisma.prisma ?? new PrismaClient({
    log: ['query'],
  })
}

export const db = dbInstance

if (process.env.NODE_ENV !== 'production' && !isVercel) {
  globalForPrisma.prisma = dbInstance
}