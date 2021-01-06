import i18n from 'i18next';
import {initReactI18next} from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import translationSV from './locales/sv/translationSV.json'
import translationEN from './locales/en/translationEN.json'

const resources = {
    sv: {
        translation: translationSV
    },
    en: {
        translation: translationEN
    }
};

i18n.use(LanguageDetector).use(initReactI18next).init({
    resources,
    fallbackLng: 'en',
    detection: {
        order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
        lookupQuerystring: 'lng',
        lookupCookie: 'i18next',
        lookupLocalStorage: 'i18nextLng',
        lookupSessionStorage: 'i18nextLng',
        lookupFromPathIndex: 0,
        lookupFromSubdomainIndex: 0,
        caches: ['localStorage', 'cookie']
    },
    keySeparator: false,
    interpolation: {
        escapeValue: false
    }
});

export default i18n;
