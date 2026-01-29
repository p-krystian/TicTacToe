import i18n from '@/utils/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Uniwind } from 'uniwind';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { PreferenceStoreT, OmittedFields } from './constants';

const usePreference = create<PreferenceStoreT>()(
  persist(
    (set) => ({
      _hasInitialized: false,
      _init: async state => {
        await i18n.changeLanguage(state.language);
        Uniwind.setTheme(state.theme);

        set({ _hasInitialized: true });
      },

      theme: 'dark',
      language: 'en'
    }),
    {
      name: 'preference',
      storage: createJSONStorage(() => AsyncStorage),

      partialize: state => {
        const result = { ...state };
        OmittedFields.forEach(key => {
          delete result[key];
        });
        return result;
      },

      onRehydrateStorage: () => {
        return (state, error) => {
          if (error) {
            console.log('[Preference Store]', error);
          } else {
            state?._init(state);
          }
        };
      }
    }
  )
);

export default usePreference;
