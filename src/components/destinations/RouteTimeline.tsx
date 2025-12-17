'use client';

import { motion } from 'framer-motion';
import { Clock, MapPin } from 'lucide-react';

interface TimelineEvent {
    time: string;
    day: string;
    title: string;
    location: string;
    description: string;
    image: string;
}

interface RouteTimelineProps {
    events: TimelineEvent[];
}

export default function RouteTimeline({ events }: RouteTimelineProps) {
    return (
        <section className="relative w-full bg-vsoe-midnight py-32 overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-24">
                    <h2 className="text-4xl md:text-5xl font-serif text-vsoe-cream mb-4">The Itinerary</h2>
                    <p className="text-vsoe-cream/60 font-sans tracking-widest text-sm uppercase">A Journal of the Journey</p>
                </div>

                {/* Timeline Container */}
                <div className="relative max-w-5xl mx-auto">
                    {/* Central Line */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-vsoe-gold/0 via-vsoe-gold/50 to-vsoe-gold/0 md:-translate-x-1/2" />

                    {events.map((event, index) => (
                        <div key={index} className={`relative flex flex-col md:flex-row items-center mb-24 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

                            {/* Content Side */}
                            <motion.div
                                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8 }}
                                className="w-full md:w-1/2 px-8 md:px-16 mb-8 md:mb-0"
                            >
                                <div className={`flex flex-col ${index % 2 === 0 ? 'md:items-start md:text-left' : 'md:items-end md:text-right'}`}>
                                    <span className="text-vsoe-gold text-xs font-bold tracking-[0.2em] uppercase mb-2 flex items-center gap-2">
                                        <Clock size={12} /> {event.day} — {event.time}
                                    </span>
                                    <h3 className="text-3xl font-serif text-vsoe-cream mb-2">{event.title}</h3>
                                    <span className="text-white/40 text-xs tracking-widest uppercase mb-4 flex items-center gap-2">
                                        <MapPin size={12} /> {event.location}
                                    </span>
                                    <p className="text-vsoe-cream/70 font-light leading-relaxed">
                                        {event.description}
                                    </p>
                                </div>
                            </motion.div>

                            {/* Node Point */}
                            <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-vsoe-gold rotate-45 md:-translate-x-1/2 z-20 shadow-[0_0_20px_rgba(197,160,89,0.5)] border border-vsoe-midnight" />

                            {/* Image Side */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8 }}
                                className="w-full md:w-1/2 px-8 md:px-16 pl-12 md:pl-16"
                            >
                                <div className="aspect-[4/3] border border-vsoe-gold/20 p-2 relative group">
                                    <div className="absolute inset-0 bg-vsoe-midnight/50 group-hover:bg-transparent transition-colors duration-500 z-10" />
                                    <img
                                        src={event.image}
                                        alt={event.title}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                    />
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
