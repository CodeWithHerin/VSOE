'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createBooking } from '@/app/book/actions';
import MagneticButton from '@/components/ui/MagneticButton';
import { Check, Star, Train, ChevronRight, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';
import PaymentForm from './PaymentForm';

interface BookingWizardProps {
    journey: any;
}

export default function BookingWizard({ journey }: BookingWizardProps) {
    const [step, setStep] = useState(1);
    const [selectedCabin, setSelectedCabin] = useState<any>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderID, setOrderID] = useState<string>('');
    const [amountStr, setAmountStr] = useState<string>('');
    const [paymentAmount, setPaymentAmount] = useState<number>(0);

    // Payment State
    const [formDataState, setFormDataState] = useState<FormData | null>(null);
    const [completedBookingId, setCompletedBookingId] = useState<string | null>(null);

    const router = useRouter();

    // Cabin Options Data 
    const options = [
        {
            type: 'historic',
            title: 'Historic Cabin',
            desc: 'A cozy banquette by day, transforming into comfortable berths by night. The authentic 1920s experience.',
            data: journey.options?.historic
        },
        {
            type: 'suite',
            title: 'Suite',
            desc: 'Spacious double or twin beds with private marble ensuite. Modern luxury meets vintage charm.',
            data: journey.options?.suite
        },
        {
            type: 'grand_suite',
            title: 'Grand Suite',
            desc: 'The ultimate indulgence. Free-flowing champagne, 24h butler, and private dining.',
            data: journey.options?.grand_suite
        }
    ];

    // Fetch price from DB when reaching step 3, then let browser handle PayPal
    useEffect(() => {
        if (step === 3 && selectedCabin?.data?.price) {
            setAmountStr(''); // Reset while loading
            setOrderID('');
            fetch('/api/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    journeyId: journey.id,
                    cabinId: selectedCabin.data.cabinId,
                    guests: 1,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.id) {
                        setOrderID(data.id);
                    }
                    if (data.amount) {
                        setPaymentAmount(data.amount);
                        setAmountStr(data.amountStr ?? String(data.amount));
                    } else if (data.error) {
                        console.error('Price lookup failed:', data.error);
                    }
                })
                .catch((err) => console.error('Payment init failed', err));
        }
    }, [step, selectedCabin, journey.id]);

    const handleDetailsSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        setFormDataState(data);
        setStep(3); // Go to Payment
    };

    const finalizeBooking = async () => {
        console.log("💰 Finalizing booking...", { hasFormData: !!formDataState });

        if (!formDataState) {
            console.error("❌ No form data found! Cannot proceed.");
            alert("Please fill in guest details first.");
            setStep(2);
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await createBooking(null, formDataState);
            console.log("✅ Booking Result:", res);

            setIsSubmitting(false);

            if (res.success && res.bookingId) {
                console.log("🎉 Booking Confirmed. ID:", res.bookingId);
                setCompletedBookingId(res.bookingId);
                setStep(4); // Success Step
            } else {
                console.error("❌ Booking Failed:", res);
                alert("Booking creation failed: " + (res.error || "Unknown error"));
            }
        } catch (err) {
            console.error("❌ Critical Error in finalizeBooking:", err);
            setIsSubmitting(false);
            alert("An unexpected error occurred. Please check console.");
        }
    };

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.4 } }
    } as const;

    return (
        <div className="w-full max-w-5xl mx-auto">
            {/* Cinematic Progress Tracker - "The Timeline" */}
            <div className="relative mb-16 md:mb-20 px-4">
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -z-10" />
                <div className="flex justify-between items-center max-w-3xl mx-auto">
                    {[1, 2, 3, 4].map((s) => (
                        <div key={s} className="relative flex flex-col items-center gap-4 group">
                            <motion.div
                                animate={{
                                    scale: step === s ? 1.2 : 1,
                                    borderColor: step >= s ? 'rgba(212, 175, 55, 1)' : 'rgba(255, 255, 255, 0.2)',
                                    backgroundColor: step >= s ? '#0f172a' : 'transparent'
                                }}
                                className={`w-10 h-10 md:w-12 md:h-12 rounded-full border-2 flex items-center justify-center transition-colors duration-500 z-10 bg-vsoe-midnight`}
                            >
                                {step > s ? (
                                    <Check size={16} className="text-vsoe-gold" />
                                ) : (
                                    <span className={`text-sm font-serif ${step >= s ? 'text-vsoe-gold' : 'text-white/30'}`}>{s}</span>
                                )}
                            </motion.div>
                            <span className={`absolute -bottom-8 text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold whitespace-nowrap transition-colors duration-300
                                ${step >= s ? 'text-vsoe-gold' : 'text-white/20'}`}>
                                {s === 1 ? 'Select' : s === 2 ? 'Details' : s === 3 ? 'Payment' : 'Complete'}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <AnimatePresence mode="wait">
                {/* STEP 1: CABIN SELECTION */}
                {step === 1 && (
                    <motion.div
                        key="step1"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="space-y-8"
                    >
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-serif text-vsoe-cream mb-4">Choose Your Sanctuary</h2>
                            <p className="text-white/60 text-sm md:text-base max-w-xl mx-auto">
                                Each cabin is a restored masterpiece of 1920s craftsmanship. Select the level of luxury that suits your journey.
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-6">
                            {options.map((opt) => (
                                <motion.div
                                    key={opt.type}
                                    whileHover={opt.data ? { y: -10 } : {}}
                                    onClick={() => opt.data && setSelectedCabin(opt)}
                                    className={`relative flex flex-col justify-between p-8 rounded-sm border cursor-pointer transition-all duration-500 overflow-hidden h-full min-h-[400px]
                                        ${!opt.data ? 'opacity-40 grayscale cursor-not-allowed border-white/5' :
                                            selectedCabin?.type === opt.type
                                                ? 'bg-gradient-to-b from-vsoe-gold/10 to-transparent border-vsoe-gold shadow-[0_0_30px_rgba(212,175,55,0.1)]'
                                                : 'bg-white/5 border-white/10 hover:border-vsoe-gold/50 hover:bg-white/5'}`}
                                >
                                    {/* Selection Glow */}
                                    {selectedCabin?.type === opt.type && (
                                        <div className="absolute top-0 left-0 w-full h-1 bg-vsoe-gold animate-pulse" />
                                    )}

                                    <div>
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-vsoe-gold">
                                                {opt.type === 'historic' ? <Train size={18} /> :
                                                    opt.type === 'suite' ? <Star size={18} /> : <div className="flex"><Star size={12} /><Star size={12} /></div>}
                                            </div>
                                            {!opt.data && <span className="text-[9px] bg-red-900/80 text-red-100 px-2 py-1 uppercase tracking-widest rounded-sm">Sold Out</span>}
                                        </div>

                                        <h3 className="text-2xl font-serif text-vsoe-cream mb-4">{opt.title}</h3>
                                        <p className="text-white/60 text-sm leading-relaxed mb-8">{opt.desc}</p>
                                    </div>

                                    {opt.data && (
                                        <div className="border-t border-white/10 pt-6 mt-auto">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Price per person</span>
                                                <span className="text-3xl font-serif text-vsoe-gold">€{opt.data.price.toLocaleString()}</span>
                                            </div>

                                            <div className={`mt-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold transition-colors duration-300
                                                ${selectedCabin?.type === opt.type ? 'text-vsoe-gold' : 'text-white/30'}`}>
                                                {selectedCabin?.type === opt.type ? 'Selected' : 'Select Cabin'}
                                                {selectedCabin?.type !== opt.type && <ChevronRight size={12} />}
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>

                        <div className="flex justify-center pt-12">
                            <button
                                onClick={() => selectedCabin && setStep(2)}
                                disabled={!selectedCabin}
                                className={`px-12 py-4 text-sm font-bold uppercase tracking-[0.2em] transition-all duration-300 border
                                    ${selectedCabin
                                        ? 'bg-vsoe-gold text-vsoe-midnight border-vsoe-gold hover:bg-transparent hover:text-vsoe-gold'
                                        : 'bg-transparent text-white/20 border-white/10 cursor-not-allowed'}`}
                            >
                                Continue To Details
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* STEP 2: GUEST DETAILS */}
                {step === 2 && (
                    <motion.div
                        key="step2"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="max-w-2xl mx-auto"
                    >
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-serif text-white mb-2">Guest Information</h2>
                            <p className="text-white/60">Who will be travelling on this journey?</p>
                        </div>

                        <form onSubmit={handleDetailsSubmit} className="space-y-8 bg-white/5 p-10 rounded-sm border border-white/10 backdrop-blur-sm">
                            <input type="hidden" name="journeyId" value={journey.id} />
                            <input type="hidden" name="cabinId" value={selectedCabin?.data.cabinId} />
                            <input type="hidden" name="price" value={selectedCabin?.data.price} />

                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-2 group">
                                    <label className="text-[10px] uppercase tracking-widest text-vsoe-gold/80 block group-focus-within:text-vsoe-gold transition-colors">First Name</label>
                                    <input required name="firstName" className="w-full bg-transparent border-b border-white/20 py-3 text-white text-lg focus:border-vsoe-gold outline-none transition-all placeholder:text-white/10" placeholder="e.g. Alexander" />
                                </div>
                                <div className="space-y-2 group">
                                    <label className="text-[10px] uppercase tracking-widest text-vsoe-gold/80 block group-focus-within:text-vsoe-gold transition-colors">Last Name</label>
                                    <input required name="lastName" className="w-full bg-transparent border-b border-white/20 py-3 text-white text-lg focus:border-vsoe-gold outline-none transition-all placeholder:text-white/10" placeholder="e.g. Hamilton" />
                                </div>
                                <div className="space-y-2 group md:col-span-2">
                                    <label className="text-[10px] uppercase tracking-widest text-vsoe-gold/80 block group-focus-within:text-vsoe-gold transition-colors">Email Address</label>
                                    <input required type="email" name="email" className="w-full bg-transparent border-b border-white/20 py-3 text-white text-lg focus:border-vsoe-gold outline-none transition-all placeholder:text-white/10" placeholder="alexander@example.com" />
                                </div>
                                <div className="space-y-2 group md:col-span-2">
                                    <label className="text-[10px] uppercase tracking-widest text-vsoe-gold/80 block group-focus-within:text-vsoe-gold transition-colors">Phone Number</label>
                                    <input required type="tel" name="phone" className="w-full bg-transparent border-b border-white/20 py-3 text-white text-lg focus:border-vsoe-gold outline-none transition-all placeholder:text-white/10" placeholder="+1 234 567 8900" />
                                </div>
                            </div>

                            <div className="flex justify-between items-center pt-10 border-t border-white/5">
                                <button type="button" onClick={() => setStep(1)} className="text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors">Back</button>

                                <button type="submit" className="bg-vsoe-gold text-vsoe-midnight px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors">
                                    Continue to Payment
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}

                {/* STEP 3: PAYMENT */}
                {step === 3 && (
                    <motion.div
                        key="step3"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="max-w-2xl mx-auto"
                    >
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-serif text-white mb-2">Secure Reservation</h2>
                            <p className="text-white/60">Finalize your booking securely.</p>
                        </div>

                        <div className="bg-white/5 p-8 rounded-sm border border-white/10">
                            {!amountStr ? (
                                <div className="flex flex-col items-center py-12">
                                    <div className="w-8 h-8 border-2 border-vsoe-gold border-t-transparent rounded-full animate-spin mb-4" />
                                    <p className="text-xs uppercase tracking-widest text-white/40">Initializing Secure Gateway...</p>
                                </div>
                            ) : (
                                <PaymentForm
                                    amount={paymentAmount}
                                    amountStr={amountStr}
                                    orderID={orderID}
                                    onSuccess={finalizeBooking}
                                    validate={() => true}
                                />
                            )}
                        </div>

                        <div className="mt-6 text-center">
                            <button type="button" onClick={() => setStep(2)} className="text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors">Back to Details</button>
                        </div>
                    </motion.div>
                )}

                {/* STEP 4: CONFIRMATION */}
                {step === 4 && (
                    <motion.div
                        key="step4"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="max-w-3xl mx-auto rounded-sm border border-vsoe-gold/30 bg-vsoe-midnight p-1 md:p-2"
                    >
                        <div className="border border-dashed border-vsoe-gold/30 p-8 md:p-16 flex flex-col items-center text-center relative overflow-hidden">
                            {/* Golden Ticket BG Effect */}
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10" />

                            <motion.div
                                initial={{ scale: 0, rotate: -10 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", duration: 0.8 }}
                                className="w-24 h-24 bg-vsoe-gold rounded-full flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(212,175,55,0.4)]"
                            >
                                <Check size={40} className="text-vsoe-midnight" />
                            </motion.div>

                            <h2 className="text-4xl md:text-5xl font-serif text-vsoe-gold mb-6 relative z-10">Journey Confirmed</h2>
                            <p className="text-white/70 text-lg max-w-lg mx-auto mb-10 leading-relaxed z-10">
                                Welcome aboard, {formDataState?.get('firstName') as string}. Your carriage awaits.
                                A confirmation has been sent to {formDataState?.get('email') as string}.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md z-10">
                                <button onClick={() => router.push('/')} className="px-6 py-4 border border-white/10 text-xs uppercase tracking-[0.2em] text-white/60 hover:text-white hover:border-white/30 transition-all">
                                    Return Home
                                </button>

                                {completedBookingId && (
                                    <a
                                        href={`/invoice/${completedBookingId}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-6 py-4 bg-vsoe-gold text-vsoe-midnight text-xs font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors flex items-center justify-center gap-2"
                                    >
                                        <FileText size={14} /> View Invoice
                                    </a>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
