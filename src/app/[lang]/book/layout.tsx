export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const meta: any = {"en":{"t":"Book Your Journey","d":"Reserve your suite on the Venice Simplon-Orient-Express and begin your legendary adventure."},"fr":{"t":"Réservez Votre Voyage","d":"Réservez votre suite sur le Venice Simplon-Orient-Express."},"it":{"t":"Prenota Il Tuo Viaggio","d":"Prenota la tua suite sul Venice Simplon-Orient-Express."},"de":{"t":"Buchen Sie Ihre Reise","d":"Reservieren Sie Ihre Suite im Venice Simplon-Orient-Express."}};
    const current = meta[lang as keyof typeof meta] || meta.en;
    
    return {
        title: current.t + ' | Venice Simplon-Orient-Express',
        description: current.d,
    };
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
