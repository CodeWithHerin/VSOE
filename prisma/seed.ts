import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log("🚂 Starting VSOE Database Seed...")

    // 1. Cleanup
    await prisma.passenger.deleteMany()
    await prisma.booking.deleteMany()
    await prisma.inventoryBucket.deleteMany()
    await prisma.cabin.deleteMany()
    await prisma.trainCar.deleteMany()
    await prisma.routeSegment.deleteMany()
    await prisma.journey.deleteMany()

    console.log("🧹 Cleanup complete.")

    // 2. Create The Train (The Rolling Stock)
    // The VSOE consists of 17 cars usually.
    // Dining Cars
    const carEtoile = await prisma.trainCar.create({ data: { name: "Etoile du Nord", type: "dining" } })
    const carCote = await prisma.trainCar.create({ data: { name: "Côte d'Azur", type: "dining" } })
    const carOriental = await prisma.trainCar.create({ data: { name: "L'Oriental", type: "dining" } })
    const carBar = await prisma.trainCar.create({ data: { name: "'3674' Bar Car", type: "bar" } })

    // Sleeping Cars (Historic) - Usually named by Number
    const car3309 = await prisma.trainCar.create({ data: { name: "3309", type: "sleeping" } })
    const car3425 = await prisma.trainCar.create({ data: { name: "3425", type: "sleeping" } })
    const car3544 = await prisma.trainCar.create({ data: { name: "3544", type: "sleeping" } })

    // Grand Suites Car (The most exclusive)
    const carGrandSuites = await prisma.trainCar.create({ data: { name: "Grand Suites", type: "sleeping" } })

    // Create Cabins
    // Helper
    const createCabins = async (carId: string, type: string, prefix: string, count: number, priceBase: number) => {
        const cabins = []
        for (let i = 1; i <= count; i++) {
            cabins.push({
                carId,
                number: `${prefix}${i}`,
                type,
                capacity: 2,
            })
        }
        // Save in loop to get IDs or use createMany if SQLite supports it (it does)
        for (const c of cabins) {
            await prisma.cabin.create({ data: c })
        }
    }

    // Grand Suites - Named
    const grandSuiteNames = ["Paris", "Venice", "Istanbul", "Vienna", "Prague", "Budapest"]
    for (const name of grandSuiteNames) {
        await prisma.cabin.create({
            data: {
                carId: carGrandSuites.id,
                number: name,
                type: "grand_suite",
                capacity: 2
            }
        })
    }

    // Historic Cabins
    await createCabins(car3309.id, "historic", "A", 9, 0) // 9 cabins per car
    await createCabins(car3425.id, "historic", "B", 9, 0)
    await createCabins(car3544.id, "historic", "C", 9, 0)

    console.log("🚋 Fleet created: 3 Dining, 1 Bar, 3 Historic Cars, 1 Grand Suite Car.")

    // 3. Create Journeys
    // prices in GBP roughly converted to integer for DB basePrice (assuming DB is stored in smallest currency unit or just int)
    // Frontend says £3,530 -> 3530
    const journeys = [
        {
            name: "Paris to Venice",
            dep: "2025-04-20T21:30:00Z", // Day 1 21:30
            arr: "2025-04-21T18:00:00Z", // Day 2 18:00
            basePrice: 3530
        },
        {
            name: "Paris to Venice",
            dep: "2025-05-15T21:30:00Z",
            arr: "2025-05-16T18:00:00Z",
            basePrice: 3530
        },
        {
            name: "Paris to Istanbul",
            dep: "2025-08-25T14:00:00Z",
            arr: "2025-08-30T16:00:00Z",
            basePrice: 17500
        },
        {
            name: "London to Venice",
            dep: "2025-06-10T10:00:00Z",
            arr: "2025-06-11T18:00:00Z",
            basePrice: 4100
        }
    ]

    for (const j of journeys) {
        const journey = await prisma.journey.create({
            data: {
                name: j.name,
                departure: new Date(j.dep),
                arrival: new Date(j.arr),
                status: "scheduled"
            }
        })

        // Route Segments
        let segments: any[] = []

        if (j.name === "London to Venice") {
            // Complex route - Create individually to get IDs
            const s1 = await prisma.routeSegment.create({
                data: { journeyId: journey.id, origin: "London", destination: "Calais", departure: new Date(j.dep), arrival: new Date(new Date(j.dep).getTime() + 4 * 3600 * 1000), order: 0 }
            })
            const s2 = await prisma.routeSegment.create({
                data: { journeyId: journey.id, origin: "Calais", destination: "Venice", departure: new Date(new Date(j.dep).getTime() + 5 * 3600 * 1000), arrival: new Date(j.arr), order: 1 }
            })
            segments = [s1, s2]
        } else {
            // Simple route
            const origin = j.name.split(" to ")[0]
            const dest = j.name.split(" to ")[1]
            const s1 = await prisma.routeSegment.create({
                data: {
                    journeyId: journey.id,
                    origin: origin,
                    destination: dest,
                    departure: new Date(j.dep),
                    arrival: new Date(j.arr),
                    order: 0
                }
            })
            segments = [s1]
        }

        // 4. Inventory Buckets (Linking Journey + Cabins)
        // We assign availability to the MAIN segment (or the first one for simplicity in this seed)
        const allCabins = await prisma.cabin.findMany()

        for (const cabin of allCabins) {
            let multiplier = 1
            if (cabin.type === 'suite') multiplier = 2.0 // Approx £7200 vs £3530
            if (cabin.type === 'grand_suite') multiplier = 2.8 // Approx £10100 vs £3530

            // Random availability
            let status = "available"
            const rand = Math.random()
            if (rand > 0.7) status = "booked"

            // Grand Suites sell out fast
            if (cabin.type === 'grand_suite' && rand > 0.4) status = "booked"

            await prisma.inventoryBucket.create({
                data: {
                    journeyId: journey.id,
                    segmentId: segments[0].id, // Link to the first segment
                    cabinId: cabin.id,
                    status: status,
                    price: Math.round(j.basePrice * multiplier)
                }
            })
        }
    }

    console.log("✅ Seeding Complete. Created 4 Journeys (Paris-Venice, Istanbul, London) with aligned pricing.")
}

main()
    .then(async () => { await prisma.$disconnect() })
    .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1) })
