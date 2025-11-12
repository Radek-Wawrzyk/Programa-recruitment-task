import { useI18n } from 'vue-i18n'

const languagesMap = {
  pl: {
    currency: 'PLN',
    fullLocale: 'pl-PL',
  },
} as const

const usePrice = () => {
  const { locale } = useI18n()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(
      languagesMap[locale.value as keyof typeof languagesMap].fullLocale,
      {
        style: 'currency',
        currency: languagesMap[locale.value as keyof typeof languagesMap].currency,
      },
    ).format(price)
  }

  return { formatPrice }
}

export { usePrice }
