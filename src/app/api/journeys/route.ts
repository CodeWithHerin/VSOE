import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getJourneyMeta } from '@/lib/journeyImages';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs'; // Ensure Prisma works, Edge runtime doesn't support Prisma

export async function GET() {
    try {
        console.log('[API/journeys] Start');
        console.log('[API/journeys] DATABASE_URL present:', !!process.env.DATABASE_URL);
        console.log('[API/journeys] DIRECT_URL present:', !!process.env.DIRECT_URL);
        
        const journeys = await prisma.journey.findMany({
            where: { status: 'scheduled' },
            orderBy: { departure: 'asc' },
            include: {
                buckets: {
                    where: { status: 'available' },
                    include: { cabin: true }
                }
            }
        });

        console.log('[API/journeys] Query result count:', journeys.length);

        const data = journeys.map(j => {
            const prices = j.buckets.map(b => Number(b.price));
            const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
            const { image, description } = getJourneyMeta(j.name);

            const pickBucket = (type: string) => {
                const b = j.buckets.find(b => b.cabin.type === type);
                if (!b) return undefined;
                return { id: b.id, price: Number(b.price), cabinId: b.cabinId, cabin: b.cabin };
            };

            return {
                id: j.id,
                name: j.name,
                departureDate: j.departure.toISOString(),
                price: minPrice,
                image,
                description,
                availableCabins: j.buckets.length,
                options: {
                    historic: pickBucket('historic'),
                    suite: pickBucket('suite'),
                    grand_suite: pickBucket('grand_suite'),
                },
            };
        });

        console.log('[API/journeys] Returning data');
        return NextResponse.json({ journeys: data });
    } catch (error: any) {
        console.error('[API/journeys] FULL ERROR:', error);
        console.error('[API/journeys] Error message:', error?.message);
        console.error('[API/journeys] Error stack:', error?.stack);
        return NextResponse.json({ error: error?.message || 'Unknown error' }, { status: 500 });
    }
}
