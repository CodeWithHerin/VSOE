'use client';

import StandardPageLayout from '@/components/layout/StandardPageLayout';

export default function TermsPage() {
    return (
        <StandardPageLayout
            title="Terms & Conditions"
            subtitle="Legal Information"
            heroImage="/images/vsoe/vsoe-historic-cabin.jpg"
        >
            <h3>1. Booking Conditions</h3>
            <p>
                All bookings are subject to availability and the specific conditions associated with the fare type purchased. A deposit of 15% is required at the time of booking to secure your cabin, with the balance due 60 days prior to departure.
            </p>

            <h3>2. Cancellation Policy</h3>
            <p>
                Cancellations made more than 60 days before departure will incur a loss of deposit. Cancellations made within 60 days of departure are non-refundable. We strongly recommend comprehensive travel insurance to cover unforeseen circumstances.
            </p>

            <h3>3. Travel Documents</h3>
            <p>
                It is the responsibility of the guest to ensure they hold valid passports and any necessary visas for all countries traversed during the journey. The Venice Simplon-Orient-Express cannot be held liable for guests refused entry due to incorrect documentation.
            </p>

            <h3>4. Conduct</h3>
            <p>
                We reserve the right to refuse carriage to any person who, in the opinion of our staff, may cause discomfort or inconvenience to other guests. A strict dress code applies in the evening (black tie or dark suit).
            </p>
        </StandardPageLayout>
    );
}
