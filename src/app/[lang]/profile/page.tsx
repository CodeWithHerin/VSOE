import React from 'react';
export const dynamic = 'force-dynamic';

import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { getUserBookings } from './actions';
import Link from 'next/link';
import { Ticket, Calendar, Clock, MapPin, User, FileText } from 'lucide-react';
import SignOutButton from '@/components/ui/SignOutButton';

export default async function ProfilePage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const session = await auth();

    if (!session?.user?.id) {
        redirect(`/${lang}/login`);
    }

    const bookings = await getUserBookings(session.user.id);
    const userName = session.user.name ?? 'Guest';
    const userEmail = session.user.email ?? '';

    return (
        <main className="min-h-screen bg-vsoe-midnight text-vsoe-cream selection:bg-vsoe-gold selection:text-vsoe-blue">
            <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-16 border-b border-white/10 pb-8 flex flex-col md:flex-row justify-between items-end gap-6">
                    <div>
                        <span className="text-vsoe-gold text-xs font-bold tracking-[0.3em] uppercase block mb-2">My Account</span>
                        <h1 className="text-4xl md:text-5xl font-serif text-vsoe-cream">Your Journeys</h1>
                    </div>
                    <div className="flex items-center gap-4 text-white/60 text-sm">
                        <div className="w-10 h-10 rounded-full bg-vsoe-gold/20 flex items-center justify-center text-vsoe-gold border border-vsoe-gold/30">
                            <User size={20} />
                        </div>
                        <div>
                            <p className="text-white">{userName}</p>
                            <p className="text-xs opacity-70">{userEmail}</p>
                        </div>
                        <SignOutButton lang={lang} />
                    </div>
                </div>

                {/* Content */}
                {bookings.length === 0 ? (
                    <div className="bg-white/5 border border-white/10 rounded-sm p-12 text-center">
                        <Ticket className="w-12 h-12 text-white/20 mx-auto mb-6" />
                        <h3 className="text-2xl font-serif text-white mb-4">No Journeys Found</h3>
                        <p className="text-white/60 mb-8 max-w-md mx-auto">
                            You haven&apos;t booked any grand tours with us yet. The rails are calling.
                        </p>
                        <Link
                            href={`/${lang}/book`}
                            className="inline-block bg-vsoe-gold text-vsoe-midnight px-8 py-3 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors"
                        >
                            Book a Journey
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {bookings.map((booking) => (
                            <div key={booking.id} className="bg-white/5 border border-white/10 hover:border-vsoe-gold/50 transition-colors rounded-sm overflow-hidden group">
                                <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
                                    {/* Left: Journey Info */}
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-4">
                                            <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full
                                                ${booking.status === 'confirmed' ? 'bg-green-900/40 text-green-300' : 'bg-yellow-900/40 text-yellow-300'}`}>
                                                {booking.status}
                                            </span>
                                            <span className="text-white/40 text-xs font-mono">#{booking.id.slice(0, 8)}</span>
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-serif text-vsoe-gold mb-2 group-hover:text-white transition-colors">
                                            {booking.journey.name}
                                        </h3>
                                        <div className="flex flex-wrap gap-6 mt-6 text-sm text-white/70">
                                            <div className="flex items-center gap-2">
                                                <Calendar size={16} className="text-vsoe-gold" />
                                                <span>{new Date(booking.journey.departure).toLocaleDateString(undefined, { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock size={16} className="text-vsoe-gold" />
                                                <span>{new Date(booking.journey.departure).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin size={16} className="text-vsoe-gold" />
                                                <span>{booking.journey.name.split(' to ')[0]} Station</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Divider */}
                                    <div className="w-full h-px md:w-px md:h-auto bg-white/10" />

                                    {/* Right: Passenger, Cabin, Invoice */}
                                    <div className="md:w-1/3 space-y-4">
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Accommodation</p>
                                            <p className="text-lg font-serif text-vsoe-cream">
                                                {booking.passengers[0]?.cabin.type.replace('_', ' ').replace(/\b\w/g, (c: string) => c.toUpperCase()) ?? 'Cabin'}
                                            </p>
                                            <p className="text-xs text-vsoe-gold mt-1">
                                                Cabin {booking.passengers[0]?.cabin.number}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Passenger</p>
                                            <p className="text-sm text-white">
                                                {booking.passengers[0]?.firstName} {booking.passengers[0]?.lastName}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Total Paid</p>
                                            <p className="text-xl font-serif text-white">
                                                &euro;{Number(booking.totalPrice).toLocaleString()}
                                            </p>
                                        </div>
                                        <div className="pt-2">
                                            <Link
                                                href={`/${lang}/invoice/${booking.id}`}
                                                className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-vsoe-gold hover:text-white transition-colors border border-vsoe-gold/30 hover:border-white/30 px-4 py-2 rounded-sm"
                                            >
                                                <FileText size={12} />
                                                View Invoice
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
