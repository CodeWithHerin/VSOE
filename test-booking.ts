import { prisma } from './src/lib/prisma';

async function main() {
    console.log("--- Testing Booking Creation ---");

    // 1. Find a journey
    const journey = await prisma.journey.findFirst({
        where: { name: "Paris to Venice" }
    });

    if (!journey) throw new Error("Journey not found");
    console.log(`Found Journey: ${journey.name} (${journey.id})`);

    // 2. Find an available cabin
    // Simplified logic: just pick the first cabin attached to this journey's segments
    // In reality, we'd check availability, but for this test we just want to ensure the Booking model works
    const segment = await prisma.routeSegment.findFirst({ where: { journeyId: journey.id } });
    const bucket = await prisma.inventoryBucket.findFirst({
        where: { segmentId: segment?.id, status: 'available' },
        include: { cabin: true }
    });

    if (!bucket) throw new Error("No available cabins found for test");
    console.log(`Found Cabin: ${bucket.cabin.number} (${bucket.cabin.type})`);

    // 3. Create Booking
    const booking = await prisma.booking.create({
        data: {
            firstName: "Hercule",
            lastName: "Poirot",
            email: "poirot@investigations.be",
            journeyId: journey.id,
            totalPrice: 4500,
            status: "confirmed",
            passengers: {
                create: {
                    firstName: "Hercule",
                    lastName: "Poirot",
                    cabinId: bucket.cabin.id
                }
            }
        },
        include: { passengers: true }
    });

    console.log("✅ Booking Created Successfully!");
    console.log(`Booking ID: ${booking.id}`);
    console.log(`Passenger: ${booking.passengers[0].firstName} ${booking.passengers[0].lastName}`);
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
