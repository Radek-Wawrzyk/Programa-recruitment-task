import { createI18n } from 'vue-i18n'
import pl from './locales/pl.json'

const i18n = createI18n({
  legacy: false,
  locale: 'pl',
  fallbackLocale: 'pl',
  messages: {
    pl,
  },
  numberFormats: {
    pl: {
      currency: {
        style: 'currency',
        currency: 'PLN',
      },
    },
  },
})

export default i18n
