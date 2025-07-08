// src/i18n.ts
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpBackend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
    .use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'th',
        supportedLngs: ['en', 'th'],
        ns: [
            'components', 'lang', 'home', 'video', 'about',
        ],
        detection: {
            order: ['querystring', 'localStorage', 'navigator'],
            lookupQuerystring: 'locale',
            caches: ['localStorage'],
        },
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
        react: {
            useSuspense: false,
        },
    })

export default i18n
