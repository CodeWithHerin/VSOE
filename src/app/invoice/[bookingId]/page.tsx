import React from 'react';
import { notFound } from 'next/navigation';
import { getBookingDetails } from '../actions';
import { format } from 'date-fns';
import InvoiceActions from '@/components/invoice/InvoiceActions';

export default async function InvoicePage({ params }: { params: { bookingId: string } }) {
    const { bookingId } = await params;
    const booking = await getBookingDetails(bookingId);

    if (!booking) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white text-black p-8 md:p-16 pt-32 print:p-0">
            <div className="max-w-4xl mx-auto border border-gray-200 p-12 shadow-lg print:shadow-none print:border-none">

                {/* Header */}
                <div className="flex justify-between items-start border-b border-gray-200 pb-8 mb-8">
                    <div>
                        <h1 className="text-4xl font-serif text-[#1e293b] mb-2">INVOICE</h1>
                        <p className="text-sm text-gray-500 uppercase tracking-widest">Venice Simplon-Orient-Express</p>
                    </div>
                    <div className="text-right">
                        <h2 className="text-xl font-serif text-[#1e293b] mb-1">VSOE Ltd.</h2>
                        <p className="text-sm text-gray-500">123 Luxury Rail Way</p>
                        <p className="text-sm text-gray-500">London, UK</p>
                        <p className="text-sm text-gray-500 mt-2">VAT: GB 123 456 789</p>
                    </div>
                </div>

                {/* Booking Info */}
                <div className="grid grid-cols-2 gap-12 mb-12">
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Billed To</h3>
                        <p className="font-serif text-lg">{booking.firstName} {booking.lastName}</p>
                        <p className="text-gray-600">{booking.email}</p>
                        {booking.phone && <p className="text-gray-600">{booking.phone}</p>}
                    </div>
                    <div className="text-right">
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
                                {booking.status}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Journey Details */}
                <div className="bg-gray-50 p-6 rounded-sm mb-12">
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
                <table className="w-full mb-12">
                    <thead>
                        <tr className="border-b border-gray-200 text-left">
                            <th className="pb-4 text-xs font-bold uppercase tracking-widest text-gray-400">Description</th>
                            <th className="pb-4 text-xs font-bold uppercase tracking-widest text-gray-400 text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {booking.passengers.map((p, i) => (
                            <tr key={p.id} className="border-b border-gray-100">
                                <td className="py-4">
                                    <p className="font-medium text-gray-900">Passenger: {p.firstName} {p.lastName}</p>
                                    <p className="text-gray-500 text-xs">
                                        Accomodation: {p.cabin.car.name} - Cabin {p.cabin.number} ({p.cabin.type.replace('_', ' ')})
                                    </p>
                                </td>
                                <td className="py-4 text-right font-mono text-gray-700">
                                    €{booking.totalPrice.toLocaleString()} {/* Assuming total price for now as we don't have individual breakdown stored per passenger reliably here */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td className="pt-6 text-right font-serif text-lg text-[#1e293b]">Total</td>
                            <td className="pt-6 text-right font-serif text-2xl text-[#1e293b]">€{booking.totalPrice.toLocaleString()}</td>
                        </tr>
                    </tfoot>
                </table>

                {/* Footer */}
                <div className="border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
                    <p className="mb-2">Thank you for travelling with Venice Simplon-Orient-Express.</p>
                    <p className="italic">This is a computer generated invoice.</p>
                </div>

                {/* Print Button Component */}
                <InvoiceActions />
            </div>
        </main>
    );
}
