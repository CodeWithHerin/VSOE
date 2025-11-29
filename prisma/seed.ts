import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    // 1. Create Journey
    const journey = await prisma.journey.create({
        data: {
            name: "Paris to Venice",
            departure: new Date("2025-06-01T10:00:00Z"),
            arrival: new Date("2025-06-02T10:00:00Z"),
            status: "scheduled",
        }
    })

    // 2. Create Segments
    const segment1 = await prisma.routeSegment.create({
        data: {
            journeyId: journey.id,
            origin: "Paris",
            destination: "Alps",
            departure: new Date("2025-06-01T10:00:00Z"),
            arrival: new Date("2025-06-01T18:00:00Z"),
            order: 0,
        }
    })

    const segment2 = await prisma.routeSegment.create({
        data: {
            journeyId: journey.id,
            origin: "Alps",
            destination: "Venice",
            departure: new Date("2025-06-01T18:30:00Z"),
            arrival: new Date("2025-06-02T10:00:00Z"),
            order: 1,
        }
    })

    // 3. Create Train Car
    const car = await prisma.trainCar.create({
        data: {
            name: "L'Oriental",
            type: "sleeping",
        }
    })

    // 4. Create Cabins
    const cabinA1 = await prisma.cabin.create({
        data: {
            carId: car.id,
            number: "A1",
            type: "suite",
            capacity: 2,
        }
    })

    const cabinA2 = await prisma.cabin.create({
        data: {
            carId: car.id,
            number: "A2",
            type: "suite",
            capacity: 2,
        }
    })

    // 5. Create Inventory Buckets

    // Cabin A1: Available for BOTH segments (Should be available)
    await prisma.inventoryBucket.create({
        data: {
            journeyId: journey.id,
            segmentId: segment1.id,
            cabinId: cabinA1.id,
            status: "available",
            price: 2500,
        }
    })
    await prisma.inventoryBucket.create({
        data: {
            journeyId: journey.id,
            segmentId: segment2.id,
            cabinId: cabinA1.id,
            status: "available",
            price: 2500,
        }
    })

    // Cabin A2: Available for Segment 1, Booked for Segment 2 (Should be UNAVAILABLE)
    await prisma.inventoryBucket.create({
        data: {
            journeyId: journey.id,
            segmentId: segment1.id,
            cabinId: cabinA2.id,
            status: "available",
            price: 2500,
        }
    })
    await prisma.inventoryBucket.create({
        data: {
            journeyId: journey.id,
            segmentId: segment2.id,
            cabinId: cabinA2.id,
            status: "booked", // <--- The blocker
            price: 2500,
        }
    })

    console.log({ journey, cabinA1, cabinA2 })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
