import en from './en.json';
import pl from './pl.json';

const translations = {
  en: {
    name: 'English',
    translation: en
  },
  pl: {
    name: 'Polski',
    translation: pl
  }
} as const;

export { translations };
