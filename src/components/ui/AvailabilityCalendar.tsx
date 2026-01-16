'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import BookingWizard from '@/components/booking/BookingWizard';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

interface Journey {
    id: string;
    name: string;
    date: Date;
    price: number;
    description: string;
    availableCabins: number;
    // ... other fields from your action
}

interface AvailabilityCalendarProps {
    journeys: Journey[];
}

export default function AvailabilityCalendar({ journeys }: AvailabilityCalendarProps) {
    // Dynamically set start date to the first available journey, or default to now
    const initialDate = useMemo(() => {
        if (journeys && journeys.length > 0) {
            return new Date(journeys[0].date);
        }
        return new Date(); // Default to now if no journeys
    }, [journeys]);

    const [currentDate, setCurrentDate] = useState(initialDate);
    const [selectedJourney, setSelectedJourney] = useState<Journey | null>(null);

    // Group journeys by date string key (YYYY-MM-DD)
    const journeyMap = useMemo(() => {
        const map = new Map<string, Journey>();
        journeys.forEach(j => {
            const dateParams = new Date(j.date);
            const key = `${dateParams.getFullYear()}-${dateParams.getMonth()}-${dateParams.getDate()}`;
            map.set(key, j);
        });
        return map;
    }, [journeys]);

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const getJourneyForDay = (day: number) => {
        const key = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${day}`;
        return journeyMap.get(key);
    };

    return (
        <>
            <div className="bg-white p-6 md:p-8 rounded-sm shadow-xl border border-vsoe-gold/20 w-full max-w-md mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <button
                        onClick={handlePrevMonth}
                        className="p-3 hover:text-vsoe-gold transition-colors"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <h3 className="font-serif text-lg md:text-xl text-vsoe-midnight">
                        {MONTH_NAMES[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </h3>
                    <button
                        onClick={handleNextMonth}
                        className="p-3 hover:text-vsoe-gold transition-colors"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>

                {/* Days Header */}
                <div className="grid grid-cols-7 mb-4">
                    {DAYS.map(day => (
                        <div key={day} className="text-center text-[10px] uppercase tracking-widest text-vsoe-midnight/40">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1 md:gap-2">
                    {/* Offset */}
                    {[...Array(firstDay)].map((_, i) => <div key={`empty-${i}`} />)}

                    {[...Array(daysInMonth)].map((_, i) => {
                        const day = i + 1;
                        const journey = getJourneyForDay(day);
                        // Status: 0=None, 1=Available, 2=Limited
                        let status = 0;
                        if (journey) status = journey.availableCabins < 3 ? 2 : 1;
                        if (journey && journey.availableCabins === 0) status = 0; // Sold out logic if strictly needed, but 0 usually means no journey scheduled.

                        return (
                            <motion.button
                                key={day}
                                whileHover={journey ? { scale: 1.1 } : {}}
                                whileTap={journey ? { scale: 0.95 } : {}}
                                onClick={() => journey && setSelectedJourney(journey)}
                                disabled={!journey}
                                className={`
                                    aspect-square flex flex-col items-center justify-center rounded-sm text-sm font-serif relative group transition-colors
                                    ${!journey ? 'text-gray-300 cursor-default' : 'hover:bg-vsoe-cream cursor-pointer text-vsoe-midnight bg-gray-50'}
                                    ${selectedJourney?.id === journey?.id ? 'bg-vsoe-gold! text-vsoe-midnight!' : ''}
                                `}
                            >
                                <span>{day}</span>
                                {status === 2 && (
                                    <span className="absolute bottom-1 w-1 h-1 rounded-full bg-red-400" />
                                )}
                                {status === 1 && (
                                    <span className="absolute bottom-1 w-1 h-1 rounded-full bg-vsoe-gold" />
                                )}
                            </motion.button>
                        );
                    })}
                </div>

                {/* Legend */}
                <div className="mt-8 flex flex-wrap justify-center gap-4 md:gap-6 text-[10px] uppercase tracking-widest text-vsoe-midnight/60">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-vsoe-gold" /> Available
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-400" /> Limited
                    </div>
                </div>
            </div>

            {/* Booking Wizard Modal */}
            <AnimatePresence>
                {selectedJourney && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            className="bg-vsoe-midnight border border-vsoe-gold/30 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-sm relative shadow-2xl"
                        >
                            <button
                                onClick={() => setSelectedJourney(null)}
                                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors z-10 p-2"
                            >
                                <X size={24} />
                            </button>

                            <div className="p-8 md:p-12">
                                <div className="mb-8 border-b border-white/10 pb-8">
                                    <span className="text-vsoe-gold text-xs font-bold tracking-[0.3em] uppercase block mb-2">Selected Journey</span>
                                    <h2 className="text-3xl font-serif text-vsoe-cream mb-2">{selectedJourney.name}</h2>
                                    <p className="text-white/60">{new Date(selectedJourney.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                </div>
                                <BookingWizard journey={selectedJourney} />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
