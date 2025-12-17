'use client';

import StandardPageLayout from '@/components/layout/StandardPageLayout';

export default function ContactPage() {
    return (
        <StandardPageLayout
            title="Contact Us"
            subtitle="We Are Here To Assist"
            heroImage="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=2674&auto=format&fit=crop"
        >
            <h3>Reservations & Enquiries</h3>
            <p>
                Our team of Travel Consultants is available to assist you with journey planning, cabin selection, and special requests.
            </p>
            <p>
                <strong>Telephone (UK):</strong> +44 (0) 20 1234 5678<br />
                <strong>Telephone (US):</strong> +1 800 123 4567<br />
                <strong>Email:</strong> reservations@vsoe.com
            </p>

            <h3>Head Office</h3>
            <p>
                Belmond Management Limited<br />
                Shackleton House<br />
                4 Battle Bridge Lane<br />
                London, SE1 2HP<br />
                United Kingdom
            </p>

            <h3>Press Inquiries</h3>
            <p>
                For media requests, filming permissions, and image licensing, please contact our press office at press@vsoe.com.
            </p>
        </StandardPageLayout>
    );
}
