import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type LanguageState = {
    language: 'EN' | 'FR' | 'IT' | 'DE';
    setLanguage: (lang: 'EN' | 'FR' | 'IT' | 'DE') => void;
};

export const useLanguageStore = create<LanguageState>()(
    persist(
        (set) => ({
            language: 'EN',
            setLanguage: (lang) => set({ language: lang }),
        }),
        {
            name: 'vsoe-language-storage',
        }
    )
);
