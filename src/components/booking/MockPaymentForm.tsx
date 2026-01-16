'use client';

import React, { useState } from 'react';
import MagneticButton from '@/components/ui/MagneticButton';
import { CreditCard, Lock } from 'lucide-react';

interface MockPaymentFormProps {
    onSuccess: () => void;
    amount: number;
}

export default function MockPaymentForm({ onSuccess, amount }: MockPaymentFormProps) {
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("💳 Mock Payment Submitted. Processing...");
        setIsProcessing(true);

        // Simulate network delay (reduced to 500ms)
        setTimeout(() => {
            console.log("💳 Mock Payment Complete. Calling onSuccess...");
            setIsProcessing(false);
            onSuccess();
        }, 500);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-yellow-900/10 border border-yellow-500/30 p-4 rounded-sm mb-6">
                <p className="text-yellow-200 text-xs uppercase tracking-widest flex items-center gap-2">
                    <Lock size={12} />
                    Developer Mode: Test Payment
                </p>
                <p className="text-yellow-200/60 text-xs mt-1">
                    Stripe keys are missing. This is a simulation. No real money will be verified.
                </p>
            </div>

            <div className="bg-white/5 p-6 rounded-sm border border-white/10 space-y-4">
                <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-vsoe-gold">Card Number</label>
                    <div className="relative">
                        <input
                            type="text"
                            disabled
                            value="4242 4242 4242 4242"
                            className="w-full bg-black/20 border border-white/10 py-3 px-4 text-white/50 font-mono rounded-sm cursor-not-allowed"
                        />
                        <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-vsoe-gold">Expiry</label>
                        <input
                            type="text"
                            disabled
                            value="12/34"
                            className="w-full bg-black/20 border border-white/10 py-3 px-4 text-white/50 font-mono rounded-sm cursor-not-allowed"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-vsoe-gold">CVC</label>
                        <input
                            type="text"
                            disabled
                            value="123"
                            className="w-full bg-black/20 border border-white/10 py-3 px-4 text-white/50 font-mono rounded-sm cursor-not-allowed"
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <button
                    type="submit"
                    disabled={isProcessing}
                    className="bg-vsoe-gold text-vsoe-midnight px-12 py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors min-w-[200px] flex justify-center items-center shadow-lg hover:shadow-xl active:scale-95 duration-200"
                >
                    {isProcessing ? (
                        <div className="w-4 h-4 border-2 border-vsoe-midnight border-t-transparent rounded-full animate-spin" />
                    ) : `Simulate Pay €${amount.toLocaleString()}`}
                </button>
            </div>
        </form>
    );
}
