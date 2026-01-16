
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testBooking() {
    console.log("🚀 Starting Booking Test...");

    try {
        // 1. Get a valid Journey & Cabin
        const journey = await prisma.journey.findFirst({
            include: { buckets: { include: { cabin: true } } }
        });

        if (!journey) {
            console.error("❌ No journeys found!");
            return;
        }

        const bucket = journey.buckets.find(b => b.status === 'available');
        if (!bucket) {
            console.error("❌ No available cabins found for journey:", journey.id);
            return;
        }

        console.log(`✅ Found Journey: ${journey.name} (${journey.id})`);
        console.log(`✅ Found Cabin: ${bucket.cabin.type} (Price: ${bucket.price})`);

        // 2. Create FormData
        // Note: In a real Next.js Server Action, we pass FormData. 
        // We can't easily mock FormData in a raw Node script without polyfills or restructuring.
        // Instead, we will manually insert a record to verify DB constraints are met.

        console.log("📝 Attempting direct DB insertion...");

        const booking = await prisma.booking.create({
            data: {
                journeyId: journey.id,
                totalPrice: bucket.price,
                status: 'confirmed',
                firstName: 'Test',
                lastName: 'Script',
                email: 'script@test.com',
                phone: '1234567890',
                passengers: {
                    create: [
                        {
                            firstName: 'Test',
                            lastName: 'Script',
                            cabinId: bucket.cabinId
                        }
                    ]
                }
            }
        });

        console.log("✅ Booking Created Successfully!");
        console.log("🆔 Booking ID:", booking.id);

    } catch (e) {
        console.error("❌ Test Failed:", e);
    } finally {
        await prisma.$disconnect();
    }
}

testBooking();
