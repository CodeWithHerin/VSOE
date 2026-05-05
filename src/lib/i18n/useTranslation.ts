import { useLanguageStore } from '../store/useLanguageStore';
import { dictionaries } from './dictionaries';

export function useTranslation() {
    const { language } = useLanguageStore();
    const t = dictionaries[language] || dictionaries['EN'];
    return { t, language };
}
