import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with a fallback to avoid crash during build/dev if key is missing
// In production, this would throw an error if missing
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock', {
    apiVersion: '2024-11-20.acacia',
});

export async function POST(request: Request) {
    try {
        const { amount, currency } = await request.json();

        // Safety check for missing keys in dev mode
        if (!process.env.STRIPE_SECRET_KEY) {
            console.warn("⚠️ No STRIPE_SECRET_KEY found. Using mock simulation.");
            // If we don't have keys, we can't create a real intent.
            // valid clientSecret usually looks like "pi_123_secret_456"
            return NextResponse.json({
                clientSecret: "mock_secret_for_dev_mode",
                mockMode: true
            });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Convert to cents
            currency: currency || 'eur',
            automatic_payment_methods: {
                enabled: true,
            },
            // Metadata is useful for matching payments to bookings later
            metadata: {
                integration_check: 'accept_a_payment',
            },
        });

        return NextResponse.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
        console.error('Internal Error:', error);
        return NextResponse.json(
            { error: `Internal Server Error: ${error.message}` },
            { status: 500 }
        );
    }
}
