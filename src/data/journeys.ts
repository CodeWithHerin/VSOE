export const journeys = [
    {
        id: 'paris-venice',
        name: 'Paris to Venice',
        duration: '1 Night',
        description: 'The classic route. Depart from the City of Light, traverse the Swiss Alps, and awake in the Floating City.',
        stops: ['Paris', 'Innsbruck', 'Venice'],
        image: '/images/vsoe/vsoe-paris-departure.jpg', // Unique Paris Train
        heroVideo: 'https://cdn.coverr.co/videos/coverr-train-in-the-snow-4626/1080p.mp4',
        heroImage: '/images/vsoe/vsoe-paris-departure.jpg', // Paris Street
        price: '£3,530',
        timeline: [
            {
                time: "21:30",
                day: "Day 1",
                title: "Departure",
                location: "Paris Gare de l'Est",
                description: "Board the wagon-lits trains in the heart of Paris. Your steward welcomes you with a glass of champagne.",
                image: "https://images.pexels.com/photos/6288693/pexels-photo-6288693.jpeg?auto=compress&cs=tinysrgb&w=1920" // Champagne
            },
            {
                time: "22:00",
                day: "Day 1",
                title: "Dinner is Served",
                location: "Dining Car 'Etoile du Nord'",
                description: "Dress for the occasion. Lobster from Brittany and salt-marsh lamb are on the menu tonight.",
                image: "https://images.pexels.com/photos/3534750/pexels-photo-3534750.jpeg?auto=compress&cs=tinysrgb&w=1920" // Dining
            },
            {
                time: "08:00",
                day: "Day 2",
                title: "Morning in the Alps",
                location: "Gotthard Pass",
                description: "Raise your blind to reveal snow-capped peaks. Breakfast is served in your cabin.",
                image: "https://images.pexels.com/photos/31322236/pexels-photo-31322236.jpeg?auto=compress&cs=tinysrgb&w=1920", // Swiss Alps
                video: "https://cdn.coverr.co/videos/coverr-flying-over-snowy-mountains-4389/1080p.mp4" // Alps Video
            },
            {
                time: "13:00",
                day: "Day 2",
                title: "Lunch on the Rails",
                location: "Innsbruck",
                description: "A three-course lunch is served as you wind past Austrian castles and valleys.",
                image: "https://images.pexels.com/photos/262882/pexels-photo-262882.jpeg?auto=compress&cs=tinysrgb&w=1920" // Food/Lunch
            },
            {
                time: "18:00",
                day: "Day 2",
                title: "Arrival",
                location: "Venice Santa Lucia",
                description: "Cross the Lagoon as the sun sets. You have arrived in La Serenissima.",
                image: "https://images.pexels.com/photos/2031764/pexels-photo-2031764.jpeg?auto=compress&cs=tinysrgb&w=1920", // Venice
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
        image: '/images/vsoe/vsoe-dining-car.jpg', // Istanbul
        heroVideo: 'https://cdn.coverr.co/videos/coverr-flying-over-the-coast-4632/1080p.mp4',
        heroImage: '/images/vsoe/vsoe-dining-car.jpg',
        price: '£17,500',
        timeline: [
            {
                time: "Day 1",
                day: "Day 1",
                title: "The Beginning",
                location: "Paris",
                description: "Depart Paris for a journey across the continent.",
                image: "/images/vsoe/vsoe-paris-departure.jpg"
            },
            {
                time: "Day 2",
                day: "Day 2",
                title: "Budapest",
                location: "Hungary",
                description: "Arrive in Budapest. Private dinner at the Danube Palace.",
                image: "/images/vsoe/vsoe-exterior-night.jpg"
            },
            {
                time: "Day 4",
                day: "Day 4",
                title: "Bucharest",
                location: "Romania",
                description: "Explore the architecture of 'Little Paris'.",
                image: "/images/vsoe/vsoe-countryside-window.jpg"
            },
            {
                time: "Day 6",
                day: "Day 6",
                title: "The Gates of the East",
                location: "Istanbul",
                description: "The journey concludes in the historic city where East meets West.",
                image: "/images/vsoe/vsoe-dining-car.jpg",
                video: "https://cdn.coverr.co/videos/coverr-istanbul-bosphorus-4625/1080p.mp4" // Istanbul Video
            }
        ]
    },
    {
        id: 'london-venice',
        name: 'London to Venice',
        duration: '1 Night',
        description: 'Begin your journey in London aboard a vintage luxury Pullman carriage before boarding the train in Calais.',
        stops: ['London', 'Calais', 'Paris', 'Venice'],
        image: '/images/vsoe/vsoe-bar-car.jpg', // London
        heroVideo: 'https://cdn.coverr.co/videos/coverr-people-walking-in-london-4621/1080p.mp4',
        heroImage: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=1920', // Big Ben
        price: '£4,100',
        timeline: [
            {
                time: "10:00",
                day: "Day 1",
                title: "Victoria Station",
                location: "London",
                description: "Board the British Pullman. Brunch is served as you travel through Kent.",
                image: "https://images.pexels.com/photos/31322236/pexels-photo-31322236.jpeg?auto=compress&cs=tinysrgb&w=1920" // London Train/Station
            },
            {
                time: "16:00",
                day: "Day 1",
                title: "The Crossing",
                location: "Calais",
                description: "Transfer to the Continental train. The blue and gold carriages await.",
                image: "https://images.pexels.com/photos/31322236/pexels-photo-31322236.jpeg?auto=compress&cs=tinysrgb&w=1920" // France/Train
            }
        ]
    }
];

