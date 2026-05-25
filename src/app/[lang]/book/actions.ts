'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { getJourneyMeta } from '@/lib/journeyImages';

export async function getAvailableJourneys() {
    try {
        const journeys = await prisma.journey.findMany({
            where: {
                status: 'scheduled',
                // NOTE: we intentionally do NOT filter by departure > now() here
                // so that demo/seed data with past dates still appears in the UI.
                // In a production system you would re-add: departure: { gt: new Date() }
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
                        id: true,
                        price: true,
                        cabinId: true,
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
    console.log('[getJourney] Looking up journey with id:', id);
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

        console.log('[getJourney] Query result:', journey ? `Found: ${journey.name}` : 'NOT FOUND');

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
        console.error('[getJourney] CRITICAL ERROR for id:', id, '| message:', error?.message, '| code:', error?.code);
        return null;
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

    try {
        const booking = await prisma.booking.create({
            data: {
                journeyId,
                totalPrice: price,
                status: 'confirmed',
                firstName,
                lastName,
                email,
                phone,
                passengers: {
                    create: [
                        {
                            firstName,
                            lastName,
                            cabinId
                        }
                    ]
                }
            }
        });

        // Mark the first available bucket for this cabin/journey as booked
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
