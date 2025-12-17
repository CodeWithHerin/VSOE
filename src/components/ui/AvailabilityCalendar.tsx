'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['June 2025', 'July 2025', 'August 2025'];

export default function AvailabilityCalendar() {
    const [currentMonth, setCurrentMonth] = useState(0);
    const [selectedDate, setSelectedDate] = useState<number | null>(null);

    // Mock availability data (1 = available, 0 = booked, 2 = limited)
    const availability = [
        0, 0, 1, 1, 0, 2, 1,
        1, 0, 0, 1, 1, 2, 0,
        0, 1, 1, 0, 0, 1, 1,
        1, 2, 0, 1, 0, 0, 1,
        0, 1
    ];

    return (
        <div className="bg-white p-8 rounded-sm shadow-xl border border-vsoe-gold/20 max-w-md mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <button
                    onClick={() => setCurrentMonth(Math.max(0, currentMonth - 1))}
                    disabled={currentMonth === 0}
                    className="p-2 hover:text-vsoe-gold disabled:opacity-30 transition-colors"
                >
                    <ChevronLeft size={20} />
                </button>
                <h3 className="font-serif text-xl text-vsoe-midnight">{MONTHS[currentMonth]}</h3>
                <button
                    onClick={() => setCurrentMonth(Math.min(MONTHS.length - 1, currentMonth + 1))}
                    disabled={currentMonth === MONTHS.length - 1}
                    className="p-2 hover:text-vsoe-gold disabled:opacity-30 transition-colors"
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
            <div className="grid grid-cols-7 gap-2">
                {/* Offset for start of month (mock) */}
                {[...Array(2)].map((_, i) => <div key={`empty-${i}`} />)}

                {availability.map((status, i) => (
                    <motion.button
                        key={i}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => status !== 0 && setSelectedDate(i + 1)}
                        disabled={status === 0}
                        className={`
                            aspect-square flex flex-col items-center justify-center rounded-sm text-sm font-serif relative group
                            ${selectedDate === i + 1 ? 'bg-vsoe-gold text-vsoe-midnight' : ''}
                            ${status === 0 ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-vsoe-cream cursor-pointer'}
                        `}
                    >
                        <span>{i + 1}</span>
                        {status === 2 && (
                            <span className="absolute bottom-1 w-1 h-1 rounded-full bg-red-400" />
                        )}
                        {status === 1 && selectedDate !== i + 1 && (
                            <span className="absolute bottom-1 w-1 h-1 rounded-full bg-vsoe-gold" />
                        )}
                    </motion.button>
                ))}
            </div>

            {/* Legend */}
            <div className="mt-8 flex justify-center gap-6 text-[10px] uppercase tracking-widest text-vsoe-midnight/60">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-vsoe-gold" /> Available
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-400" /> Limited
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gray-300" /> Sold Out
                </div>
            </div>
        </div>
    );
}
