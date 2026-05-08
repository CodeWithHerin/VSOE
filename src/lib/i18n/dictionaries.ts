import { uiTranslations } from './ui';
import { journeysContent } from './content/journeys';
import { cabinsContent } from './content/cabins';
import { diningContent } from './content/dining';
import { experiencesContent } from './content/experiences';
import { legalContent } from './content/legal';
import { storiesContent } from './content/stories';

export type Locale = 'en' | 'fr' | 'it' | 'de';

export const getDictionary = (locale: Locale) => {
    return {
        ...uiTranslations[locale],
        journeysData: journeysContent[locale],
        cabinsData: cabinsContent[locale],
        diningData: diningContent[locale],
        experiencesData: experiencesContent[locale],
        legalData: legalContent[locale],
        storiesData: storiesContent[locale],
    };
};

export const locales = ['en', 'fr', 'it', 'de'] as const;
export const defaultLocale = 'en';
