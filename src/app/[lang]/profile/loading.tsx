import React from 'react';

export default function Loading() {
    return (
        <main className="min-h-screen bg-vsoe-midnight text-vsoe-cream selection:bg-vsoe-gold selection:text-vsoe-blue animate-pulse">
            <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                {/* Header Skeleton */}
                <div className="mb-16 border-b border-white/10 pb-8 flex flex-col md:flex-row justify-between items-end gap-6">
                    <div className="space-y-3">
                        <div className="h-3 w-20 bg-vsoe-gold/25 rounded-sm" />
                        <div className="h-10 w-48 bg-white/15 rounded-sm" />
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-white/10" />
                        <div className="space-y-2">
                            <div className="h-4 w-24 bg-white/15 rounded-sm" />
                            <div className="h-3 w-32 bg-white/10 rounded-sm" />
                        </div>
                    </div>
                </div>

                {/* Bookings List Skeletons */}
                <div className="grid gap-6">
                    {[1, 2].map((i) => (
                        <div key={i} className="bg-white/5 border border-white/10 rounded-sm p-6 md:p-8 flex flex-col md:flex-row gap-8">
                            <div className="flex-1 space-y-6">
                                <div className="flex justify-between items-start">
                                    <div className="h-5 w-20 bg-white/15 rounded-full" />
                                    <div className="h-4 w-24 bg-white/10 rounded-sm" />
                                </div>
                                <div className="h-8 w-64 bg-vsoe-gold/25 rounded-sm" />
                                <div className="flex gap-6 mt-6">
                                    <div className="h-4 w-32 bg-white/10 rounded-sm" />
                                    <div className="h-4 w-24 bg-white/10 rounded-sm" />
                                    <div className="h-4 w-28 bg-white/10 rounded-sm" />
                                </div>
                            </div>
                            <div className="w-full h-px md:w-px md:h-auto bg-white/10" />
                            <div className="md:w-1/3 space-y-6">
                                <div>
                                    <div className="h-3 w-24 bg-white/10 rounded-sm mb-2" />
                                    <div className="h-5 w-32 bg-white/15 rounded-sm" />
                                </div>
                                <div>
                                    <div className="h-3 w-20 bg-white/10 rounded-sm mb-2" />
                                    <div className="h-4 w-40 bg-white/15 rounded-sm" />
                                </div>
                                <div>
                                    <div className="h-3 w-20 bg-white/10 rounded-sm mb-2" />
                                    <div className="h-5 w-24 bg-white/15 rounded-sm" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
