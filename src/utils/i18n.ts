import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { translations } from '@/assets/langs';

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  resources: translations
});

export default i18n;
