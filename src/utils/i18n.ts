import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { translations } from '@/assets/langs';

// eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  resources: translations
});

export default i18n;
