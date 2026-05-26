'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

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
