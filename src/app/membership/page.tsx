'use client';

import StandardPageLayout from '@/components/layout/StandardPageLayout';

export default function MembershipPage() {
    return (
        <StandardPageLayout
            title="The Society"
            subtitle="Membership & Rewards"
            heroImage="https://images.unsplash.com/photo-1551632436-cbf8dd35477c?q=80&w=2671&auto=format&fit=crop"
        >
            <h3>Welcome to The Society</h3>
            <p>
                The <strong>1920 Club</strong> is our invitation-only membership program for our most distinguished guests. Membership offers a world of exclusive benefits across the entire Belmond portfolio, from the Venice Simplon-Orient-Express to our hotels and river cruises.
            </p>

            <h3>Benefits</h3>
            <ul>
                <li><strong>Priority Booking:</strong> Access to cabins and departure dates before they are released to the general public.</li>
                <li><strong>Onboard Credit:</strong> Receive €500 credit per cabin to spend in our boutiques or Bar Car '3674'.</li>
                <li><strong>Upgrades:</strong> Complimentary cabin upgrades upon availability.</li>
                <li><strong>Exclusive Events:</strong> Invitations to private galas and curated journeys hosted by our General Manager.</li>
            </ul>

            <h3>How to Join</h3>
            <p>
                Membership is complimentary for guests who have traveled with us on three or more separate journeys. Alternatively, it is available by invitation from a current member. To inquire about your eligibility, please contact the Membership Desk.
            </p>
        </StandardPageLayout>
    );
}
