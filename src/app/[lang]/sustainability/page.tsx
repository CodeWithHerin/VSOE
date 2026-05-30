'use client';

import StandardPageLayout from '@/components/layout/StandardPageLayout';

export default function SustainabilityPage() {
    return (
        <StandardPageLayout
            title="Sustainability"
            subtitle="Preserving Our Heritage & Planet"
            heroImage="/images/vsoe/vsoe-countryside-window.jpg"
        >
            <h3>Think Global, Act Local</h3>
            <p>
                At Project Vitesse, we are custodians of timeless heritage. This responsibility extends beyond our historic carriages to the communities we visit and the environment we traverse.
            </p>

            <h3>Our Commitments</h3>
            <ul>
                <li><strong>Responsible Sourcing:</strong> Our chefs prioritize local, seasonal ingredients from farmers along our route, reducing food miles and supporting local economies.</li>
                <li><strong>Energy Efficiency:</strong> While preserving the historic integrity of our 1920s carriages, we have retrofitted invisible technologies to reduce energy consumption and water waste.</li>
                <li><strong>Community Engagement:</strong> We partner with local artisans and cultural institutions in Venice, Paris, and Istanbul to ensure our presence contributes positively to local culture.</li>
            </ul>

            <p>
                We believe that luxury travel and sustainability can coexist. By slowing down and appreciating the journey, we foster a deeper connection with the world around us.
            </p>
        </StandardPageLayout>
    );
}
