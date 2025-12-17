'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function LegalPage() {
    return (
        <main className="min-h-screen bg-vsoe-midnight text-vsoe-cream">
            <Navbar />
            <div className="pt-40 pb-20 px-6 max-w-3xl mx-auto">
                <h1 className="text-4xl font-serif text-vsoe-gold mb-8">Legal Information</h1>
                <div className="space-y-8 text-white/70 font-sans leading-relaxed">
                    <section>
                        <h2 className="text-xl text-white mb-4">Terms & Conditions</h2>
                        <p>These terms and conditions govern your use of the Venice Simplon-Orient-Express website and booking system.</p>
                    </section>
                    <section>
                        <h2 className="text-xl text-white mb-4">Privacy Policy</h2>
                        <p>We are committed to protecting your privacy and ensuring the security of your personal information.</p>
                    </section>
                    <section>
                        <h2 className="text-xl text-white mb-4">Cookie Policy</h2>
                        <p>We use cookies to enhance your browsing experience and analyze our traffic.</p>
                    </section>
                </div>
            </div>
            <Footer />
        </main>
    );
}
