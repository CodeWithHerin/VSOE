import { prisma } from './prisma';

export async function findAvailableCabins(journeyId: string) {
    // 1. Get the total number of segments for this journey
    const segmentsCount = await prisma.routeSegment.count({
        where: { journeyId },
    });

    if (segmentsCount === 0) {
        throw new Error("Journey has no segments defined.");
    }

    // 2. Find cabins that have an 'available' bucket for EVERY segment of the journey
    // We use Prisma's groupBy to simulate the SQL logic:
    // SELECT cabinId FROM InventoryBucket WHERE status='available' GROUP BY cabinId HAVING count(segmentId) = total_segments

    const availableBuckets = await prisma.inventoryBucket.groupBy({
        by: ['cabinId'],
        where: {
            journeyId: journeyId,
            status: 'available',
        },
        _count: {
            segmentId: true,
        },
        having: {
            segmentId: {
                _count: {
                    equals: segmentsCount,
                },
            },
        },
    });

    // 3. Extract cabin IDs
    const availableCabinIds = availableBuckets.map((b: { cabinId: string }) => b.cabinId);

    // 4. Fetch full cabin details
    const cabins = await prisma.cabin.findMany({
        where: {
            id: { in: availableCabinIds },
        },
        include: {
            car: true,
        },
    });

    return cabins;
}

// Helper to check if a specific cabin is available
export async function isCabinAvailable(journeyId: string, cabinId: string) {
    const segmentsCount = await prisma.routeSegment.count({
        where: { journeyId },
    });

    const availableBucketsCount = await prisma.inventoryBucket.count({
        where: {
            journeyId,
            cabinId,
            status: 'available',
        },
    });

    return availableBucketsCount === segmentsCount;
}
