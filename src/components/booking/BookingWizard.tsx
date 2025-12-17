'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createBooking } from '@/app/book/actions';
import MagneticButton from '@/components/ui/MagneticButton';
import { Check, User, CreditCard } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface BookingWizardProps {
    journey: any;
}

export default function BookingWizard({ journey }: BookingWizardProps) {
    const [step, setStep] = useState(1);
    const [selectedCabin, setSelectedCabin] = useState<any>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    // Cabin Options Data (Static descriptions + Dynamic Data)
    const options = [
        {
            type: 'historic',
            title: 'Historic Cabin',
            desc: 'A cozy banquette by day, transforming into comfortable berths by night. The authentic 1920s experience.',
            data: journey.options.historic
        },
        {
            type: 'suite',
            title: 'Suite',
            desc: 'Spacious double or twin beds with private marble ensuite. Modern luxury meets vintage charm.',
            data: journey.options.suite
        },
        {
            type: 'grand_suite',
            title: 'Grand Suite',
            desc: 'The ultimate indulgence. Free-flowing champagne, 24h butler, and private dining.',
            data: journey.options.grand_suite
        }
    ];

    async function handleSubmit(formData: FormData) {
        setIsSubmitting(true);
        const res = await createBooking(null, formData);
        setIsSubmitting(false);
        if (res.success) {
            setStep(3); // Success Step
        } else {
            alert("Booking failed. Please try again.");
        }
    }

    return (
        <div className="w-full max-w-4xl mx-auto">
            {/* Steps Indicator */}
            <div className="flex justify-between items-center mb-12 border-b border-white/10 pb-6">
                {[1, 2, 3].map((s) => (
                    <div key={s} className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border transition-colors duration-500
                            ${step >= s ? 'bg-vsoe-gold border-vsoe-gold text-vsoe-midnight' : 'border-white/20 text-white/40'}`}>
                            {step > s ? <Check size={14} /> : s}
                        </div>
                        <span className={`text-xs uppercase tracking-widest ${step >= s ? 'text-vsoe-gold' : 'text-white/40'}`}>
                            {s === 1 ? 'Cabin' : s === 2 ? 'Details' : 'Confirmed'}
                        </span>
                    </div>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <h2 className="text-3xl font-serif text-white mb-8">Select Your Accommodation</h2>
                        <div className="grid gap-6">
                            {options.map((opt) => (
                                <div
                                    key={opt.type}
                                    onClick={() => opt.data && setSelectedCabin(opt)}
                                    className={`relative p-8 border rounded-sm cursor-pointer transition-all duration-300 group
                                        ${!opt.data ? 'opacity-50 grayscale cursor-not-allowed border-white/5' :
                                            selectedCabin?.type === opt.type ? 'bg-vsoe-gold/10 border-vsoe-gold' : 'border-white/10 hover:border-white/30'}`}
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="flex items-center gap-4 mb-2">
                                                <h3 className="text-xl font-serif text-vsoe-cream">{opt.title}</h3>
                                                {!opt.data && <span className="text-[10px] bg-red-900/50 text-red-200 px-2 py-1 uppercase tracking-widest">Sold Out</span>}
                                            </div>
                                            <p className="text-white/60 text-sm max-w-xl">{opt.desc}</p>
                                        </div>
                                        {opt.data && (
                                            <div className="text-right">
                                                <span className="text-2xl font-serif text-vsoe-gold">€{opt.data.price.toLocaleString()}</span>
                                                <p className="text-[10px] uppercase tracking-widest text-white/40">Per Person</p>
                                            </div>
                                        )}
                                    </div>
                                    
                                    {/* Selection Ring */}
                                    <div className={`absolute top-1/2 right-8 -translate-y-1/2 w-6 h-6 rounded-full border border-white/20 flex items-center justify-center
                                         ${selectedCabin?.type === opt.type ? 'bg-vsoe-gold border-vsoe-gold' : ''}`}>
                                        {selectedCabin?.type === opt.type && <div className="w-2 h-2 bg-vsoe-midnight rounded-full" />}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-end pt-8">
                             <button
                                onClick={() => selectedCabin && setStep(2)}
                                disabled={!selectedCabin}
                                className={`px-8 py-3 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors
                                    ${selectedCabin ? 'bg-vsoe-gold text-vsoe-midnight hover:bg-white' : 'bg-white/10 text-white/30 cursor-not-allowed'}`}
                            >
                                Continue to Details
                            </button>
                        </div>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                    >
                        <h2 className="text-3xl font-serif text-white mb-2">Guest Information</h2>
                        <p className="text-white/60 mb-8">Please enter the details for the primary passenger.</p>

                        <form action={handleSubmit} className="space-y-8">
                            <input type="hidden" name="journeyId" value={journey.id} />
                            <input type="hidden" name="cabinId" value={selectedCabin?.data.cabinId} />
                            <input type="hidden" name="price" value={selectedCabin?.data.price} />

                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-vsoe-gold">First Name</label>
                                    <input required name="firstName" className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:border-vsoe-gold outline-none transition-colors" placeholder="John" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-vsoe-gold">Last Name</label>
                                    <input required name="lastName" className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:border-vsoe-gold outline-none transition-colors" placeholder="Doe" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-vsoe-gold">Email Address</label>
                                    <input required type="email" name="email" className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:border-vsoe-gold outline-none transition-colors" placeholder="john@example.com" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-vsoe-gold">Phone Number</label>
                                    <input required type="tel" name="phone" className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:border-vsoe-gold outline-none transition-colors" placeholder="+1 234 567 8900" />
                                </div>
                            </div>

                            <div className="bg-white/5 p-6 rounded-sm border border-white/10 mt-8">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-sm text-white/70">Total Amount</span>
                                    <span className="text-2xl font-serif text-vsoe-gold">€{selectedCabin?.data.price.toLocaleString()}</span>
                                </div>
                                <p className="text-xs text-white/40">Secure payment processing. By continuing you agree to our Terms & Conditions.</p>
                            </div>

                            <div className="flex justify-between pt-8">
                                <button type="button" onClick={() => setStep(1)} className="text-xs uppercase tracking-widest text-white/60 hover:text-white">Back</button>
                                
                                <MagneticButton className="bg-vsoe-gold text-vsoe-midnight px-12 py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors min-w-[200px] flex justify-center">
                                    {isSubmitting ? (
                                        <div className="w-4 h-4 border-2 border-vsoe-midnight border-t-transparent rounded-full animate-spin"/>
                                    ) : 'Confirm Booking'}
                                </MagneticButton>
                            </div>
                        </form>
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div
                        key="step3"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-20"
                    >
                        <div className="w-24 h-24 bg-vsoe-gold/20 rounded-full flex items-center justify-center mx-auto mb-8 text-vsoe-gold">
                            <Check size={48} />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-serif text-vsoe-cream mb-6">Booking Confirmed</h2>
                        <p className="text-white/70 text-lg max-w-md mx-auto mb-12">
                            Thank you for choosing the Venice Simplon-Orient-Express. A confirmation email has been sent to your inbox.
                        </p>
                        <div className="flex justify-center gap-6">
                            <button onClick={() => router.push('/')} className="text-xs uppercase tracking-widest text-white/60 hover:text-white border-b border-transparent hover:border-white pb-1 transition-all">
                                Return Home
                            </button>
                            <button onClick={() => router.push('/stories')} className="text-xs uppercase tracking-widest text-vsoe-gold hover:text-white border-b border-vsoe-gold hover:border-white pb-1 transition-all">
                                Read Our Stories
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
