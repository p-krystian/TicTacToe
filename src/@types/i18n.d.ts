import 'i18next';

type Resources = {
  translation: typeof import('@/assets/langs/en.json');
};

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: Resources;
  }
}
