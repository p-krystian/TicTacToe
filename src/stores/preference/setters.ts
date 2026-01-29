import { Uniwind } from 'uniwind';
import preferencesStore from './store';
import { PreferenceStoreT } from './constants';
import i18n from '@/utils/i18n';

function toggleTheme() {
  const newTheme = preferencesStore.getState().theme === 'light' ? 'dark' : 'light';

  Uniwind.setTheme(newTheme);
  preferencesStore.setState({ theme: newTheme });
}

async function setLanguage(langCode: PreferenceStoreT['language']) {
  await i18n.changeLanguage(langCode);
  preferencesStore.setState({ language: langCode });
}

export { toggleTheme, setLanguage };
