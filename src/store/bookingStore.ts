import { create } from 'zustand'

interface BookingState {
    // Selection State
    selectedCabinId: string | null;
    currentSegment: 'London' | 'Paris' | 'Alps' | 'Venice';

    // Environmental State (Visuals)
    timeOfDay: 'day' | 'golden_hour' | 'midnight';
    interiorLightState: 'off' | 'dim' | 'bright';
    scrollProgress: number;
    isTraveling: boolean;

    // Actions
    selectCabin: (id: string | null) => void;
    setScrollProgress: (progress: number) => void;
    setTimeOfDay: (time: 'day' | 'golden_hour' | 'midnight') => void;
    setIsTraveling: (isTraveling: boolean) => void;
}

export const useBookingStore = create<BookingState>((set) => ({
    selectedCabinId: null,
    currentSegment: 'London',
    timeOfDay: 'day',
    interiorLightState: 'off',
    scrollProgress: 0,
    isTraveling: false,

    setIsTraveling: (isTraveling) => set({ isTraveling }),

    selectCabin: (id) => set((state) => {
        // Side Effect: When cabin is selected, dim lights and switch to night mode for "cozy" feel
        if (id) {
            return {
                selectedCabinId: id,
                timeOfDay: 'midnight',
                interiorLightState: 'dim'
            };
        }
        return { selectedCabinId: null, interiorLightState: 'off' };
    }),

    setScrollProgress: (progress) => set((state) => {
        // Logic to map scroll position to journey segment
        // 0.00 - 0.25: London (Day)
        // 0.25 - 0.50: Paris (Golden Hour)
        // 0.50 - 0.75: Alps (Day/Snow)
        // 0.75 - 1.00: Venice (Midnight/Sunset)

        let segment: 'London' | 'Paris' | 'Alps' | 'Venice' = 'London';
        let time: 'day' | 'golden_hour' | 'midnight' = 'day';

        if (progress < 0.25) {
            segment = 'London';
            time = 'day';
        } else if (progress < 0.50) {
            segment = 'Paris';
            time = 'golden_hour';
        } else if (progress < 0.75) {
            segment = 'Alps';
            time = 'day';
        } else {
            segment = 'Venice';
            time = 'midnight';
        }

        // Only update if changed to avoid re-renders
        if (state.currentSegment !== segment) {
            return { currentSegment: segment, timeOfDay: time };
        }
        return {};
    }),

    setTimeOfDay: (time) => set({ timeOfDay: time })
}))
