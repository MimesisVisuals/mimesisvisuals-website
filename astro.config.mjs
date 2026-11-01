import { defineConfig } from 'astro/config';

// Supply SITE_URL and BASE_PATH for the chosen hosting destination.
export default defineConfig({
  site: process.env.SITE_URL || 'https://mimesisvisuals.com',
  base: process.env.BASE_PATH || '/',
  output: 'static',
  trailingSlash: 'always',
  i18n: { defaultLocale: 'en', locales: ['en', 'el'], routing: { prefixDefaultLocale: false } },
});
