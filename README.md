# Prottoya Printing & Packaging website

Marketing site for Prottoya Printing & Packaging (Babu Bazar, Dhaka). Astro static site with GSAP ScrollTrigger and Lenis for motion, English at `/` and Bangla at `/bn/`, light and dark themes.

## Develop

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
```

## Where things live

- `src/data/site.ts`: all copy (EN and BN), services, gallery picks and contact details
- `src/styles/tokens.css`: brand palette and type scale
- `src/scripts/main.ts`: smooth scroll, reveals, cube, marquee, gallery pin, theme toggle, quote form
- `src/assets/work/`: photos used on the page (optimized to WebP at build)
- `archive/`: the rest of the photos collected from Facebook, not part of the build
- `api/quote.js`: Vercel function that emails quote requests

## Deploy (Vercel)

Import the repo in Vercel. Every push to a PR gets a preview URL and `main` deploys to production. For the quote form's email copy, set `RESEND_API_KEY` (see `.env.example`); without it the form still opens WhatsApp with the request.
