import i18n from 'i18next';
import {initReactI18next} from "react-i18next";
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

i18n.use(initReactI18next).init({
    resources,
    lng: 'en',
    keySeparator: false,
    interpolation: {
        escapeValue: true
    }
});

export default i18n;
