import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations dynamically
import enHeader from '../locales/en/header.json';
import enSider from '../locales/en/sider.json';
import enVendor from '../locales/en/vendor_level_list.json';
import enBusiness from '../locales/en/business_level_list.json';
import enCurrency from '../locales/en/currency_exchange.json';

import myanHeader from '../locales/myan/header.json';
import myanSider from '../locales/myan/sider.json';
import myanVendor from '../locales/myan/vendor_level_list.json';
import myanBusiness from '../locales/myan/business_level_list.json';
import myanCurrency from '../locales/myan/currency_exchange.json';

import thaiHeader from '../locales/thai/header.json';
import thaiSider from '../locales/thai/sider.json';
import thaiVendor from '../locales/thai/vendor_level_list.json';
import thaiBusiness from '../locales/thai/business_level_list.json';
import thaiCurrency from '../locales/thai/currency_exchange.json';

// Merge all translations for each language
const resources = {
  en: {
    translation: {
      ...enHeader,
      ...enSider,
      ...enVendor,
      ...enBusiness,
      ...enCurrency,
    },
  },
  myan: {
    translation: {
      ...myanHeader,
      ...myanSider,
      ...myanVendor,
      ...myanBusiness,
      ...myanCurrency,
    },
  },
  thai: {
    translation: {
      ...thaiHeader,
      ...thaiSider,
      ...thaiVendor,
      ...thaiBusiness,
      ...thaiCurrency,

    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback language
    interpolation: {
      escapeValue: false, // React already prevents XSS
    },
  });

export default i18n;
