import { useLanguageStore } from '../store/useLanguageStore';
import { getDictionary, Locale } from './dictionaries';

export function useTranslation() {
    const { language } = useLanguageStore();
    // Map uppercase 'EN' to 'en' etc.
    const t = getDictionary(language.toLowerCase() as Locale);
    return { t, language };
}
