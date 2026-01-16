'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getBookingDetails(bookingId: string) {
    if (!bookingId) return null;

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

        return booking;
    } catch (error) {
        console.error("Failed to fetch booking details:", error);
        return null;
    }
}
