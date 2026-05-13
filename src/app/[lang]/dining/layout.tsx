export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const meta: any = {"en":{"t":"Gastronomy & Dining","d":"Savour exquisite multi-course menus crafted by world-renowned chefs aboard our vintage dining cars."},"fr":{"t":"Gastronomie","d":"Savourez des menus exquis élaborés par des chefs de renommée mondiale."},"it":{"t":"Gastronomia","d":"Assapora squisiti menu a più portate realizzati da chef di fama mondiale."},"de":{"t":"Gastronomie","d":"Genießen Sie exquisite Menüs, die von weltbekannten Köchen an Bord kreiert werden."}};
    const current = meta[lang as keyof typeof meta] || meta.en;
    
    return {
        title: current.t + ' | Venice Simplon-Orient-Express',
        description: current.d,
    };
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
