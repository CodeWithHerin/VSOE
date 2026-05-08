'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useTranslation } from '@/lib/i18n/useTranslation';

export default function LegalPage() {
    const { t } = useTranslation();

    return (
        <main className="min-h-screen bg-vsoe-midnight text-vsoe-cream">
            <Navbar />
            <div className="pt-40 pb-20 px-6 max-w-3xl mx-auto">
                <h1 className="text-4xl font-serif text-vsoe-gold mb-8">{t.legalIndex.title}</h1>
                <div className="space-y-8 text-white/70 font-sans leading-relaxed">
                    <section>
                        <h2 className="text-xl text-white mb-4">{t.legalIndex.termsTitle}</h2>
                        <p>{t.legalIndex.termsDesc}</p>
                    </section>
                    <section>
                        <h2 className="text-xl text-white mb-4">{t.legalIndex.privacyTitle}</h2>
                        <p>{t.legalIndex.privacyDesc}</p>
                    </section>
                    <section>
                        <h2 className="text-xl text-white mb-4">{t.legalIndex.cookiesTitle}</h2>
                        <p>{t.legalIndex.cookiesDesc}</p>
                    </section>
                </div>
            </div>
            <Footer />
        </main>
    );
}
