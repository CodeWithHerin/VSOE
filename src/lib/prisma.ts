import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

const getPrismaUrl = () => {
    let url = process.env.DATABASE_URL;
    if (url && (url.startsWith('postgres://') || url.startsWith('postgresql://'))) {
        if (!url.includes('pgbouncer=true') && !url.includes('localhost') && !url.includes('127.0.0.1')) {
            url = url.includes('?') ? `${url}&pgbouncer=true` : `${url}?pgbouncer=true`;
        }
    }
    console.log('[Prisma Url]', url ? url.split('@')[1] || 'MASKED' : 'NOT SET');
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
