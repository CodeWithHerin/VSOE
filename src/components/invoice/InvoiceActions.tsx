'use client';

import React from 'react';

export default function InvoiceActions() {
    return (
        <div className="mt-8 text-center print:hidden">
            <button
                onClick={() => window.print()}
                className="bg-[#1e293b] text-white px-6 py-2 text-xs uppercase tracking-widest hover:bg-black transition-colors"
            >
                Print Invoice
            </button>
            <button
                className="ml-4 text-xs uppercase tracking-widest text-gray-500 hover:text-black underline"
                onClick={() => window.print()}
            >
                Download PDF
            </button>
        </div>
    );
}
