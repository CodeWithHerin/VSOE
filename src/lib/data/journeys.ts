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
            // Find lowest price
            const prices = j.buckets.map(b => b.price);
            const minPrice = prices.length > 0 ? Math.min(...prices) : 0;

            // Map journey name → unique image + description
            const { image, description } = getJourneyMeta(j.name);

            // Group available options for the wizard
            const options = {
                historic: j.buckets.find(b => b.cabin.type === 'historic'),
                suite: j.buckets.find(b => b.cabin.type === 'suite'),
                grand_suite: j.buckets.find(b => b.cabin.type === 'grand_suite'),
            };

            return {
                id: j.id,        // DB UUID — used in /book/[journeyId] route
                name: j.name,
                date: j.departure,
                price: minPrice,
                image,
                description,
                availableCabins: j.buckets.length,
                options
            };
        });
    } catch (error) {
        console.error("Failed to fetch journeys:", error);
        return [];
    }
}

export async function getJourney(id: string) {
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
            historic: journey.buckets.filter(b => b.cabin.type === 'historic')[0],
            suite: journey.buckets.filter(b => b.cabin.type === 'suite')[0],
            grand_suite: journey.buckets.filter(b => b.cabin.type === 'grand_suite')[0],
        };

        return {
            ...journey,
            image,
            description,
            options
        };
    } catch (error: any) {
        console.error('[getJourney] CRITICAL ERROR:', error?.message);
        return null;
    }
}
