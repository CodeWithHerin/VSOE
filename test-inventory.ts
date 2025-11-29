import { prisma } from './src/lib/prisma';
import { findAvailableCabins } from './src/lib/inventory';

async function main() {
    console.log("--- Testing Inventory Logic ---");

    // 1. Get the seeded journey
    const journey = await prisma.journey.findFirst({
        where: { name: "Paris to Venice" }
    });

    if (!journey) {
        throw new Error("Journey not found. Did you run the seed script?");
    }

    console.log(`Testing Journey: ${journey.name} (${journey.id})`);

    // 2. Find available cabins
    const cabins = await findAvailableCabins(journey.id);

    console.log(`Found ${cabins.length} available cabin(s).`);
    cabins.forEach(c => console.log(`- Cabin ${c.number} (${c.type})`));

    // 3. Verification
    const hasA1 = cabins.some(c => c.number === "A1");
    const hasA2 = cabins.some(c => c.number === "A2");

    if (hasA1 && !hasA2) {
        console.log("✅ SUCCESS: Logic correctly identified A1 as available and A2 as unavailable (orphaned segment).");
    } else {
        console.error("❌ FAILURE: Logic failed.");
        console.error(`  Expected A1: true, Got: ${hasA1}`);
        console.error(`  Expected A2: false, Got: ${hasA2}`);
        process.exit(1);
    }
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
