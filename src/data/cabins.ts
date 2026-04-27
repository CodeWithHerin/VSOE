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
            day: 'https://images.pexels.com/photos/8082220/pexels-photo-8082220.jpeg?auto=compress&cs=tinysrgb&w=1920', // Lounge vibe
            night: 'https://images.pexels.com/photos/14547145/pexels-photo-14547145.jpeg?auto=compress&cs=tinysrgb&w=1920' // Bedroom vibe (approx)
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
            day: 'https://images.pexels.com/photos/4946758/pexels-photo-4946758.jpeg?auto=compress&cs=tinysrgb&w=1920', // Luxury Room
            night: 'https://images.pexels.com/photos/20439293/pexels-photo-20439293.jpeg?auto=compress&cs=tinysrgb&w=1920' // Dim lighting
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
            day: 'https://images.pexels.com/photos/8135502/pexels-photo-8135502.jpeg?auto=compress&cs=tinysrgb&w=1920', // Opulent bedroom
            night: 'https://images.pexels.com/photos/18254581/pexels-photo-18254581.jpeg?auto=compress&cs=tinysrgb&w=1920' // Night mode
        }
    }
];
