
import { findAvailableCabins } from './src/lib/inventory';
import { prisma } from './src/lib/prisma';

async function main() {
    console.log("Verifying AI Inventory Connection...");
    const journey = await prisma.journey.findFirst({ where: { name: "Paris to Venice" } });
    if (!journey) {
        console.error("❌ Journey not found!");
        return;
    }
    console.log(`✅ Found Journey: ${journey.name} (${journey.id})`);

    try {
        const cabins = await findAvailableCabins(journey.id);
        console.log(`Found ${cabins.length} available cabins.`);
        cabins.forEach((c: any) => console.log(`- ${c.type} ${c.number}`));

        if (cabins.some((c: any) => c.number === 'A1') && !cabins.some((c: any) => c.number === 'A2')) {
            console.log("✅ SUCCESS: Cabin A1 is available and A2 is correctly filtered out.");
        } else {
            console.error("❌ FAILURE: Unexpected cabin availability.");
            console.log("Expected A1 to be present and A2 to be absent.");
        }
    } catch (error) {
        console.error("❌ Error querying inventory:", error);
    }
}

main();
