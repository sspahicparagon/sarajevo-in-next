import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    fallbackLng: 'EN',
    lng: 'BS',
    resources: {
        EN: {
            translations: require('./EN/translation.json')
        },
        DE: {
            translations: require('./DE/translation.json')
        },
        BS: {
            translations: require('./BS/translation.json')
        }
    },
    ns: ['translations'],
    defaultNS: 'translations'
});

i18n.languages = ['EN', 'DE', 'BS'];

module.exports = {
    i18n: {
        defaultLocale: 'BS',
        locales: ['EN', 'DE', 'BS']
    },
    react: { useSuspense: false }
}