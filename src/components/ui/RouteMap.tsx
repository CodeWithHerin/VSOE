'use client';

import { motion } from 'framer-motion';
import { useBookingStore } from '@/store/bookingStore';

const STOPS = [
    { id: 'london', name: 'London', x: 20, y: 30, labelX: -30, labelY: 0 },
    { id: 'paris', name: 'Paris', x: 35, y: 45, labelX: -30, labelY: 10 },
    { id: 'venice', name: 'Venice', x: 60, y: 70, labelX: 10, labelY: 10 },
    { id: 'verona', name: 'Verona', x: 55, y: 65, labelX: -40, labelY: -10 },
    { id: 'istanbul', name: 'Istanbul', x: 90, y: 80, labelX: 10, labelY: 0 },
];

export default function RouteMap() {
    const currentSegment = useBookingStore((state) => state.currentSegment);

    // Map segment to stop ID for highlighting
    const activeStopId = currentSegment === 'Paris' ? 'paris'
        : currentSegment === 'Alps' ? 'verona' // Approximate for Alps
            : 'venice';

    return (
        <div className="relative w-full aspect-[16/9] bg-vsoe-cream/5 rounded-sm overflow-hidden border border-vsoe-gold/10">
            {/* Map Background (Stylized) */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Route Line */}
                <motion.path
                    d="M 20 30 Q 28 38 35 45 T 55 65 T 60 70 T 90 80"
                    fill="none"
                    stroke="#c5a059"
                    strokeWidth="0.5"
                    strokeDasharray="1 1"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.5 }}
                    viewport={{ once: true }}
                    transition={{ duration: 3, ease: "easeInOut" }}
                />

                {/* Active Route Line (Animated) */}
                <motion.path
                    d="M 20 30 Q 28 38 35 45 T 55 65 T 60 70 T 90 80"
                    fill="none"
                    stroke="#c5a059"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 4, ease: "easeInOut", delay: 0.5 }}
                />
            </svg>

            {/* Stops */}
            {STOPS.map((stop, index) => (
                <motion.div
                    key={stop.id}
                    className="absolute"
                    style={{ left: `${stop.x}%`, top: `${stop.y}%` }}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1 + (index * 0.5) }}
                >
                    <div
                        className="relative group cursor-pointer"
                    >
                        {/* Dot */}
                        <div className={`w-3 h-3 -ml-1.5 -mt-1.5 border border-vsoe-gold rounded-full transition-all duration-500 
                            ${activeStopId === stop.id ? 'bg-vsoe-gold scale-150' : 'bg-vsoe-midnight scale-100'}`}
                        />

                        {/* Pulse */}
                        {activeStopId === stop.id && (
                            <div className="absolute inset-0 -ml-1.5 -mt-1.5 w-3 h-3 bg-vsoe-gold rounded-full animate-ping opacity-50" />
                        )}

                        {/* Label */}
                        <div
                            className="absolute whitespace-nowrap text-[10px] uppercase tracking-widest font-bold text-vsoe-blue transition-all duration-500"
                            style={{
                                left: stop.labelX,
                                top: stop.labelY,
                                opacity: activeStopId === stop.id ? 1 : 0.5,
                                transform: activeStopId === stop.id ? 'scale(1.2)' : 'scale(1)'
                            }}
                        >
                            {stop.name}
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
