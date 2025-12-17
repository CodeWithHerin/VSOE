export const journeys = [
    {
        id: 'paris-venice',
        name: 'Paris to Venice',
        duration: '1 Night',
        description: 'The classic route. Depart from the City of Light, traverse the Swiss Alps, and awake in the Floating City.',
        stops: ['Paris', 'Innsbruck', 'Venice'],
        image: 'https://images.unsplash.com/photo-1520939817895-060bdaf4de1e?q=80&w=2670&auto=format&fit=crop',
        heroVideo: 'https://cdn.coverr.co/videos/coverr-train-in-the-snow-4626/1080p.mp4',
        heroImage: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=2784&auto=format&fit=crop',
        price: '£3,530',
        timeline: [
            {
                time: "21:30",
                day: "Day 1",
                title: "Departure",
                location: "Paris Gare de l'Est",
                description: "Board the wagon-lits trains in the heart of Paris. Your steward welcomes you with a glass of champagne.",
                image: "https://images.unsplash.com/photo-1499856871940-a09627c6d7db?q=80&w=2670&auto=format&fit=crop"
            },
            {
                time: "22:00",
                day: "Day 1",
                title: "Dinner is Served",
                location: "Dining Car 'Etoile du Nord'",
                description: "Dress for the occasion. Lobster from Brittany and salt-marsh lamb are on the menu tonight.",
                image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2574&auto=format&fit=crop"
            },
            {
                time: "08:00",
                day: "Day 2",
                title: "Morning in the Alps",
                location: "Gotthard Pass",
                description: "Raise your blind to reveal snow-capped peaks. Breakfast is served in your cabin.",
                image: "https://images.unsplash.com/photo-1496545672479-7f9462d23854?q=80&w=1600&auto=format&fit=crop"
            },
            {
                time: "13:00",
                day: "Day 2",
                title: "Lunch on the Rails",
                location: "Innsbruck",
                description: "A three-course lunch is served as you wind past Austrian castles and valleys.",
                image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2670&auto=format&fit=crop"
            },
            {
                time: "18:00",
                day: "Day 2",
                title: "Arrival",
                location: "Venice Santa Lucia",
                description: "Cross the Lagoon as the sun sets. You have arrived in La Serenissima.",
                image: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?q=80&w=1600&auto=format&fit=crop"
            }
        ]
    },
    {
        id: 'paris-istanbul',
        name: 'Paris to Istanbul',
        duration: '5 Nights',
        description: 'The historic odyssey. A once-in-a-lifetime grand tour across Europe, visiting Budapest and Bucharest.',
        stops: ['Paris', 'Budapest', 'Bucharest', 'Istanbul'],
        image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=2671&auto=format&fit=crop',
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
                image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1600&auto=format&fit=crop"
            },
            {
                time: "Day 2",
                day: "Day 2",
                title: "Budapest",
                location: "Hungary",
                description: "Arrive in Budapest. Private dinner at the Danube Palace.",
                image: "https://images.unsplash.com/photo-1565426873118-a17ed65d7429?q=80&w=2670&auto=format&fit=crop"
            },
            {
                time: "Day 4",
                day: "Day 4",
                title: "Bucharest",
                location: "Romania",
                description: "Explore the architecture of 'Little Paris'.",
                image: "https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?q=80&w=2606&auto=format&fit=crop"
            },
            {
                time: "Day 6",
                day: "Day 6",
                title: "The Gates of the East",
                location: "Istanbul",
                description: "The journey concludes in the historic city where East meets West.",
                image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=2671&auto=format&fit=crop"
            }
        ]
    },
    {
        id: 'london-venice',
        name: 'London to Venice',
        duration: '1 Night',
        description: 'Begin your journey in London aboard the Belmond British Pullman before boarding the VSOE in Calais.',
        stops: ['London', 'Calais', 'Paris', 'Venice'],
        image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2670&auto=format&fit=crop',
        heroVideo: 'https://cdn.coverr.co/videos/coverr-train-in-the-snow-5527/1080p.mp4',
        heroImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2670&auto=format&fit=crop',
        price: '£4,100',
        timeline: [
            {
                time: "10:00",
                day: "Day 1",
                title: "Victoria Station",
                location: "London",
                description: "Board the British Pullman. Brunch is served as you travel through Kent.",
                image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2670&auto=format&fit=crop"
            },
            {
                time: "16:00",
                day: "Day 1",
                title: "The Crossing",
                location: "Calais",
                description: "Transfer to the Continental train. The blue and gold carriages await.",
                image: "https://images.unsplash.com/photo-1534053916961-07379d48b11a?q=80&w=2670&auto=format&fit=crop"
            }
        ]
    }
];

