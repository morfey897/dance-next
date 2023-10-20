const i18nConfig = {
  locales: ['uk', 'en', 'ru'],
  defaultLocale: 'uk',
  prefixDefault: false,
  localeCookie: 'NEXT_LOCALE',
  translation: {
    uk: { title: 'Українська', abr: 'Укр', },
    en: { title: 'English', abr: 'Eng' },
    ru: { title: 'Русский', abr: 'Язык', hide: true },
  },
  currencies: {
    UAH: {
      symbol: '₴',
      abr: {
        uk: 'грн.',
        ru: 'грн.',
        en: 'uah.'
      }
    },
    USD: {
      symbol: '$',
    },
    EUR: {
      symbol: '€'
    }
  },
};

module.exports = i18nConfig;