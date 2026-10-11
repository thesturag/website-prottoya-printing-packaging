import { defineConfig, fontProviders } from 'astro/config';

export default defineConfig({
  site: 'https://prottoya.vercel.app',
  // The site CSS is small; inlining it removes a render-blocking request.
  build: { inlineStylesheets: 'always' },
  // Self-hosted at build time, with size-matched fallbacks so text doesn't shift on swap.
  fonts: [
    { provider: fontProviders.google(), name: 'Inter Tight', cssVariable: '--font-inter-tight', weights: [400, 500, 600, 700], styles: ['normal'], subsets: ['latin'], fallbacks: ['Hind Siliguri', 'system-ui', 'sans-serif'] },
    { provider: fontProviders.google(), name: 'Bricolage Grotesque', cssVariable: '--font-bricolage', weights: ['500 800'], subsets: ['latin'], fallbacks: ['Hind Siliguri', 'system-ui', 'sans-serif'], options: { experimental: { variableAxis: { opsz: [['12', '96']] } } } },
  ],
});
