import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://missing-bits.com',
  integrations: [
    // The unprefixed language detectors (`/`, `/contact/`, `/projects/`) are noindex
    // redirect pages — keep them out of the sitemap so crawlers get one consistent signal.
    sitemap({
      filter: (page) =>
        page !== 'https://missing-bits.com/' &&
        page !== 'https://missing-bits.com/contact/' &&
        page !== 'https://missing-bits.com/projects/',
    }),
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pl'],
    routing: { prefixDefaultLocale: true },
  },
});
