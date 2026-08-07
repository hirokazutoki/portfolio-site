export const translations = {
  en: {
    name: 'Hirokazu Toki',
    romajiName: '',
    givenName: 'Hirokazu',
    familyName: 'Toki',
    role: 'Web Application Developer',
    description: [
      'Web Application Developer',
      'From Osaka, living in Hyogo',
      'Shipping apps daily with PHP / Laravel'
    ],
    alternateName: ['時 大和', 'とき ひろかず'],
    backToHome: 'Back to Home',
    articlesPageTitle: 'Articles',
    backToArticles: 'Back to Articles',
    prev: 'Prev',
    next: 'Next',
    contents: 'Contents',
  },
  ja: {
    name: '時 大和',
    romajiName: 'Toki Hirokazu',
    givenName: '大和',
    familyName: '時',
    role: 'Webアプリケーションエンジニア',
    description: [
      'Webアプリケーションエンジニア',
      '大阪府出身、兵庫県在住',
      'PHP / Laravel で日々アプリを開発中'
    ],
    alternateName: ['とき ひろかず', 'Hirokazu Toki'],
    backToHome: 'ホーム画面に戻る',
    articlesPageTitle: '記事',
    backToArticles: '記事一覧に戻る',
    prev: '前',
    next: '次',
    contents: '目次',
  },
} as const;

export type Locale = keyof typeof translations;
export const t = (locale: string) =>
  translations[locale as Locale] ?? translations.en;