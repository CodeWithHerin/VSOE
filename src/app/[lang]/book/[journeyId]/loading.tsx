import React from 'react';

export default function Loading() {
    return (
        <main className="min-h-screen bg-vsoe-midnight text-vsoe-cream selection:bg-vsoe-gold selection:text-vsoe-blue animate-pulse">
            {/* Header Skeleton */}
            <div className="relative h-[50vh] flex items-end pb-20 px-6 bg-white/5 border-b border-white/5">
                <div className="relative z-10 max-w-7xl mx-auto w-full space-y-4">
                    <div className="h-4 w-24 bg-vsoe-gold/25 rounded-sm" />
                    <div className="h-16 w-1/2 bg-white/10 rounded-sm" />
                    <div className="flex gap-8">
                        <div className="h-4 w-32 bg-white/10 rounded-sm" />
                        <div className="h-4 w-24 bg-white/10 rounded-sm" />
                    </div>
                </div>
            </div>

            {/* Booking Wizard Section Skeleton */}
            <div className="relative z-20 max-w-7xl mx-auto px-6 py-20 -mt-20">
                <div className="bg-vsoe-midnight border border-white/10 p-8 md:p-16 rounded-sm shadow-2xl space-y-12">
                    {/* Progress Tracker Skeleton */}
                    <div className="flex justify-between items-center max-w-3xl mx-auto mb-16">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex flex-col items-center gap-2">
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 border-2 border-white/10" />
                                <div className="h-3 w-16 bg-white/10 rounded-sm" />
                            </div>
                        ))}
                    </div>

                    {/* Step Content: Cabin Choices Grid Skeleton */}
                    <div className="space-y-8">
                        <div className="text-center mb-12 space-y-4">
                            <div className="h-8 w-64 bg-white/15 mx-auto rounded-sm" />
                            <div className="h-4 w-96 bg-white/10 mx-auto rounded-sm" />
                        </div>

                        <div className="grid lg:grid-cols-3 gap-6">
                            {[1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className="p-8 rounded-sm border border-white/10 bg-white/5 h-full min-h-[400px] flex flex-col justify-between"
                                >
                                    <div className="space-y-6">
                                        <div className="w-10 h-10 rounded-full bg-white/10" />
                                        <div className="h-6 w-32 bg-white/15 rounded-sm" />
                                        <div className="space-y-2">
                                            <div className="h-4 w-full bg-white/10 rounded-sm" />
                                            <div className="h-4 w-5/6 bg-white/10 rounded-sm" />
                                        </div>
                                    </div>
                                    <div className="border-t border-white/10 pt-6 space-y-4">
                                        <div className="h-3 w-20 bg-white/10 rounded-sm" />
                                        <div className="h-8 w-24 bg-white/15 rounded-sm" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Itinerary Preview Skeleton */}
            <div className="max-w-4xl mx-auto px-6 py-20 space-y-8">
                <div className="h-8 w-48 bg-white/15 mx-auto rounded-sm" />
                <div className="space-y-12">
                    {[1, 2].map((i) => (
                        <div key={i} className="flex gap-8">
                            <div className="w-24 text-right pt-2">
                                <div className="h-4 w-12 bg-white/15 ml-auto rounded-sm" />
                            </div>
                            <div className="relative border-l border-white/10 pl-8 pb-12 flex-1 space-y-4">
                                <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-white/20" />
                                <div className="h-6 w-40 bg-white/15 rounded-sm" />
                                <div className="space-y-2">
                                    <div className="h-4 w-full bg-white/10 rounded-sm" />
                                    <div className="h-4 w-4/5 bg-white/10 rounded-sm" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
