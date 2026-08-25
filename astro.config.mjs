import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Deploy target: Netlify or Vercel (static). Decap CMS uses GitHub backend.
export default defineConfig({
  site: 'https://abdullahtayyab.dev',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      wrap: true,
    },
  },
});
