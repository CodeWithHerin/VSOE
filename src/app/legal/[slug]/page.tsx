'use client';

import { use } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/ui/HeroSection';

const LEGAL_CONTENT: Record<string, { title: string; content: string }> = {
    privacy: {
        title: 'Privacy Policy',
        content: 'At Venice Simplon-Orient-Express, we are committed to protecting your privacy. This policy outlines how we collect, use, and safeguard your personal information...'
    },
    terms: {
        title: 'Terms & Conditions',
        content: 'Welcome to the Venice Simplon-Orient-Express. By booking a journey with us, you agree to the following terms and conditions...'
    },
    cookies: {
        title: 'Cookie Policy',
        content: 'We use cookies to enhance your experience on our website. This policy explains what cookies are, how we use them, and how you can manage your preferences...'
    },
    accessibility: {
        title: 'Accessibility',
        content: 'We strive to make our journeys and digital experiences accessible to everyone. Please contact our concierge for specific accessibility requirements on board...'
    }
};

export default function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const data = LEGAL_CONTENT[slug] || {
        title: 'Page Not Found',
        content: 'The requested legal document could not be found.'
    };

    return (
        <main className="min-h-screen bg-vsoe-cream text-vsoe-blue">
            <Navbar />
            <HeroSection
                title={data.title}
                subtitle="Legal Information"
                backgroundImage="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop"
            />
            <div className="max-w-4xl mx-auto px-6 py-24">
                <div className="prose prose-lg prose-headings:font-serif prose-headings:text-vsoe-blue prose-p:text-vsoe-blue/80 font-sans">
                    <p>{data.content}</p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <h3>1. Introduction</h3>
                    <p>
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </div>
            </div>
            <Footer />
        </main>
    );
}
