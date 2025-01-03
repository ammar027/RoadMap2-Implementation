import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { en, es } from "./translation";

const resources = {
    en: {
        translation: en,
    },
    es: {
        translation: es,
    }
}

i18next.use(initReactI18next).init({
    lng: 'en', // if you're using a language detector, do not define the lng option
    debug: true,
    resources: resources,
    interpolation: {
        escapeValue: false // React already handles escaping
    }
})

export default i18next;