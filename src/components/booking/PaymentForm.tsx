'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PaymentFormProps {
    onSuccess: () => void;
    amount: number;
    amountStr: string;
    validate: () => boolean;
    orderID: string;
}

export default function PaymentForm({ onSuccess, amount, amountStr, validate, orderID }: PaymentFormProps) {
    const [name, setName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');
    const [errors, setErrors] = useState<string[]>([]);
    
    const [isProcessing, setIsProcessing] = useState(false);
    const [processingStep, setProcessingStep] = useState(0);

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/\D/g, '');
        const formatted = val.match(/.{1,4}/g)?.join(' ') || '';
        setCardNumber(formatted.substring(0, 19));
    };

    const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value.replace(/\D/g, '');
        if (val.length >= 2) {
            val = val.substring(0, 2) + '/' + val.substring(2, 4);
        }
        setExpiry(val.substring(0, 5));
    };

    const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/\D/g, '');
        setCvv(val.substring(0, 4));
    };

    const validateForm = () => {
        const newErrors = [];
        if (!name.trim()) newErrors.push('Cardholder name is required.');
        if (cardNumber.replace(/\s/g, '').length !== 16) newErrors.push('Card number must be 16 digits.');
        
        if (expiry.length !== 5) {
            newErrors.push('Expiry date must be in MM/YY format.');
        } else {
            const [month, year] = expiry.split('/');
            const now = new Date();
            const currentYear = parseInt(now.getFullYear().toString().slice(-2));
            const currentMonth = now.getMonth() + 1;
            
            const expMonth = parseInt(month);
            const expYear = parseInt(year);
            
            if (expMonth < 1 || expMonth > 12) {
                newErrors.push('Invalid expiry month.');
            } else if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
                newErrors.push('Card has expired.');
            }
        }

        if (cvv.length < 3 || cvv.length > 4) newErrors.push('CVV must be 3 or 4 digits.');

        setErrors(newErrors);
        return newErrors.length === 0;
    };

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validate() || !validateForm()) return;

        setIsProcessing(true);
        setProcessingStep(1); // Verifying payment details...

        // Simulate verification delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setProcessingStep(2); // Securing your reservation...

        // Simulate finalization delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        onSuccess();
    };

    if (isProcessing) {
        return (
            <div className="flex flex-col items-center justify-center py-16 space-y-8 bg-white/5 border border-white/10 rounded-sm">
                <div className="relative w-16 h-16">
                    {/* Outer Ring */}
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                        className="absolute inset-0 border-2 border-vsoe-gold/20 border-t-vsoe-gold rounded-full"
                    />
                    {/* Inner Ring */}
                    <motion.div 
                        animate={{ rotate: -360 }}
                        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                        className="absolute inset-2 border-2 border-vsoe-gold/20 border-b-vsoe-gold rounded-full"
                    />
                </div>
                
                <AnimatePresence mode="wait">
                    <motion.p
                        key={processingStep}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-sm font-serif text-vsoe-cream tracking-wide"
                    >
                        {processingStep === 1 ? 'Verifying payment details...' : 'Securing your reservation...'}
                    </motion.p>
                </AnimatePresence>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center pb-6 border-b border-white/10">
                <span className="text-xs uppercase tracking-widest text-white/50">Total Due</span>
                <span className="text-2xl font-serif text-vsoe-gold">€{amount.toLocaleString()}</span>
            </div>

            <form onSubmit={handlePayment} className="space-y-6">
                <div className="space-y-2 group">
                    <label className="text-[10px] uppercase tracking-widest text-vsoe-gold/80 block group-focus-within:text-vsoe-gold transition-colors font-serif">
                        Cardholder Name
                    </label>
                    <input 
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-transparent border-b border-white/20 py-3 text-vsoe-cream text-lg focus:border-vsoe-gold outline-none transition-all placeholder:text-white/10" 
                        placeholder="e.g. Alexander Hamilton" 
                    />
                </div>

                <div className="space-y-2 group">
                    <label className="text-[10px] uppercase tracking-widest text-vsoe-gold/80 block group-focus-within:text-vsoe-gold transition-colors font-serif">
                        Card Number
                    </label>
                    <input 
                        type="text"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        className="w-full bg-transparent border-b border-white/20 py-3 text-vsoe-cream text-lg focus:border-vsoe-gold outline-none transition-all placeholder:text-white/10 tracking-widest" 
                        placeholder="XXXX XXXX XXXX XXXX" 
                        maxLength={19}
                    />
                </div>

                <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2 group">
                        <label className="text-[10px] uppercase tracking-widest text-vsoe-gold/80 block group-focus-within:text-vsoe-gold transition-colors font-serif">
                            Expiry Date
                        </label>
                        <input 
                            type="text"
                            value={expiry}
                            onChange={handleExpiryChange}
                            className="w-full bg-transparent border-b border-white/20 py-3 text-vsoe-cream text-lg focus:border-vsoe-gold outline-none transition-all placeholder:text-white/10 tracking-widest" 
                            placeholder="MM/YY" 
                            maxLength={5}
                        />
                    </div>
                    <div className="space-y-2 group">
                        <label className="text-[10px] uppercase tracking-widest text-vsoe-gold/80 block group-focus-within:text-vsoe-gold transition-colors font-serif">
                            CVV
                        </label>
                        <input 
                            type="password"
                            value={cvv}
                            onChange={handleCvvChange}
                            className="w-full bg-transparent border-b border-white/20 py-3 text-vsoe-cream text-lg focus:border-vsoe-gold outline-none transition-all placeholder:text-white/10 tracking-widest" 
                            placeholder="•••" 
                            maxLength={4}
                        />
                    </div>
                </div>

                {errors.length > 0 && (
                    <div className="bg-red-950/40 border border-red-900/50 p-4 rounded-sm space-y-1">
                        {errors.map((err, i) => (
                            <p key={i} className="text-xs text-red-200/80 uppercase tracking-wide">{err}</p>
                        ))}
                    </div>
                )}

                <button 
                    type="submit"
                    className="w-full mt-8 bg-vsoe-gold text-vsoe-midnight px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors"
                >
                    Secure Reservation
                </button>
            </form>
        </div>
    );
}
