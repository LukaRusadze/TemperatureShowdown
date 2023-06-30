import en from './locales/en.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'test';
    resources: {
      translation: typeof en;
    };
  }
}
