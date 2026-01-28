import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type PreferencesStore = {
  theme: 'dark' | 'light';
  language: 'en' | 'pl';

  actions: {
    toggleTheme: () => void;
    setLanguage: (lang: 'en' | 'pl') => void;
  };
};

const usePreferences = create<PreferencesStore>()(
  persist(
    set => ({
      theme: 'dark',
      language: 'en',

      actions: {
        toggleTheme: () => set(state => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
        setLanguage: lang => set({ language: lang })
      }
    }),
    {
      name: 'preferences',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({
        theme: state.theme,
        language: state.language
      })
    }
  )
);

export default usePreferences;
