'use server';

import { prisma } from '@/lib/prisma';

export async function getUserBookings(userId: string) {
    try {
        const bookings = await prisma.booking.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            include: {
                journey: true,
                passengers: {
                    include: { cabin: true }
                }
            }
        });
        return bookings;
    } catch (error) {
        console.error('Failed to fetch user bookings:', error);
        return [];
    }
}
