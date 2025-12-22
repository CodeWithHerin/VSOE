import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UIState {
    isHeroVideoLoaded: boolean;
    isPreloaderComplete: boolean;
    setHeroVideoLoaded: (loaded: boolean) => void;
    setPreloaderComplete: (complete: boolean) => void;
}

export const useUIStore = create<UIState>()(
    persist(
        (set) => ({
            isHeroVideoLoaded: false,
            isPreloaderComplete: false,
            setHeroVideoLoaded: (loaded) => set({ isHeroVideoLoaded: loaded }),
            setPreloaderComplete: (complete) => set({ isPreloaderComplete: complete }),
        }),
        {
            name: 'vsoe-ui-storage', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
            partialize: (state) => ({ isPreloaderComplete: state.isPreloaderComplete }), // Only persist preloader state
        }
    )
);
