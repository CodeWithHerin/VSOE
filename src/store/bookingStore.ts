import { create } from 'zustand'

interface BookingState {
    // Selection State
    selectedCabinId: string | null;
    currentSegment: 'Paris' | 'Alps' | 'Venice';

    // Environmental State (Visuals)
    timeOfDay: 'day' | 'golden_hour' | 'midnight';
    interiorLightState: 'off' | 'dim' | 'bright';
    scrollProgress: number;

    // Actions
    selectCabin: (id: string | null) => void;
    setScrollProgress: (progress: number) => void;
    setTimeOfDay: (time: 'day' | 'golden_hour' | 'midnight') => void;
}

export const useBookingStore = create<BookingState>((set) => ({
    selectedCabinId: null,
    currentSegment: 'Paris',
    timeOfDay: 'day',
    interiorLightState: 'off',
    scrollProgress: 0,

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
        // 0.0 - 0.33: Paris (Day)
        // 0.33 - 0.66: Alps (Golden Hour)
        // 0.66 - 1.0: Venice (Midnight)

        let segment: 'Paris' | 'Alps' | 'Venice' = 'Paris';
        let time: 'day' | 'golden_hour' | 'midnight' = 'day';

        if (progress < 0.33) {
            segment = 'Paris';
            time = 'day';
        } else if (progress < 0.66) {
            segment = 'Alps';
            time = 'golden_hour';
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
