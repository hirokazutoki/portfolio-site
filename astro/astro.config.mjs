// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { remarkLinkCard } from './src/remark/remark-link-card.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://hirokazutoki.com',
  base: process.env.BASE_PATH,
  trailingSlash: "never",
  i18n: {
    defaultLocale: 'ja',
    locales: ['en', 'ja'],
    routing: {
      prefixDefaultLocale: false
    }
  },
  markdown: {
    remarkPlugins: [remarkLinkCard]
  },
  vite: {
    plugins: [tailwindcss()]
  }
});