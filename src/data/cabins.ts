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
            day: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=2657&auto=format&fit=crop', // Lounge vibe
            night: 'https://images.unsplash.com/photo-1616594039964-40891a90c3d9?q=80&w=2670&auto=format&fit=crop' // Bedroom vibe (approx)
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
            day: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2774&auto=format&fit=crop', // Luxury Room
            night: 'https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?q=80&w=2671&auto=format&fit=crop' // Dim lighting
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
            day: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop', // Opulent bedroom
            night: 'https://images.unsplash.com/photo-1618221381711-42ca8ab6e908?q=80&w=2000&auto=format&fit=crop' // Night mode
        }
    }
];
