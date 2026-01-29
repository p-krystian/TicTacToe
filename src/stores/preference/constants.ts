import { translations } from '@/assets/langs';

type PreferenceStoreT = {
  _hasInitialized: boolean;
  _init: (state: PreferenceStoreT) => Promise<void>;

  theme: 'dark' | 'light';
  language: keyof typeof translations;
};

// prettier-ignore
const OmittedFields = [
  '_hasInitialized',
  '_init'
] satisfies (keyof PreferenceStoreT)[];

export { OmittedFields, type PreferenceStoreT };
