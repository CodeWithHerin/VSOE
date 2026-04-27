import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const { journeyId, cabinId, guests } = await request.json();

        if (!journeyId || !cabinId) {
            return NextResponse.json(
                { error: 'Missing journeyId or cabinId' },
                { status: 400 }
            );
        }

        // Look up price from DB
        const inventory = await prisma.inventoryBucket.findFirst({
            where: { journeyId, cabinId },
        });

        let price = 4500;
        if (inventory) {
            price = inventory.price;
        } else {
            console.warn(
                `Price not found for J:${journeyId} C:${cabinId}. Using fallback $4500.`
            );
        }

        const amountStr = price.toFixed(2);

        return NextResponse.json({
            id: 'mock_tx_' + Date.now(),
            amount: price,
            amountStr: amountStr,
        });
    } catch (error: any) {
        console.error('[Price Lookup/Order] Error:', error.message);
        return NextResponse.json(
            { error: `Internal Server Error: ${error.message}` },
            { status: 500 }
        );
    }
}
