// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://elyostudio.fr',
  trailingSlash: 'ignore',
  integrations: [sitemap({ filter: (page) => !page.includes('/merci') })],
  build: { inlineStylesheets: 'auto' },
  compressHTML: true,
});
