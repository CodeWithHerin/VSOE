import React from 'react';
import { notFound } from 'next/navigation';
import { getBookingDetails } from '../actions';
import { format } from 'date-fns';
import InvoiceActions from '@/components/invoice/InvoiceActions';

export default async function InvoicePage({ params }: { params: Promise<{ bookingId: string }> }) {
    const { bookingId } = await params;
    const booking = await getBookingDetails(bookingId);

    if (!booking) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white text-black p-4 sm:p-8 md:p-16 pt-24 sm:pt-32 print:p-0">
            <style dangerouslySetInnerHTML={{
                __html: `
                @media print {
                    * { cursor: none !important; }
                    .custom-cursor { display: none !important; }
                    nav, footer, header { display: none !important; }
                    div[class*="fixed"], button[class*="fixed"] { display: none !important; }
                    body { background: white !important; color: black !important; }
                    main { padding: 0 !important; width: 100% !important; max-width: none !important; }
                    .shadow-lg { box-shadow: none !important; border: none !important; }
                }
            `}} />

            <div className="max-w-4xl mx-auto relative border border-gray-200 p-5 sm:p-8 md:p-12 shadow-lg print:shadow-none print:border-none">
                {/* Watermark */}
                <div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0"
                    style={{ printColorAdjust: 'exact', WebkitPrintColorAdjust: 'exact' } as React.CSSProperties}
                >
                    <div className="text-[1.75rem] sm:text-[3rem] md:text-[6rem] font-bold text-gray-400 opacity-10 -rotate-[30deg] whitespace-nowrap select-none font-sans">
                        PORTFOLIO DEMO &mdash; NOT A REAL BOOKING
                    </div>
                </div>

                {/* Top Disclaimer Bar */}
                <div
                    className="w-full relative z-10 bg-gray-100 border border-gray-300 text-gray-600 text-[10px] font-bold uppercase tracking-widest text-center py-2 mb-8"
                    style={{ printColorAdjust: 'exact', WebkitPrintColorAdjust: 'exact' } as React.CSSProperties}
                >
                    PORTFOLIO DEMONSTRATION &mdash; NOT A REAL BOOKING. NO PAYMENT HAS BEEN TAKEN. NOT AN OFFICIAL VENICE SIMPLON-ORIENT-EXPRESS DOCUMENT.
                </div>

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:justify-between items-start border-b border-gray-200 pb-8 mb-8 relative z-10 gap-6">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-serif text-[#1e293b] mb-2">INVOICE</h1>
                        <p className="text-sm text-gray-500 uppercase tracking-widest">Venice Simplon-Orient-Express</p>
                    </div>
                    <div className="text-left sm:text-right">
                        <h2 className="text-xl font-serif text-[#1e293b] mb-1">Project Vitesse</h2>
                        <p className="text-sm text-gray-500">Portfolio demonstration &mdash; not a real booking</p>
                        <p className="text-sm text-gray-500 mt-2">Not affiliated with Belmond Management Limited or LVMH</p>
                    </div>
                </div>

                {/* Booking Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 mb-12">
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Billed To</h3>
                        <p className="font-serif text-lg">{booking.firstName} {booking.lastName}</p>
                        <p className="text-gray-600">{booking.email}</p>
                        {booking.phone && <p className="text-gray-600">{booking.phone}</p>}
                    </div>
                    <div className="sm:text-right">
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-500">Invoice No:</span>
                            <span className="font-mono">{booking.id.slice(0, 8).toUpperCase()}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-500">Date Issued:</span>
                            <span>{format(new Date(booking.createdAt), 'MMM dd, yyyy')}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Status:</span>
                            <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded uppercase font-bold tracking-wider">
                                DEMO &mdash; {booking.status}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Journey Details */}
                <div className="bg-gray-50 p-6 rounded-sm mb-12 relative z-10">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Journey Details</h3>
                    <div className="flex justify-between items-center">
                        <div>
                            <h4 className="text-xl font-serif text-[#1e293b] mb-1">{booking.journey.name}</h4>
                            <p className="text-sm text-gray-600">
                                Departs: {format(new Date(booking.journey.departure), 'MMMM dd, yyyy')}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Line Items */}
                <table className="w-full mb-12 relative z-10">
                    <thead>
                        <tr className="border-b border-gray-200 text-left">
                            <th className="pb-4 text-xs font-bold uppercase tracking-widest text-gray-400">Description</th>
                            <th className="pb-4 text-xs font-bold uppercase tracking-widest text-gray-400 text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {booking.passengers.map((p) => (
                            <tr key={p.id} className="border-b border-gray-100">
                                <td className="py-4">
                                    <p className="font-medium text-gray-900">Passenger: {p.firstName} {p.lastName}</p>
                                    <p className="text-gray-500 text-xs">
                                        Accommodation: {p.cabin.car.name} &mdash; Cabin {p.cabin.number} ({p.cabin.type.replace('_', ' ')})
                                    </p>
                                </td>
                                <td className="py-4 text-right font-mono text-gray-700">
                                    &euro;{Number(booking.totalPrice).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td className="pt-6 text-right font-serif text-lg text-[#1e293b]">Total</td>
                            <td className="pt-6 text-right font-serif text-2xl text-[#1e293b]">&euro;{Number(booking.totalPrice).toLocaleString()}</td>
                        </tr>
                    </tfoot>
                </table>

                {/* Footer */}
                <div className="border-t border-gray-200 pt-8 text-center text-sm text-gray-500 relative z-10">
                    <p className="mb-2">Thank you for travelling with Venice Simplon-Orient-Express.</p>
                    <p className="italic">This is a computer generated invoice.</p>
                    <p className="mt-4 text-xs font-bold text-gray-400">Project Vitesse is an independent portfolio recreation and is not affiliated with, endorsed by, or connected to Belmond Management Limited or LVMH.</p>
                    <p className="mt-2 text-xs text-gray-400">Demo bookings are not stored permanently and may be deleted at any time.</p>
                </div>

                {/* Print Button */}
                <InvoiceActions />
            </div>
        </main>
    );
}
