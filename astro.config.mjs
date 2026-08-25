import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import rehypeRaw from 'rehype-raw';

// Deploy target: Netlify or Vercel (static). Decap CMS uses GitHub backend.
export default defineConfig({
  site: 'https://abdullahtayyab.dev',
  integrations: [sitemap(), mdx()],
  markdown: {
    rehypePlugins: [rehypeRaw],
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      wrap: true,
    },
  },
});
