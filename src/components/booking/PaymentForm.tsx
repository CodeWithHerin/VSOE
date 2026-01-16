'use client';

import React, { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import MagneticButton from '@/components/ui/MagneticButton';

interface PaymentFormProps {
    onSuccess: () => void;
    amount: number;
    validate: () => boolean;
}

export default function PaymentForm({ onSuccess, amount, validate }: PaymentFormProps) {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Run parent validation first
        if (!validate()) {
            return;
        }

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);

        const { error: submitError } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/booking/confirmation`, // This won't be hit in SPA flow usually if we handle redirects manually or incomplete
            },
            redirect: "if_required", // Important: prevent auto redirect to handle state
        });

        if (submitError) {
            setError(submitError.message || "An unexpected error occurred.");
            setIsProcessing(false);
        } else {
            // Payment succeeded
            onSuccess();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white/5 p-6 rounded-sm border border-white/10">
                <PaymentElement
                    options={{
                        layout: 'tabs',
                        business: { name: 'VSOE' }
                    }}
                />
            </div>

            {error && (
                <div className="bg-red-900/20 border border-red-900/50 text-red-200 p-4 rounded-sm text-sm">
                    {error}
                </div>
            )}

            <div className="flex justify-end pt-4">
                <MagneticButton className="bg-vsoe-gold text-vsoe-midnight px-12 py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors min-w-[200px] flex justify-center">
                    <button type="submit" disabled={!stripe || isProcessing} className="w-full h-full flex items-center justify-center">
                        {isProcessing ? (
                            <div className="w-4 h-4 border-2 border-vsoe-midnight border-t-transparent rounded-full animate-spin" />
                        ) : `Pay €${amount.toLocaleString()}`}
                    </button>
                </MagneticButton>
            </div>
        </form>
    );
}
