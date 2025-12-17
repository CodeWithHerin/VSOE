'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export async function getAvailableJourneys() {
    try {
        const journeys = await prisma.journey.findMany({
            where: {
                status: 'scheduled',
                departure: {
                    gt: new Date()
                }
            },
            orderBy: {
                departure: 'asc'
            },
            include: {
                buckets: {
                    where: {
                        status: 'available'
                    },
                    select: {
                        price: true,
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

            // Determine route description based on name (simple logic for now)
            let description = "A legendary journey across Europe.";
            let image = "https://images.unsplash.com/photo-1520939817895-060bdaf4de1e?q=80&w=2940&auto=format&fit=crop";

            if (j.name.includes("Venice")) {
                image = "https://images.unsplash.com/photo-1520939817895-060bdaf4de1e?q=80&w=2940&auto=format&fit=crop";
                description = "The classic route. Depart from the City of Light and awake in the Floating City.";
            }
            if (j.name.includes("Venice to Paris")) {
                image = "https://images.unsplash.com/photo-1499856871940-a09627c6d7db?q=80&w=2940&auto=format&fit=crop";
                description = "Return to the capital of romance through the heart of the Swiss Alps.";
            }
            if (j.name.includes("Istanbul")) {
                image = "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=2940&auto=format&fit=crop";
                description = "The historic five-night odyssey. A once-in-a-lifetime grand tour across Europe.";
            }

            return {
                id: j.id,
                name: j.name,
                date: j.departure, // Date object, client will format
                price: minPrice,
                image,
                description,
                availableCabins: j.buckets.length
            };
        });
    } catch (error) {
        console.error("Failed to fetch journeys:", error);
        return [];
    }
}

export async function getJourney(id: string) {
    const journey = await prisma.journey.findUnique({
        where: { id },
        include: {
            segments: true,
            buckets: {
                where: { status: 'available' },
                include: {
                    cabin: true
                }
            }
        }
    });
    
    // Process buckets to group by cabin type for the frontend
    if (!journey) return null;

    // Group available options
    const options = {
        historic: journey.buckets.filter(b => b.cabin.type === 'historic')[0], // Just take first available for price/id
        suite: journey.buckets.filter(b => b.cabin.type === 'suite')[0],
        grand_suite: journey.buckets.filter(b => b.cabin.type === 'grand_suite')[0],
    };

    return {
        ...journey,
        options // Simplified availability for UI
    }
}

export async function createBooking(prevState: any, formData: FormData) {
    const journeyId = formData.get('journeyId') as string;
    const cabinId = formData.get('cabinId') as string;
    const price = parseFloat(formData.get('price') as string);
    
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    
    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
        const booking = await prisma.booking.create({
            data: {
                journeyId,
                totalPrice: price,
                status: 'confirmed', // Auto-confirm for demo
                firstName,
                lastName,
                email,
                phone,
                passengers: {
                    create: {
                        firstName, // Primary passenger
                        lastName,
                        cabinId
                    }
                }
            }
        });

        // Mark bucket as booked
        // In a real app we'd find the specific bucket for this cabin/journey/segment
        // For simplicity in this demo, we'll mark the first available bucket for this cabin/journey as booked
        const bucket = await prisma.inventoryBucket.findFirst({
            where: {
                journeyId,
                cabinId,
                status: 'available'
            }
        });

        if (bucket) {
            await prisma.inventoryBucket.update({
                where: { id: bucket.id },
                data: { status: 'booked' }
            });
        }

        revalidatePath('/book');
        return { success: true, bookingId: booking.id };
    } catch (e) {
        console.error(e);
        return { success: false, error: 'Booking failed' };
    }
}
