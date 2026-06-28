// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

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
  vite: {
    plugins: [tailwindcss()]
  }
});