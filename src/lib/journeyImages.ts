/**
 * Shared utility: maps a journey name to its unique hero image.
 *
 * ORDERING RULE: Check most-specific names first before falling back
 * to partial substring matches. This prevents "Venice to Paris" from
 * matching the generic "venice" check and getting the Paris image.
 */
export function getJourneyImage(name: string): string {
    const n = name.toLowerCase();

    if (n.startsWith('venice to paris') || n === 'venice to paris') {
        return '/images/vsoe/vsoe-venice-night.jpg';
    }
    if (n.startsWith('paris to venice') || n === 'paris to venice') {
        return '/images/vsoe/vsoe-paris-departure.jpg';
    }
    if (n.includes('istanbul')) {
        return '/images/vsoe/vsoe-dining-car.jpg';
    }
    if (n.includes('london')) {
        return '/images/vsoe/vsoe-bar-car.jpg';
    }
    // Generic Venice fallback
    if (n.includes('venice')) {
        return '/images/vsoe/vsoe-paris-departure.jpg';
    }
    return '/images/vsoe/vsoe-grand-suite.jpg';
}

/** Returns both image and description for a journey name. */
export function getJourneyMeta(name: string): { image: string; description: string } {
    const n = name.toLowerCase();

    if (n.startsWith('venice to paris') || n === 'venice to paris') {
        return {
            image: '/images/vsoe/vsoe-venice-night.jpg',
            description: 'Return to the capital of romance through the heart of the Swiss Alps.',
        };
    }
    if (n.startsWith('paris to venice') || n === 'paris to venice') {
        return {
            image: '/images/vsoe/vsoe-paris-departure.jpg',
            description: 'The classic route. Depart from the City of Light and awake in the Floating City.',
        };
    }
    if (n.includes('istanbul')) {
        return {
            image: '/images/vsoe/vsoe-dining-car.jpg',
            description: 'The historic five-night odyssey. A once-in-a-lifetime grand tour across Europe.',
        };
    }
    if (n.includes('london')) {
        return {
            image: '/images/vsoe/vsoe-bar-car.jpg',
            description: 'Begin your journey aboard the Belmond British Pullman before joining the legendary blue and gold carriages.',
        };
    }
    if (n.includes('venice')) {
        return {
            image: '/images/vsoe/vsoe-paris-departure.jpg',
            description: "A legendary journey aboard the world's most romantic train.",
        };
    }
    return {
        image: '/images/vsoe/vsoe-grand-suite.jpg',
        description: 'A legendary journey across Europe.',
    };
}
