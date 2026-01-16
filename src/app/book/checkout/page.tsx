'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CreditCard } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from '@/components/booking/PaymentForm';
import { bookingSchema, type BookingFormData } from '@/components/booking/BookingValidation';
import { z } from 'zod';

// Initialize Stripe outside component to avoid recreation
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function CheckoutForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const journeyId = searchParams.get('journeyId');
    const cabinId = searchParams.get('cabinId');

    // State
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [paymentMethod, setPaymentMethod] = useState('Credit Card');
    const [formData, setFormData] = useState<BookingFormData>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        guests: 2
    });
    const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({});
    const [isFormValid, setIsFormValid] = useState(false);

    // Hardcoded price for demo - in real app, fetch from DB based on journey/cabin
    const PRICE_EUR = 4500;

    // Validate form on change
    useEffect(() => {
        const result = bookingSchema.safeParse(formData);
        setIsFormValid(result.success);
        if (!result.success) {
            // We won't show errors on UI immediately to avoid noise, but `isFormValid` gate is key.
        } else {
            setErrors({});
        }
    }, [formData]);

    // Initialize Payment Intent when "Credit Card" is selected
    useEffect(() => {
        if (paymentMethod === 'Credit Card' && !clientSecret) {
            fetch('/api/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: PRICE_EUR, currency: 'eur' }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.clientSecret) {
                        setClientSecret(data.clientSecret);
                    }
                })
                .catch((err) => console.error("Error creating payment intent:", err));
        }
    }, [paymentMethod, clientSecret]);

    const handleSuccess = () => {
        alert("Payment Successful! Your journey awaits.");
        router.push(`/invoice/booking_${Date.now()}`);
    };

    const validateForm = () => {
        const result = bookingSchema.safeParse(formData);

        if (!result.success) {
            const formattedErrors: any = {};
            result.error.issues.forEach(issue => {
                formattedErrors[issue.path[0]] = issue.message;
            });
            setErrors(formattedErrors);
            return false;
        }

        setErrors({});
        return true;
    };

    const handleManualSubmit = () => {
        if (!validateForm()) return;

        // Standard submission for non-stripe methods
        alert(`Booking request sent via ${paymentMethod}. We will contact you shortly.`);
        router.push(`/invoice/booking_${Date.now()}`);
    };

    if (!journeyId || !cabinId) {
        return <div className="text-center p-20 text-white">Invalid booking session.</div>;
    }

    const appearance = {
        theme: 'night' as const,
        variables: {
            colorPrimary: '#c5a059',
            colorBackground: '#0a1018',
            colorText: '#e0d5c1',
            colorDanger: '#df1b41',
            fontFamily: 'Ideal Sans, system-ui, sans-serif',
            spacingUnit: '4px',
            borderRadius: '2px',
        },
    };

    const options = {
        clientSecret: clientSecret || "",
        appearance,
    };

    return (
        <div className="grid lg:grid-cols-2 gap-12">
            {/* Form Section - Note: No <form> tag to prevent nesting/validation conflicts with Stripe */}
            <div className="space-y-8">
                <div>
                    <h2 className="text-2xl font-serif text-vsoe-gold mb-6">Guest Details</h2>
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-vsoe-cream/60">First Name</label>
                                <input
                                    required
                                    type="text"
                                    className={`w-full bg-white/5 border ${errors.firstName ? 'border-red-500' : 'border-white/10'} rounded-sm p-3 text-vsoe-cream focus:border-vsoe-gold focus:outline-none transition-colors`}
                                    value={formData.firstName}
                                    onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                                />
                                {errors.firstName && <span className="text-red-400 text-xs">{errors.firstName}</span>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-vsoe-cream/60">Last Name</label>
                                <input
                                    required
                                    type="text"
                                    className={`w-full bg-white/5 border ${errors.lastName ? 'border-red-500' : 'border-white/10'} rounded-sm p-3 text-vsoe-cream focus:border-vsoe-gold focus:outline-none transition-colors`}
                                    value={formData.lastName}
                                    onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                                />
                                {errors.lastName && <span className="text-red-400 text-xs">{errors.lastName}</span>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-vsoe-cream/60">Number of Guests</label>
                            <select
                                className="w-full bg-white/5 border border-white/10 rounded-sm p-3 text-vsoe-cream focus:border-vsoe-gold focus:outline-none transition-colors"
                                value={formData.guests}
                                onChange={e => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                            >
                                {[1, 2, 3, 4].map(num => (
                                    <option key={num} value={num} className="bg-vsoe-midnight">{num} Guest{num > 1 ? 's' : ''}</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-vsoe-cream/60">Email Address</label>
                            <input
                                required
                                type="email"
                                className={`w-full bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-sm p-3 text-vsoe-cream focus:border-vsoe-gold focus:outline-none transition-colors`}
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                            />
                            {errors.email && <span className="text-red-400 text-xs">{errors.email}</span>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-vsoe-cream/60">Phone Number</label>
                            <input
                                type="tel"
                                className={`w-full bg-white/5 border ${errors.phone ? 'border-red-500' : 'border-white/10'} rounded-sm p-3 text-vsoe-cream focus:border-vsoe-gold focus:outline-none transition-colors`}
                                value={formData.phone}
                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                            />
                            {errors.phone && <span className="text-red-400 text-xs">{errors.phone}</span>}
                        </div>

                        <div className="pt-8 border-t border-white/10">
                            <h2 className="text-2xl font-serif text-vsoe-gold mb-6">Payment Method</h2>

                            <div className="grid grid-cols-3 gap-4 mb-6">
                                {['Credit Card', 'Invoice / Wire', 'Crypto'].map((method) => (
                                    <button
                                        key={method}
                                        type="button"
                                        onClick={() => setPaymentMethod(method)}
                                        className={`p-4 border rounded-sm text-xs uppercase tracking-widest font-bold transition-all ${paymentMethod === method
                                            ? 'bg-vsoe-gold text-vsoe-midnight border-vsoe-gold'
                                            : 'bg-white/5 border-white/10 text-white/60 hover:border-vsoe-gold/50'
                                            }`}
                                    >
                                        {method}
                                    </button>
                                ))}
                            </div>

                            {paymentMethod === 'Credit Card' && (
                                <div className="space-y-4">
                                    <div className="bg-white/5 border border-white/10 p-6 rounded-sm flex items-center justify-center gap-4 text-white/40 mb-2">
                                        <CreditCard size={16} />
                                        <span className="text-sm">Secure Stripe Payment</span>
                                    </div>

                                    {clientSecret && stripePromise && (
                                        <Elements stripe={stripePromise} options={options}>
                                            <PaymentForm onSuccess={handleSuccess} amount={PRICE_EUR} validate={validateForm} />
                                        </Elements>
                                    )}

                                    {!clientSecret && (
                                        <div className="text-center text-white/50 py-4">Initializing Secure Payment...</div>
                                    )}
                                </div>
                            )}

                            {paymentMethod === 'Invoice / Wire' && (
                                <>
                                    <div className="bg-white/5 border border-white/10 p-6 rounded-sm mb-6">
                                        <p className="text-sm text-white/80 leading-relaxed">
                                            A pro-forma invoice will be generated and sent to your email.
                                            Your reservation will be held for 48 hours pending wire transfer confirmation.
                                            <br /><br />
                                            <span className="text-vsoe-gold">Concierge will contact you to finalize corporate billing details.</span>
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleManualSubmit}
                                        className="w-full bg-vsoe-gold text-vsoe-midnight py-4 font-sans font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Generate Invoice
                                    </button>
                                </>
                            )}

                            {paymentMethod === 'Crypto' && (
                                <>
                                    <div className="bg-white/5 border border-white/10 p-6 rounded-sm mb-6 text-center">
                                        <p className="text-sm text-white/80 mb-4">
                                            We accept Bitcoin, Ethereum, and USDC via BitPay.
                                        </p>
                                        <div className="flex justify-center gap-4 opacity-50">
                                            <span className="text-xs border border-white/20 px-2 py-1 rounded">BTC</span>
                                            <span className="text-xs border border-white/20 px-2 py-1 rounded">ETH</span>
                                            <span className="text-xs border border-white/20 px-2 py-1 rounded">USDC</span>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleManualSubmit}
                                        className="w-full bg-vsoe-gold text-vsoe-midnight py-4 font-sans font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Pay with Crypto
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Summary Section */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-sm h-fit sticky top-32">
                <h3 className="text-xl font-serif text-white mb-6">Reservation Summary</h3>

                <div className="space-y-4 mb-8 text-sm">
                    <div className="flex justify-between text-vsoe-cream/80">
                        <span>Journey</span>
                        <span className="text-white font-medium">Paris to Venice</span>
                    </div>
                    <div className="flex justify-between text-vsoe-cream/80">
                        <span>Date</span>
                        <span className="text-white font-medium">June 1st, 2025</span>
                    </div>
                    <div className="flex justify-between text-vsoe-cream/80">
                        <span>Guests</span>
                        <span className="text-white font-medium">{formData.guests} Adult{formData.guests > 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex justify-between text-vsoe-cream/80">
                        <span>Cabin</span>
                        <span className="text-white font-medium">Selected Suite</span>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-6 flex justify-between items-end">
                    <span className="text-sm uppercase tracking-widest text-vsoe-gold">Total</span>
                    <span className="text-3xl font-serif text-white">€{PRICE_EUR.toLocaleString()}</span>
                </div>
            </div>
        </div>
    );
}

export default function CheckoutPage() {
    return (
        <main className="min-h-screen bg-vsoe-midnight text-vsoe-cream selection:bg-vsoe-gold selection:text-vsoe-blue">
            <Navbar />

            <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                <Link href="/book" className="inline-flex items-center gap-2 text-vsoe-gold/60 hover:text-vsoe-gold mb-8 transition-colors text-xs tracking-widest uppercase">
                    <ArrowLeft size={14} /> Cancel Booking
                </Link>

                <h1 className="text-4xl md:text-5xl font-serif text-white mb-12">Complete Your Reservation</h1>

                <Suspense fallback={<div className="text-white/50">Loading booking details...</div>}>
                    <CheckoutForm />
                </Suspense>
            </div>
        </main>
    );
}
