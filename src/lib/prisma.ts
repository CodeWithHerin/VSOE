import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

const getPrismaUrl = () => {
    let url = process.env.DATABASE_URL;
    if (url && url.includes('supabase') && !url.includes('pgbouncer=true') && !url.includes('localhost')) {
        url = url.includes('?') ? `${url}&pgbouncer=true` : `${url}?pgbouncer=true`;
    }
    return url;
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
