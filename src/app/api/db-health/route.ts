import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
    const result: Record<string, any> = {
        timestamp: new Date().toISOString(),
        env: {
            DATABASE_URL: process.env.DATABASE_URL ? `set (${process.env.DATABASE_URL.slice(0, 30)}...)` : 'NOT SET',
            DIRECT_URL: process.env.DIRECT_URL ? `set (${process.env.DIRECT_URL.slice(0, 30)}...)` : 'NOT SET',
        },
    };

    try {
        const journeyCount = await prisma.journey.count();
        const cabinCount = await prisma.cabin.count();
        const bucketCount = await prisma.inventoryBucket.count();

        const journeys = await prisma.journey.findMany({
            where: { status: 'scheduled' },
            select: { id: true, name: true, departure: true, status: true },
            orderBy: { departure: 'asc' },
        });

        result.db = 'connected';
        result.counts = { journeys: journeyCount, cabins: cabinCount, inventoryBuckets: bucketCount };
        result.scheduledJourneys = journeys;
        result.status = journeyCount > 0 ? 'OK' : 'DB_EMPTY';
    } catch (error: any) {
        result.db = 'error';
        result.error = error?.message ?? String(error);
        result.code = error?.code;
        result.status = 'DB_ERROR';
    }

    return NextResponse.json(result, {
        status: result.status === 'OK' ? 200 : 503,
    });
}
