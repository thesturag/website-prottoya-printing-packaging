import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://prottoya.vercel.app',
  // The site CSS is small; inlining it removes a render-blocking request.
  build: { inlineStylesheets: 'always' },
});
