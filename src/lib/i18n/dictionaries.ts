type DictionaryContent = {
    nav: {
        destinations: string;
        experiences: string;
        packages: string;
        suites: string;
        occasions: string;
        offers: string;
        membership: string;
        stories: string;
        myBookings: string;
        search: string;
        bookJourney: string;
        book: string;
    };
    hero: {
        title: string;
        subtitleDefault: string;
        subtitleGastronomy: string;
    };
    ai: {
        greeting: string;
    };
};

export const dictionaries: Record<string, DictionaryContent> = {
    EN: {
        nav: {
            destinations: 'Destinations',
            experiences: 'Experiences',
            packages: 'Packages & Tours',
            suites: 'Signature Suites',
            occasions: 'Occasions',
            offers: 'Offers',
            membership: 'Membership',
            stories: 'Stories',
            myBookings: 'My Bookings',
            search: 'Search',
            bookJourney: 'Book a Journey',
            book: 'Book'
        },
        hero: {
            title: 'Venice Simplon-Orient-Express',
            subtitleDefault: 'Beyond the Golden Age',
            subtitleGastronomy: 'Taste the Extraordinary'
        },
        ai: {
            greeting: "Good evening. I am Vitesse, your personal concierge. How may I assist you with your journey today?"
        }
    },
    FR: {
        nav: {
            destinations: 'Destinations',
            experiences: 'Expériences',
            packages: 'Forfaits et circuits',
            suites: 'Suites Signature',
            occasions: 'Événements',
            offers: 'Offres',
            membership: 'Adhésion',
            stories: 'Récits',
            myBookings: 'Mes Réservations',
            search: 'Recherche',
            bookJourney: 'Réserver un voyage',
            book: 'Réserver'
        },
        hero: {
            title: 'Venise Simplon-Orient-Express',
            subtitleDefault: "Au-delà de l'âge d'or",
            subtitleGastronomy: "Goûtez à l'extraordinaire"
        },
        ai: {
            greeting: "Bonsoir. Je suis Vitesse, votre concierge personnel. Comment puis-je vous aider dans votre voyage aujourd'hui ?"
        }
    },
    IT: {
        nav: {
            destinations: 'Destinazioni',
            experiences: 'Esperienze',
            packages: 'Pacchetti e Tour',
            suites: 'Suite Esclusive',
            occasions: 'Occasioni',
            offers: 'Offerte',
            membership: 'Iscrizione',
            stories: 'Storie',
            myBookings: 'Le mie prenotazioni',
            search: 'Cerca',
            bookJourney: 'Prenota un viaggio',
            book: 'Prenota'
        },
        hero: {
            title: 'Venice Simplon-Orient-Express',
            subtitleDefault: "Oltre l'età dell'oro",
            subtitleGastronomy: "Assapora lo straordinario"
        },
        ai: {
            greeting: "Buonasera. Sono Vitesse, il suo concierge personale. Come posso assisterla nel suo viaggio oggi?"
        }
    },
    DE: {
        nav: {
            destinations: 'Reiseziele',
            experiences: 'Erlebnisse',
            packages: 'Pakete & Touren',
            suites: 'Signature Suiten',
            occasions: 'Anlässe',
            offers: 'Angebote',
            membership: 'Mitgliedschaft',
            stories: 'Geschichten',
            myBookings: 'Meine Buchungen',
            search: 'Suche',
            bookJourney: 'Reise buchen',
            book: 'Buchen'
        },
        hero: {
            title: 'Venice Simplon-Orient-Express',
            subtitleDefault: 'Jenseits des goldenen Zeitalters',
            subtitleGastronomy: 'Schmecken Sie das Außergewöhnliche'
        },
        ai: {
            greeting: "Guten Abend. Ich bin Vitesse, Ihr persönlicher Concierge. Wie kann ich Ihnen heute bei Ihrer Reise behilflich sein?"
        }
    }
};
