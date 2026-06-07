'use server';

import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

export async function getBookingDetails(bookingId: string) {
    if (!bookingId) return null;

    const session = await auth();
    if (!session?.user?.id) return null;

    try {
        const booking = await prisma.booking.findUnique({
            where: { id: bookingId },
            include: {
                journey: {
                    select: {
                        name: true,
                        departure: true,
                        arrival: true,
                    }
                },
                passengers: {
                    include: {
                        cabin: {
                            include: {
                                car: true
                            }
                        }
                    }
                }
            }
        });

        if (!booking) return null;
        if (booking.userId !== session.user.id) return null;

        return booking;
    } catch (error) {
        console.error('Failed to fetch booking details:', error);
        return null;
    }
}
