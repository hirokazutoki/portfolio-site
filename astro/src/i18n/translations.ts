export const translations = {
  en: {
    name: 'Hirokazu Toki',
    role: 'Web Application Developer',
  },
  ja: {
    name: '時 大和',
    role: 'Webアプリケーションエンジニア',
  },
} as const;

export type Locale = keyof typeof translations;
export const t = (locale: string) =>
  translations[locale as Locale] ?? translations.en;