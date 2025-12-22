export const journeys = [
    {
        id: 'paris-venice',
        name: 'Paris to Venice',
        duration: '1 Night',
        description: 'The classic route. Depart from the City of Light, traverse the Swiss Alps, and awake in the Floating City.',
        stops: ['Paris', 'Innsbruck', 'Venice'],
        image: 'https://images.unsplash.com/photo-1551862141-f6048d0b2f5d?q=80&w=2000&auto=format&fit=crop', // Unique Paris Train
        heroVideo: 'https://cdn.coverr.co/videos/coverr-train-in-the-snow-4626/1080p.mp4',
        heroImage: 'https://images.unsplash.com/photo-1549144511-309228d6896c?q=80&w=2000&auto=format&fit=crop', // Paris Street
        price: '£3,530',
        timeline: [
            {
                time: "21:30",
                day: "Day 1",
                title: "Departure",
                location: "Paris Gare de l'Est",
                description: "Board the wagon-lits trains in the heart of Paris. Your steward welcomes you with a glass of champagne.",
                image: "https://images.unsplash.com/photo-1517400508447-f8dd518b86db?q=80&w=2000&auto=format&fit=crop" // Champagne
            },
            {
                time: "22:00",
                day: "Day 1",
                title: "Dinner is Served",
                location: "Dining Car 'Etoile du Nord'",
                description: "Dress for the occasion. Lobster from Brittany and salt-marsh lamb are on the menu tonight.",
                image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2000&auto=format&fit=crop" // Dining
            },
            {
                time: "08:00",
                day: "Day 2",
                title: "Morning in the Alps",
                location: "Gotthard Pass",
                description: "Raise your blind to reveal snow-capped peaks. Breakfast is served in your cabin.",
                image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop", // Swiss Alps
                video: "https://cdn.coverr.co/videos/coverr-flying-over-snowy-mountains-4389/1080p.mp4" // Alps Video
            },
            {
                time: "13:00",
                day: "Day 2",
                title: "Lunch on the Rails",
                location: "Innsbruck",
                description: "A three-course lunch is served as you wind past Austrian castles and valleys.",
                image: "https://images.unsplash.com/photo-1533759413974-a6152a51a942?q=80&w=2000&auto=format&fit=crop" // Food/Lunch
            },
            {
                time: "18:00",
                day: "Day 2",
                title: "Arrival",
                location: "Venice Santa Lucia",
                description: "Cross the Lagoon as the sun sets. You have arrived in La Serenissima.",
                image: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?q=80&w=2000&auto=format&fit=crop", // Venice
                video: "https://cdn.coverr.co/videos/coverr-venice-canals-4624/1080p.mp4" // Venice Video
            }
        ]
    },
    {
        id: 'paris-istanbul',
        name: 'Paris to Istanbul',
        duration: '5 Nights',
        description: 'The historic odyssey. A once-in-a-lifetime grand tour across Europe, visiting Budapest and Bucharest.',
        stops: ['Paris', 'Budapest', 'Bucharest', 'Istanbul'],
        image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=2671&auto=format&fit=crop', // Istanbul
        heroVideo: 'https://cdn.coverr.co/videos/coverr-flying-over-the-coast-4632/1080p.mp4',
        heroImage: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=2671&auto=format&fit=crop',
        price: '£17,500',
        timeline: [
            {
                time: "Day 1",
                day: "Day 1",
                title: "The Beginning",
                location: "Paris",
                description: "Depart Paris for a journey across the continent.",
                image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2000&auto=format&fit=crop" // Paris
            },
            {
                time: "Day 2",
                day: "Day 2",
                title: "Budapest",
                location: "Hungary",
                description: "Arrive in Budapest. Private dinner at the Danube Palace.",
                image: "https://images.unsplash.com/photo-1599582236873-c917b2b6495d?q=80&w=2000&auto=format&fit=crop" // Budapest
            },
            {
                time: "Day 4",
                day: "Day 4",
                title: "Bucharest",
                location: "Romania",
                description: "Explore the architecture of 'Little Paris'.",
                image: "https://images.unsplash.com/photo-1588612141505-ff2df44ab280?q=80&w=2000&auto=format&fit=crop" // Bucharest
            },
            {
                time: "Day 6",
                day: "Day 6",
                title: "The Gates of the East",
                location: "Istanbul",
                description: "The journey concludes in the historic city where East meets West.",
                image: "https://images.unsplash.com/photo-1616422306714-c27635677943?q=80&w=2000&auto=format&fit=crop", // Istanbul Mosque
                video: "https://cdn.coverr.co/videos/coverr-istanbul-bosphorus-4625/1080p.mp4" // Istanbul Video
            }
        ]
    },
    {
        id: 'london-venice',
        name: 'London to Venice',
        duration: '1 Night',
        description: 'Begin your journey in London aboard the Belmond British Pullman before boarding the VSOE in Calais.',
        stops: ['London', 'Calais', 'Paris', 'Venice'],
        image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2670&auto=format&fit=crop', // London
        heroVideo: 'https://cdn.coverr.co/videos/coverr-people-walking-in-london-4621/1080p.mp4',
        heroImage: 'https://images.unsplash.com/photo-1486299267070-83823f5448dd?q=80&w=2000&auto=format&fit=crop', // Big Ben
        price: '£4,100',
        timeline: [
            {
                time: "10:00",
                day: "Day 1",
                title: "Victoria Station",
                location: "London",
                description: "Board the British Pullman. Brunch is served as you travel through Kent.",
                image: "https://images.unsplash.com/photo-1520986606214-8b456906c813?q=80&w=2000&auto=format&fit=crop" // London Train/Station
            },
            {
                time: "16:00",
                day: "Day 1",
                title: "The Crossing",
                location: "Calais",
                description: "Transfer to the Continental train. The blue and gold carriages await.",
                image: "https://images.unsplash.com/photo-1436491865332-7a615109cc05?q=80&w=2000&auto=format&fit=crop" // France/Train
            }
        ]
    }
];

