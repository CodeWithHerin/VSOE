'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getUserBookings(email: string = 'john@example.com') {
    try {
        const bookings = await prisma.booking.findMany({
            where: {
                email: email
            },
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                journey: true,
                passengers: {
                    include: {
                        cabin: true
                    }
                }
            }
        });

        return bookings;
    } catch (error) {
        console.error("Failed to fetch user bookings:", error);
        return [];
    }
}
