import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import rehypeRaw from 'rehype-raw';

const SITE_DOMAIN = 'https://abdullahtayyab.dev';

// Assign per-path sitemap priorities: home highest, main sections next,
// deep content (blog posts / project case studies) lowest.
function priorityFor(url) {
  const path = url.replace(SITE_DOMAIN, '');
  if (path === '' || path === '/') return 1.0;
  if (/^\/(about|experience|projects|blog|connect)\/?$/.test(path)) return 0.8;
  return 0.6;
}

// Deploy target: Netlify or Vercel (static). Decap CMS uses GitHub backend.
export default defineConfig({
  site: SITE_DOMAIN,
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      filter: (page) => !page.includes('/admin') && !page.includes('/one-view'),
      serialize: (item) => ({
        ...item,
        priority: priorityFor(item.url),
        changefreq: 'weekly',
      }),
    }),
    mdx(),
  ],
  markdown: {
    rehypePlugins: [rehypeRaw],
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      wrap: true,
    },
  },
});
