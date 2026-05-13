export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const meta: any = {"en":{"t":"Curated Journeys","d":"Discover our collection of unforgettable luxury train journeys across Europe."},"fr":{"t":"Voyages Organisés","d":"Découvrez notre collection de voyages inoubliables en train de luxe à travers l Europe."},"it":{"t":"Viaggi Curati","d":"Scopri la nostra collezione di indimenticabili viaggi in treno di lusso attraverso l Europa."},"de":{"t":"Kuratierte Reisen","d":"Entdecken Sie unsere Kollektion unvergesslicher Luxuszugreisen quer durch Europa."}};
    const current = meta[lang as keyof typeof meta] || meta.en;
    
    return {
        title: current.t + ' | Venice Simplon-Orient-Express',
        description: current.d,
    };
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
