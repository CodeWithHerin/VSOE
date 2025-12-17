'use client';

export interface UserProfile {
    interests: {
        gastronomy: number;
        heritage: number;
        wellness: number;
        adventure: number;
    };
    lastVisited: string;
    bookingIntent: 'low' | 'medium' | 'high';
}

const DEFAULT_PROFILE: UserProfile = {
    interests: {
        gastronomy: 0,
        heritage: 0,
        wellness: 0,
        adventure: 0
    },
    lastVisited: '',
    bookingIntent: 'low'
};

export const getProfile = (): UserProfile => {
    if (typeof window === 'undefined') return DEFAULT_PROFILE;
    const stored = localStorage.getItem('vsoe-profile');
    return stored ? JSON.parse(stored) : DEFAULT_PROFILE;
};

export const updateInterest = (category: keyof UserProfile['interests'], weight: number = 1) => {
    if (typeof window === 'undefined') return;

    const profile = getProfile();
    profile.interests[category] = (profile.interests[category] || 0) + weight;
    profile.lastVisited = new Date().toISOString();

    // Simple intent scoring
    const totalInteractions = Object.values(profile.interests).reduce((a, b) => a + b, 0);
    if (totalInteractions > 10) profile.bookingIntent = 'high';
    else if (totalInteractions > 5) profile.bookingIntent = 'medium';

    localStorage.setItem('vsoe-profile', JSON.stringify(profile));
    console.log('Updated Profile:', profile);
};

export const getRecommendedContent = () => {
    const profile = getProfile();
    const sortedInterests = Object.entries(profile.interests).sort(([, a], [, b]) => b - a);
    return sortedInterests[0][0]; // Returns top interest category
};
