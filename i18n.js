import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

// Import translation files
import en from './translations/en.json';
import es from './translations/es.json';

// List of available languages
const resources = {
  en: {
    translation: en,
  },
  es: {
    translation: es,
  },
};

// Detect the user's preferred language and set it
const language = RNLocalize.getLanguages()[0].toLowerCase();

// Initialize i18next
i18n.use(initReactI18next).init({
  resources,
  lng: language, // Set default language based on system preference
  fallbackLng: 'en', // Fallback to English if the language is not found
  interpolation: {
    escapeValue: false, // React already escapes values to prevent XSS
  },
});

export default i18n;
