---
target: whole site
total_score: 21
max_score: 32
na_heuristics: 7,10
p0_count: 1
p1_count: 2
target_identity: "file:D:\\projects\\claude-preapproved-folder\\deploy\\website-prottoya-printing-packaging\\src\\pages\\index.astro"
target_fingerprint: "sha256:482bfc4c7ec5e282af19e4b466c5758bfaf7812d8b907cb435d271e8a6281da1"
target_path: "D:\\projects\\claude-preapproved-folder\\deploy\\website-prottoya-printing-packaging\\src\\pages\\index.astro"
timestamp: 2026-10-11T19-27-46Z
slug: src-pages-index-astro
---
Method: dual-agent (A: design review · B: detector + browser)

Design Health: 21/32 (Acceptable). Heuristics 7, 10 n/a (Persuade surface).
H1 2 quote outcome unclear, /api/quote 503 · H2 3 · H3 3 · H4 3 four CTA labels · H5 2 no "leaves site" notice, placeholder looks filled · H6 3 · H8 3 stacked motion · H9 2 browser-only validation.

Specificity: mostly authored (crop marks, registration ring, CMYK, product-photo cube, trade copy) with a generic agency layer (pill nav, magnetic buttons, cursor preview, velocity marquee, pinned rail, dark slab + count-ups).
Detector: src clean; live / flags hero-eyebrow-chip (real pattern), 2x ghost-button low-contrast (false positive: hidden ::after hover fill), placeholder 4.2:1 (real, advisory).

Priority issues:
[P0] Quote submit outcome unclear; email backup 503 -> harden (no desktop change)
[P1] "Open every day" live dot + 24/7 schema without confirmed hours -> clarify (minor desktop change)
[P1] Mobile hero cube above copy; floating WhatsApp overlaps CTA -> adapt (mobile only)
[P2] CTA labels/channel duplication -> distill (desktop change)
[P2] Motion stacking, generic tropes -> quieter (desktop change)
Personas: Casey (mobile), Rahim (Bangla mishti shop owner: English WhatsApp text, no price/turnaround anchor), Jordan (jargon: GSM, dieline).
