const fs = require('fs');
const path = require('path');

const routes = {
    'destinations': {
        en: { t: 'Destinations', d: 'Explore the iconic routes and magnificent cities along the Venice Simplon-Orient-Express.' },
        fr: { t: 'Destinations', d: 'Explorez les itinéraires emblématiques et les villes magnifiques le long du Venice Simplon-Orient-Express.' },
        it: { t: 'Destinazioni', d: 'Esplora gli itinerari iconici e le magnifiche città lungo il Venice Simplon-Orient-Express.' },
        de: { t: 'Reiseziele', d: 'Erkunden Sie die legendären Routen und herrlichen Städte entlang des Venice Simplon-Orient-Express.' }
    },
    'membership': {
        en: { t: 'The 1920 Club Membership', d: 'Join the exclusive 1920 Club and unlock extraordinary privileges and priority access.' },
        fr: { t: 'Le Club 1920', d: 'Rejoignez le Club 1920 exclusif et débloquez des privilèges extraordinaires.' },
        it: { t: 'Il Club 1920', d: 'Unisciti all esclusivo Club 1920 e sblocca privilegi straordinari.' },
        de: { t: 'Der 1920 Club', d: 'Treten Sie dem exklusiven 1920 Club bei und genießen Sie außergewöhnliche Privilegien.' }
    },
    'dining': {
        en: { t: 'Gastronomy & Dining', d: 'Savour exquisite multi-course menus crafted by world-renowned chefs aboard our vintage dining cars.' },
        fr: { t: 'Gastronomie', d: 'Savourez des menus exquis élaborés par des chefs de renommée mondiale.' },
        it: { t: 'Gastronomia', d: 'Assapora squisiti menu a più portate realizzati da chef di fama mondiale.' },
        de: { t: 'Gastronomie', d: 'Genießen Sie exquisite Menüs, die von weltbekannten Köchen an Bord kreiert werden.' }
    },
    'journeys': {
        en: { t: 'Curated Journeys', d: 'Discover our collection of unforgettable luxury train journeys across Europe.' },
        fr: { t: 'Voyages Organisés', d: 'Découvrez notre collection de voyages inoubliables en train de luxe à travers l Europe.' },
        it: { t: 'Viaggi Curati', d: 'Scopri la nostra collezione di indimenticabili viaggi in treno di lusso attraverso l Europa.' },
        de: { t: 'Kuratierte Reisen', d: 'Entdecken Sie unsere Kollektion unvergesslicher Luxuszugreisen quer durch Europa.' }
    },
    'book': {
        en: { t: 'Book Your Journey', d: 'Reserve your suite on the Venice Simplon-Orient-Express and begin your legendary adventure.' },
        fr: { t: 'Réservez Votre Voyage', d: 'Réservez votre suite sur le Venice Simplon-Orient-Express.' },
        it: { t: 'Prenota Il Tuo Viaggio', d: 'Prenota la tua suite sul Venice Simplon-Orient-Express.' },
        de: { t: 'Buchen Sie Ihre Reise', d: 'Reservieren Sie Ihre Suite im Venice Simplon-Orient-Express.' }
    }
};

for (const [route, meta] of Object.entries(routes)) {
    const dir = path.join(__dirname, 'src/app/[lang]', route);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    
    const layoutPath = path.join(dir, 'layout.tsx');
    const content = `
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const meta: any = ${JSON.stringify(meta)};
    const current = meta[lang as keyof typeof meta] || meta.en;
    
    return {
        title: current.t + ' | Venice Simplon-Orient-Express',
        description: current.d,
    };
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
`;
    fs.writeFileSync(layoutPath, content.trim() + '\n');
    console.log('Created metadata layout for ' + route);
}
