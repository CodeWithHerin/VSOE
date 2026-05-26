import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

const getPrismaUrl = () => {
    // In Vercel serverless, if transaction pooler (DATABASE_URL) fails with prepared statements,
    // using DIRECT_URL (session pooler or direct connection) avoids the 42P05 error.
    return process.env.DIRECT_URL || process.env.DATABASE_URL;
};

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        log: ['query'],
        datasources: {
            db: {
                url: getPrismaUrl()
            }
        }
    })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
