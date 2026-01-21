import { create } from 'zustand';

type PreferencesStore = {
  theme: 'dark' | 'light';
  language: 'en' | 'pl';

  actions: {
    toggleTheme: () => void;
    nextLanguage: () => void;
  };
};

const usePreferences = create<PreferencesStore>(set => ({
  theme: 'dark',
  language: 'en',

  actions: {
    toggleTheme: () => set(state => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
    nextLanguage: () => set(state => ({ language: state.language === 'en' ? 'pl' : 'en' }))
  }
}));

export default usePreferences;
