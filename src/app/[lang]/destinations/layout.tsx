export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const meta: any = {"en":{"t":"Destinations","d":"Explore the iconic routes and magnificent cities along the Venice Simplon-Orient-Express."},"fr":{"t":"Destinations","d":"Explorez les itinéraires emblématiques et les villes magnifiques le long du Venice Simplon-Orient-Express."},"it":{"t":"Destinazioni","d":"Esplora gli itinerari iconici e le magnifiche città lungo il Venice Simplon-Orient-Express."},"de":{"t":"Reiseziele","d":"Erkunden Sie die legendären Routen und herrlichen Städte entlang des Venice Simplon-Orient-Express."}};
    const current = meta[lang as keyof typeof meta] || meta.en;
    
    return {
        title: current.t + ' | Venice Simplon-Orient-Express',
        description: current.d,
    };
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
