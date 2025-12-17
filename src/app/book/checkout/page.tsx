'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CreditCard, Lock } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';

function CheckoutForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const journeyId = searchParams.get('journeyId');
    const cabinId = searchParams.get('cabinId');

    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',

        phone: '',
        guests: 2
    });
    const [paymentMethod, setPaymentMethod] = useState('Credit Card');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call to create booking
        // In a real app, this would POST to /api/bookings
        await new Promise(resolve => setTimeout(resolve, 2000));

        alert("Booking Confirmed! Welcome aboard.");
        router.push('/');
    };

    if (!journeyId || !cabinId) {
        return <div className="text-center p-20">Invalid booking session.</div>;
    }

    return (
        <div className="grid lg:grid-cols-2 gap-12">
            {/* Form Section */}
            <div className="space-y-8">
                <div>
                    <h2 className="text-2xl font-serif text-vsoe-gold mb-6">Guest Details</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-vsoe-cream/60">First Name</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full bg-white/5 border border-white/10 rounded-sm p-3 text-vsoe-cream focus:border-vsoe-gold focus:outline-none transition-colors"
                                    value={formData.firstName}
                                    onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-vsoe-cream/60">Last Name</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full bg-white/5 border border-white/10 rounded-sm p-3 text-vsoe-cream focus:border-vsoe-gold focus:outline-none transition-colors"
                                    value={formData.lastName}
                                    onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                                />
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
                                className="w-full bg-white/5 border border-white/10 rounded-sm p-3 text-vsoe-cream focus:border-vsoe-gold focus:outline-none transition-colors"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-vsoe-cream/60">Phone Number</label>
                            <input
                                type="tel"
                                className="w-full bg-white/5 border border-white/10 rounded-sm p-3 text-vsoe-cream focus:border-vsoe-gold focus:outline-none transition-colors"
                                value={formData.phone}
                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                            />
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
                                <div className="bg-white/5 border border-white/10 p-6 rounded-sm flex items-center justify-center gap-4 text-white/40 mb-6">
                                    <CreditCard size={16} />
                                    <span className="text-sm">Secure Payment Gateway Encrypted</span>
                                </div>
                            )}

                            {paymentMethod === 'Invoice / Wire' && (
                                <div className="bg-white/5 border border-white/10 p-6 rounded-sm mb-6">
                                    <p className="text-sm text-white/80 leading-relaxed">
                                        A pro-forma invoice will be generated and sent to your email.
                                        Your reservation will be held for 48 hours pending wire transfer confirmation.
                                        <br /><br />
                                        <span className="text-vsoe-gold">Concierge will contact you to finalize corporate billing details.</span>
                                    </p>
                                </div>
                            )}

                            {paymentMethod === 'Crypto' && (
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
                            )}

                            <div className="flex items-center gap-3 mb-8">
                                <input
                                    type="checkbox"
                                    id="splitPayment"
                                    className="w-4 h-4 rounded border-white/20 bg-white/5 text-vsoe-gold focus:ring-vsoe-gold"
                                />
                                <label htmlFor="splitPayment" className="text-sm text-white/70 cursor-pointer select-none">
                                    Request Split Payment (Multiple Cards/Parties)
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-vsoe-gold text-vsoe-midnight py-4 font-sans font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Processing...' : paymentMethod === 'Invoice / Wire' ? 'Generate Invoice' : 'Confirm Reservation'}
                            </button>
                        </div>
                    </form>
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
                    <span className="text-3xl font-serif text-white">€4,500</span>
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
