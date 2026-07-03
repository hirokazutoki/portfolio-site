export const translations = {
  en: {
    name: 'Hirokazu Toki',
    role: 'Web Application Developer',
    givenName: 'Hirokazu',
    familyName: 'Toki',
    alternateName: ['時 大和', 'とき ひろかず'],
    backToHome: 'Back to Home',
  },
  ja: {
    name: '時 大和',
    givenName: '大和',
    familyName: '時',
    role: 'Webアプリケーションエンジニア',
    alternateName: ['とき ひろかず', 'Hirokazu Toki'],
    backToHome: 'ホーム画面に戻る',
  },
} as const;

export type Locale = keyof typeof translations;
export const t = (locale: string) =>
  translations[locale as Locale] ?? translations.en;