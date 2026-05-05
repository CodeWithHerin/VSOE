'use client';

import { useEffect } from 'react';

export default function GoogleTranslate() {
    useEffect(() => {
        // Only load the script once
        if (!document.getElementById('google-translate-script')) {
            const script = document.createElement('script');
            script.id = 'google-translate-script';
            script.type = 'text/javascript';
            script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
            script.async = true;
            document.body.appendChild(script);

            // Initialize function for Google Translate
            (window as any).googleTranslateElementInit = () => {
                new (window as any).google.translate.TranslateElement(
                    {
                        pageLanguage: 'en',
                        includedLanguages: 'en,fr,it,de',
                        layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
                        autoDisplay: false,
                    },
                    'google_translate_element'
                );
            };
        }
    }, []);

    return (
        <div id="google_translate_element" className="hidden" aria-hidden="true" />
    );
}
