'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createBooking } from '@/app/[lang]/book/actions';
import MagneticButton from '@/components/ui/MagneticButton';
import { Check, Star, Train, ChevronRight, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';

const PaymentForm = dynamic(() => import('./PaymentForm'), {
    ssr: false,
    loading: () => (
        <div className="h-40 bg-white/5 rounded-sm animate-pulse flex items-center justify-center">
            <span className="text-[10px] uppercase tracking-[0.2em] text-vsoe-gold/60 font-bold">Loading Secure Payment...</span>
        </div>
    )
});

import { useTranslation } from '@/lib/i18n/useTranslation';

interface BookingWizardProps {
    journey: any;
}

export default function BookingWizard({ journey }: BookingWizardProps) {
    const { t, language } = useTranslation();
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
    const { data: session, status: sessionStatus } = useSession();

    // Cabin Options Data 
    const options = [
        {
            type: 'historic',
            title: t.wizard.historicCabin,
            desc: t.wizard.historicDesc,
            data: journey.options?.historic
        },
        {
            type: 'suite',
            title: t.wizard.suite,
            desc: t.wizard.suiteDesc,
            data: journey.options?.suite
        },
        {
            type: 'grand_suite',
            title: t.wizard.grandSuite,
            desc: t.wizard.grandSuiteDesc,
            data: journey.options?.grand_suite
        }
    ];

    // Payment step bypassed; directly rendering Order Summary on step 3

    const [phoneError, setPhoneError] = useState<string | null>(null);

    const handleDetailsSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const phone = (data.get('phone') as string)?.trim();
        const phoneRegex = /^\+?[\d\s\-\(\)]{7,20}$/;
        if (!phoneRegex.test(phone)) {
            setPhoneError('Please enter a valid phone number (e.g. +44 20 7946 0958)');
            return;
        }
        setPhoneError(null);
        setFormDataState(data);
        setStep(3);
    };

    const finalizeBooking = async () => {
        if (!formDataState) {
            console.error("❌ No form data found! Cannot proceed.");
            alert("Please fill in guest details first.");
            setStep(2);
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await createBooking(null, formDataState);

            setIsSubmitting(false);

            if (res.success && res.bookingId) {
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
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.4 } }
    };

    const steps = [
        { id: 1, label: t.wizard.step1 },
        { id: 2, label: t.wizard.step2 },
        { id: 3, label: t.wizard.step3 },
        { id: 4, label: t.wizard.step4 }
    ];

    return (
        <div className="w-full max-w-5xl mx-auto">
            {/* Cinematic Progress Tracker - "The Timeline" */}
            <div className="relative mb-16 md:mb-20 px-6 sm:px-4">
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -z-10" />
                <div className="flex justify-between items-center max-w-3xl mx-auto">
                    {steps.map((s) => (
                        <div key={s.id} className="relative flex flex-col items-center gap-4 group">
                            <motion.div
                                animate={{
                                    scale: step === s.id ? 1.2 : 1,
                                    borderColor: step >= s.id ? 'rgba(212, 175, 55, 1)' : 'rgba(255, 255, 255, 0.2)',
                                    backgroundColor: step >= s.id ? '#0f172a' : 'transparent'
                                }}
                                className={`w-10 h-10 md:w-12 md:h-12 rounded-full border-2 flex items-center justify-center transition-colors duration-500 z-10 bg-vsoe-midnight`}
                            >
                                {step > s.id ? (
                                    <Check size={16} className="text-vsoe-gold" />
                                ) : (
                                    <span className={`text-sm font-serif ${step >= s.id ? 'text-vsoe-gold' : 'text-white/30'}`}>{s.id}</span>
                                )}
                            </motion.div>
                            <span className={`absolute -bottom-7 md:-bottom-8 text-[8px] sm:text-[10px] md:text-xs uppercase tracking-[0.1em] sm:tracking-[0.2em] font-bold whitespace-nowrap transition-colors duration-300
                                ${step >= s.id ? 'text-vsoe-gold' : 'text-white/20'}`}>
                                {s.label}
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
                            <h2 className="text-3xl md:text-4xl font-serif text-vsoe-cream mb-4">{t.wizard.chooseSanctuary}</h2>
                            <p className="text-white/60 text-sm md:text-base max-w-xl mx-auto">
                                {t.wizard.sanctuaryDesc}
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
                                            {!opt.data && <span className="text-[9px] bg-red-900/80 text-red-100 px-2 py-1 uppercase tracking-widest rounded-sm">{t.wizard.soldOut}</span>}
                                        </div>

                                        <h3 className="text-2xl font-serif text-vsoe-cream mb-4">{opt.title}</h3>
                                        <p className="text-white/60 text-sm leading-relaxed mb-8">{opt.desc}</p>
                                    </div>

                                    {opt.data && (
                                        <div className="border-t border-white/10 pt-6 mt-auto">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] uppercase tracking-widest text-white/40 mb-1">{t.wizard.pricePerPerson}</span>
                                                <span className="text-3xl font-serif text-vsoe-gold">€{opt.data.price.toLocaleString(language)}</span>
                                            </div>

                                            <div className={`mt-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold transition-colors duration-300
                                                ${selectedCabin?.type === opt.type ? 'text-vsoe-gold' : 'text-white/30'}`}>
                                                {selectedCabin?.type === opt.type ? t.wizard.selected : t.wizard.selectCabin}
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
                                {t.wizard.continueToDetails}
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
                            <h2 className="text-3xl font-serif text-white mb-2">{t.wizard.guestInfo}</h2>
                            <p className="text-white/60">{t.wizard.travellingWho}</p>
                        </div>

                        {sessionStatus === 'loading' ? (
                            <div className="h-40 flex items-center justify-center">
                                <div className="w-6 h-6 border-2 border-vsoe-gold border-t-transparent rounded-full animate-spin" />
                            </div>
                        ) : (
                        <form onSubmit={handleDetailsSubmit} className="space-y-8 bg-white/5 p-6 md:p-10 rounded-sm border border-white/10 backdrop-blur-sm">
                            <input type="hidden" name="journeyId" value={journey.id} />
                            <input type="hidden" name="cabinId" value={selectedCabin?.data.cabinId} />
                            <input type="hidden" name="price" value={selectedCabin?.data.price} />

                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-2 group">
                                    <label className="text-[10px] uppercase tracking-widest text-vsoe-gold/80 block group-focus-within:text-vsoe-gold transition-colors">{t.wizard.firstName}</label>
                                    <input required name="firstName" defaultValue={session?.user?.name?.split(' ')[0] ?? ''} className="w-full bg-transparent border-b border-white/20 py-3 text-white text-lg focus:border-vsoe-gold outline-none transition-all placeholder:text-white/10" placeholder="e.g. Alexander" />
                                </div>
                                <div className="space-y-2 group">
                                    <label className="text-[10px] uppercase tracking-widest text-vsoe-gold/80 block group-focus-within:text-vsoe-gold transition-colors">{t.wizard.lastName}</label>
                                    <input required name="lastName" defaultValue={session?.user?.name?.split(' ').slice(1).join(' ') ?? ''} className="w-full bg-transparent border-b border-white/20 py-3 text-white text-lg focus:border-vsoe-gold outline-none transition-all placeholder:text-white/10" placeholder="e.g. Hamilton" />
                                </div>
                                <div className="space-y-2 group md:col-span-2">
                                    <label className="text-[10px] uppercase tracking-widest text-vsoe-gold/80 block group-focus-within:text-vsoe-gold transition-colors">{t.wizard.email}</label>
                                    <input required type="email" name="email" defaultValue={session?.user?.email ?? ''} className="w-full bg-transparent border-b border-white/20 py-3 text-white text-lg focus:border-vsoe-gold outline-none transition-all placeholder:text-white/10" placeholder="alexander@example.com" />
                                </div>
                                <div className="space-y-2 group md:col-span-2">
                                    <label className="text-[10px] uppercase tracking-widest text-vsoe-gold/80 block group-focus-within:text-vsoe-gold transition-colors">{t.wizard.phone}</label>
                                    <input required type="tel" name="phone" onChange={() => setPhoneError(null)} className={`w-full bg-transparent border-b py-3 text-white text-lg focus:border-vsoe-gold outline-none transition-all placeholder:text-white/10 ${phoneError ? 'border-red-400/60' : 'border-white/20'}`} placeholder="+1 234 567 8900" />
                                    {phoneError && <p className="text-red-400 text-[11px] mt-1">{phoneError}</p>}
                                </div>
                            </div>

                            <div className="flex justify-between items-center pt-10 border-t border-white/5">
                                <button type="button" onClick={() => setStep(1)} className="text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors">{t.wizard.back}</button>

                                <button type="submit" className="bg-vsoe-gold text-vsoe-midnight px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors">
                                    {t.wizard.continueToPayment}
                                </button>
                            </div>
                        </form>
                        )}
                    </motion.div>
                )}

                {/* STEP 3: ORDER SUMMARY */}
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
                            <h2 className="text-3xl font-serif text-white mb-2">{t.wizard.secureRes || "Order Summary"}</h2>
                            <p className="text-white/60">{t.wizard.finalizeSecurely || "Please review your journey details"}</p>
                        </div>

                        <div className="bg-white/5 p-8 rounded-sm border border-white/10 space-y-6">
                            <div className="flex justify-between border-b border-white/10 pb-6">
                                <div>
                                    <h3 className="text-lg font-serif text-vsoe-gold mb-1">{journey.name}</h3>
                                    <p className="text-sm text-white/60">{selectedCabin?.title}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-serif text-vsoe-cream">€{selectedCabin?.data?.price?.toLocaleString(language)}</p>
                                    <p className="text-[10px] uppercase tracking-widest text-white/40">Total Amount</p>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Guest</p>
                                    <p className="text-white/80">{String(formDataState?.get('firstName') || '')} {String(formDataState?.get('lastName') || '')}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Contact</p>
                                    <p className="text-white/80">{String(formDataState?.get('email') || '')}</p>
                                </div>
                            </div>

                            <button
                                onClick={finalizeBooking}
                                disabled={isSubmitting}
                                className="w-full bg-vsoe-gold text-vsoe-midnight py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors mt-8 flex justify-center"
                            >
                                {isSubmitting ? <div className="w-4 h-4 border-2 border-vsoe-midnight border-t-transparent rounded-full animate-spin" /> : "Confirm Booking"}
                            </button>
                        </div>

                        <div className="mt-6 text-center">
                            <button type="button" onClick={() => setStep(2)} className="text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors">{t.wizard.backToDetails}</button>
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

                            <h2 className="text-4xl md:text-5xl font-serif text-vsoe-gold mb-6 relative z-10">{t.wizard.confirmed}</h2>
                            <p className="text-white/70 text-lg max-w-lg mx-auto mb-10 leading-relaxed z-10">
                                {t.wizard.welcomeAboard.replace('{name}', formDataState?.get('firstName') as string)}.
                                {t.wizard.confirmationSent.replace('{email}', formDataState?.get('email') as string)}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md z-10">
                                <button onClick={() => router.push('/')} className="px-6 py-4 border border-white/10 text-xs uppercase tracking-[0.2em] text-white/60 hover:text-white hover:border-white/30 transition-all">
                                    {t.wizard.returnHome}
                                </button>

                                {completedBookingId && (
                                    <a
                                        href={`/${language?.toLowerCase() || 'en'}/invoice/${completedBookingId}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-6 py-4 bg-vsoe-gold text-vsoe-midnight text-xs font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors flex items-center justify-center gap-2"
                                    >
                                        <FileText size={14} /> {t.wizard.viewInvoice}
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
