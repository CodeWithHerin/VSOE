'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import Image from 'next/image';

const COCKTAILS = [
    {
        name: "Guilty 3674",
        description: "Our signature tincture. A secret blend of aromatic bitters, cognac, and pressed citrus.",
        price: "€28"
    },
    {
        name: "Agatha's Mystery",
        description: "Smoked whiskey, black cherry reduction, and a wisp of rosemary smoke to finish.",
        price: "€32"
    },
    {
        name: "The Orient",
        description: "gin, Turkish delight syrup, rose water, topped with champagne.",
        price: "€30"
    }
];

export default function BarCarPage() {
    return (
        <main className="min-h-screen bg-[#0a1018] text-[#e0d5c1] selection:bg-[#c5a059] selection:text-[#0a1018]">
            <Navbar />

            {/* Bespoke Hero */}
            <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0">
                    <video
                        src="https://cdn.coverr.co/videos/coverr-pouring-cocktail-in-slow-motion-4519/1080p.mp4"
                        autoPlay muted loop playsInline
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#0a1018]" />
                </div>

                <div className="relative z-10 text-center space-y-6">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-[#c5a059] text-xs font-bold tracking-[0.4em] uppercase"
                    >
                        Car No.
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="text-8xl md:text-[10rem] font-serif text-[#c5a059] leading-none"
                    >
                        3674
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="text-white/80 font-serif italic text-2xl"
                    >
                        Where the night truly begins.
                    </motion.p>
                </div>
            </section>

            {/* Intro Content */}
            <section className="py-32 px-6">
                <div className="max-w-4xl mx-auto text-center space-y-12">
                    <p className="text-3xl md:text-5xl font-serif leading-tight text-white mb-12">
                        "A place of secrets, chance encounters, and the clinking of crystal against the rhythm of the rails."
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left text-lg font-light text-white/70">
                        <p>
                            Bar Car '3674' is the beating heart of the Venice Simplon-Orient-Express. Resplendent in blue and gold livery, it is a sanctuary for the thirsty traveler and the raconteur alike.
                        </p>
                        <p>
                            As the pianist plays softly into the night, savor our signature cocktails or a glass of chilled champagne. This is where stories are shared and legends are born.
                        </p>
                    </div>
                </div>
            </section>

            {/* Menu Showcase */}
            <section className="py-24 px-6 bg-[#06090e] border-y border-[#c5a059]/10">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-20">
                        <span className="text-[#c5a059] text-xs font-bold tracking-[0.3em] uppercase block mb-4">The Menu</span>
                        <h2 className="text-5xl font-serif text-white">Signature Libations</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                        {COCKTAILS.map((cocktail, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.2 }}
                                className="text-center group cursor-pointer"
                            >
                                <div className="h-[1px] w-12 bg-[#c5a059] mx-auto mb-8 transition-all duration-500 group-hover:w-full" />
                                <h3 className="text-2xl font-serif text-white mb-2">{cocktail.name}</h3>
                                <p className="text-[#c5a059] font-bold text-sm mb-4">{cocktail.price}</p>
                                <p className="text-white/60 text-sm leading-relaxed">{cocktail.description}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-24 text-center">
                        <button className="px-10 py-4 border border-[#c5a059] text-[#c5a059] text-xs uppercase tracking-[0.2em] hover:bg-[#c5a059] hover:text-[#0a1018] transition-all duration-500">
                            Download Full Menu
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
