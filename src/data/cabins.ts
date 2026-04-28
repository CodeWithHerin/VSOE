export const cabins = [
    {
        id: 'historic-cabin',
        name: 'Historic Cabin',
        slug: 'historic-cabin',
        tagline: 'A Masterpiece of Art Deco',
        description: 'The original 1920s cabins, restored to their former glory. By day, a comfortable banquette lounge; by night, a cozy upper and lower berth bedroom.',
        price: 'From £3,530 per passenger',
        features: [
            'Convertible Banquette Sofa',
            'Washbasin with Hot & Cold Water',
            'Complimentary Robes & Slippers',
            '24-Hour Steward Service'
        ],
        images: {
            day: '/images/vsoe/vsoe-historic-cabin.jpg', // Lounge vibe
            night: '/images/vsoe/vsoe-bar-car.jpg' // Bedroom vibe (approx)
        }
    },
    {
        id: 'suite',
        name: 'Suite',
        slug: 'suite',
        tagline: 'Modern Comfort, Vintage Style',
        description: 'New for 2023. These suites offer more space and an en-suite marble bathroom, bridging the gap between Historic Cabins and Grand Suites.',
        price: 'From £7,200 per passenger',
        features: [
            'Double or Twin Beds',
            'Private En-Suite Bathroom',
            'Complimentary Champagne',
            'Daytime Lounge Configuration'
        ],
        images: {
            day: '/images/vsoe/vsoe-grand-suite.jpg', // Luxury Room
            night: '/images/vsoe/vsoe-dining-car.jpg' // Dim lighting
        }
    },
    {
        id: 'grand-suite',
        name: 'Grand Suite',
        slug: 'grand-suite',
        tagline: 'The Ultimate Indulgence',
        description: 'The most spacious and opulent accommodation on board. Each Grand Suite is unique, named after the cities the train visits (Paris, Venice, Istanbul).',
        price: 'From £10,100 per passenger',
        features: [
            'Private Dining',
            'Unlimited Champagne',
            'Mosaic-Tiled En-Suite',
            '24-Hour Butler Service'
        ],
        images: {
            day: '/images/vsoe/vsoe-paris-departure.jpg', // Opulent bedroom
            night: '/images/vsoe/vsoe-grand-suite.jpg' // Night mode
        }
    }
];
