import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { getLocale } from '../utils/utils.locale'
import translationEN from './app_en.json'
import translationFR from './app_fr.json'

// Define the locale to be used
const locale = getLocale()

i18n.use(initReactI18next)
  .init({
    resources: { en: { translation: translationEN }, fr: { translation: translationFR } },
    lng: locale,
    fallbackLng: locale,
    interpolation: { escapeValue: false },
    react: { useSuspense: false }
  })

export default i18n
