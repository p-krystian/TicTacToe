import en from './en.json';
import pl from './pl.json';
import ru from './ru.json';

const translations = {
  en: {
    name: 'English',
    translation: en
  },
  pl: {
    name: 'Polski',
    translation: pl
  },
  ru: {
    name: 'Русский',
    translation: ru
  }
} as const;

export { translations };
