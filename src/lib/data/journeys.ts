import { prisma } from '@/lib/prisma';
import { getJourneyMeta } from '@/lib/journeyImages';

export async function getAvailableJourneys() {
    try {
        const journeys = await prisma.journey.findMany({
            where: {
                status: 'scheduled',
            },
            orderBy: {
                departure: 'asc'
            },
            include: {
                buckets: {
                    where: {
                        status: 'available'
                    },
                    include: {
                        cabin: true
                    }
                }
            }
        });

        // Transform for frontend
        return journeys.map(j => {
            // Prisma Decimal cannot cross RSC boundary — convert to plain number first
            const prices = j.buckets.map(b => Number(b.price));
            const minPrice = prices.length > 0 ? Math.min(...prices) : 0;

            // Map journey name → unique image + description
            const { image, description } = getJourneyMeta(j.name);

            // Serialize options — strip Prisma Decimal fields
            const serializeBucket = (b: typeof j.buckets[0] | undefined) => {
                if (!b) return undefined;
                return {
                    id: b.id,
                    price: Number(b.price),
                    cabinId: b.cabinId,
                    cabin: b.cabin,
                };
            };

            const options = {
                historic: serializeBucket(j.buckets.find(b => b.cabin.type === 'historic')),
                suite: serializeBucket(j.buckets.find(b => b.cabin.type === 'suite')),
                grand_suite: serializeBucket(j.buckets.find(b => b.cabin.type === 'grand_suite')),
            };

            return {
                id: j.id,
                name: j.name,
                // Serialize date as ISO string — avoids RSC Date encoding edge cases on client
                date: j.departure.toISOString(),
                price: minPrice,
                image,
                description,
                availableCabins: j.buckets.length,
                options,
            };
        });
    } catch (error) {
        console.error("Failed to fetch journeys:", error);
        return [];
    }
}

import { unstable_cache } from 'next/cache';

export const getJourney = unstable_cache(
    async (id: string) => {
        try {
            const journey = await prisma.journey.findUnique({
                where: { id },
                include: {
                    buckets: {
                        where: { status: 'available' },
                        include: {
                            cabin: true
                        }
                    }
                }
            });

            if (!journey) return null;

            // Map journey name → unique image + description
            const { image, description } = getJourneyMeta(journey.name);

            // Group available options
            const options = {
                historic: journey.buckets.find(b => b.cabin.type === 'historic'),
                suite: journey.buckets.find(b => b.cabin.type === 'suite'),
                grand_suite: journey.buckets.find(b => b.cabin.type === 'grand_suite'),
            };

            // Return stripped down data structure to optimize caching
            return {
                id: journey.id,
                name: journey.name,
                departure: journey.departure.toISOString(),
                image,
                description,
                options: {
                    historic: options.historic ? {
                        id: options.historic.id,
                        price: Number(options.historic.price),
                        cabinId: options.historic.cabinId,
                        cabin: { type: options.historic.cabin.type }
                    } : undefined,
                    suite: options.suite ? {
                        id: options.suite.id,
                        price: Number(options.suite.price),
                        cabinId: options.suite.cabinId,
                        cabin: { type: options.suite.cabin.type }
                    } : undefined,
                    grand_suite: options.grand_suite ? {
                        id: options.grand_suite.id,
                        price: Number(options.grand_suite.price),
                        cabinId: options.grand_suite.cabinId,
                        cabin: { type: options.grand_suite.cabin.type }
                    } : undefined,
                }
            };
        } catch (error: any) {
            console.error('[getJourney] CRITICAL ERROR:', error?.message);
            return null;
        }
    },
    ['journey-detail'],
    { revalidate: 60 }
);
