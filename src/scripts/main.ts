import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const root = document.documentElement;
const motion = root.classList.contains('js-motion');
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
const $$ = <T extends Element = HTMLElement>(sel: string, el: ParentNode = document) => Array.from(el.querySelectorAll<T>(sel) as NodeListOf<T & Element>) as T[];

/* Theme toggle: circular reveal from the button where View Transitions exist. */
document.querySelector<HTMLButtonElement>('[data-theme-toggle]')?.addEventListener('click', (e) => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  const apply = () => {
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch {}
  };
  if (!motion || !('startViewTransition' in document)) return apply();
  const { clientX: x, clientY: y } = e;
  const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  const vt = (document as Document & { startViewTransition: (cb: () => void) => { ready: Promise<void> } }).startViewTransition(apply);
  vt.ready.then(() => {
    root.animate({ clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] }, { duration: 700, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', pseudoElement: '::view-transition-new(root)' });
  });
});

/* Header: solid once scrolled, hides on scroll down. */
const header = document.querySelector<HTMLElement>('[data-header]');
let lastY = scrollY;
const onScroll = () => {
  const y = scrollY;
  header?.classList.toggle('scrolled', y > 20);
  if (y > lastY && y > 400) header?.classList.add('hidden');
  else if (y < lastY) header?.classList.remove('hidden');
  lastY = y;
};
addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* Quote form: opens WhatsApp with the request and emails it in the background. */
const form = document.querySelector<HTMLFormElement>('[data-quote-form]');
$$<HTMLAnchorElement>('[data-product]').forEach((a) =>
  a.addEventListener('click', () => {
    const input = form?.querySelector<HTMLInputElement>(`[data-product-id="${a.dataset.product}"]`);
    if (input) input.checked = true;
  }),
);
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  if (data.get('company')) return;
  const status = form.querySelector<HTMLElement>('.status')!;
  const fields = ['name', 'phone', 'product', 'quantity', 'details'] as const;
  const values = Object.fromEntries(fields.map((k) => [k, String(data.get(k) ?? '').trim()]));
  const text = [
    `Quote request from ${values.name} (${values.phone})`,
    `Product: ${values.product}`,
    values.quantity && `Quantity: ${values.quantity}`,
    values.details && `Details: ${values.details}`,
  ].filter(Boolean).join('\n');
  window.open(`https://wa.me/${form.dataset.wa}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  status.textContent = form.dataset.sending ?? '';
  fetch('/api/quote', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...values, lang: root.lang }) })
    .then((r) => { status.textContent = (r.ok ? form.dataset.sent : form.dataset.fallback) ?? ''; if (r.ok) form.reset(); })
    .catch(() => { status.textContent = form.dataset.fallback ?? ''; });
});

if (motion) initMotion();

function initMotion() {
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  $$<HTMLAnchorElement>('a[href^="#"]').forEach((a) =>
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href')!);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -80, duration: 1.4 });
    }),
  );

  /* Hero intro */
  gsap.fromTo('[data-cube-scene]', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.6, ease: 'expo.out', delay: 0.2 });

  /* Scroll reveals */
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 88%',
    once: true,
    onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: 0.08 }),
  });

  /* Cube: idles in a slow spin, leans toward the pointer. */
  const cube = document.querySelector<HTMLElement>('[data-cube]');
  if (cube) {
    const state = { rx: -22, ry: 38, px: 0, py: 0 };
    gsap.to(state, { ry: '+=360', duration: 24, ease: 'none', repeat: -1 });
    if (finePointer) {
      addEventListener('pointermove', (e) => {
        gsap.to(state, { px: (e.clientX / innerWidth - 0.5) * 50, py: (e.clientY / innerHeight - 0.5) * -30, duration: 1.2, ease: 'power3.out', overwrite: 'auto' });
      });
    }
    ScrollTrigger.create({ trigger: '[data-hero]', start: 'top top', end: 'bottom top', scrub: true, onUpdate: (s) => (state.rx = -22 - s.progress * 60) });
    gsap.ticker.add(() => {
      cube.style.setProperty('--rx', `${state.rx + state.py}deg`);
      cube.style.setProperty('--ry', `${state.ry + state.px}deg`);
    });
  }
  gsap.to('[data-spin]', { rotate: 180, ease: 'none', scrollTrigger: { trigger: '[data-hero]', start: 'top top', end: 'bottom top', scrub: true } });

  /* Marquees: speed and direction follow scroll velocity. */
  $$('[data-marquee]').forEach((track) => {
    track.dataset.js = '';
    const dir = Number(track.dataset.dir ?? 1);
    const tween = gsap.fromTo(track, { xPercent: dir > 0 ? 0 : -50 }, { xPercent: dir > 0 ? -50 : 0, duration: 36, ease: 'none', repeat: -1 });
    ScrollTrigger.create({
      onUpdate: (self) => {
        const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 300, 6);
        gsap.to(tween, { timeScale: self.direction * boost, duration: 0.2, overwrite: true });
        gsap.to(tween, { timeScale: self.direction, duration: 1.2, delay: 0.2, ease: 'power2.out' });
      },
    });
  });

  /* Services: floating preview that trails the cursor. */
  const preview = document.querySelector<HTMLElement>('[data-hover-preview]');
  if (preview && finePointer) {
    const imgs = $$('img', preview);
    const xTo = gsap.quickTo(preview, 'x', { duration: 0.6, ease: 'power3' });
    const yTo = gsap.quickTo(preview, 'y', { duration: 0.6, ease: 'power3' });
    const rTo = gsap.quickTo(preview, 'rotate', { duration: 0.8, ease: 'power3' });
    let lastX = 0;
    $$('[data-hover-item]').forEach((row) => {
      const i = Number(row.dataset.hoverItem);
      row.addEventListener('pointerenter', () => {
        preview.classList.add('on');
        imgs.forEach((img, j) => img.classList.toggle('on', i === j));
      });
      row.addEventListener('pointerleave', () => preview.classList.remove('on'));
    });
    addEventListener('pointermove', (e) => {
      const w = preview.offsetWidth;
      xTo(Math.min(e.clientX + 30, innerWidth - w - 16));
      yTo(e.clientY - preview.offsetHeight / 2);
      rTo(gsap.utils.clamp(-12, 12, (e.clientX - lastX) * 0.6));
      lastX = e.clientX;
    });
  }

  /* Work: vertical scroll drives the rail sideways on wide screens. */
  ScrollTrigger.matchMedia({
    '(min-width: 901px)': () => {
      const section = document.querySelector<HTMLElement>('[data-hscroll]');
      const track = document.querySelector<HTMLElement>('[data-hscroll-track]');
      if (!section || !track) return;
      const distance = () => Math.max(0, track.scrollWidth - innerWidth);
      gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: { trigger: section.querySelector('[data-hscroll-pin]'), start: 'center center', end: () => `+=${distance()}`, pin: true, scrub: 0.8, invalidateOnRefresh: true, anticipatePin: 1 },
      });
    },
  });

  /* Tilt on hover */
  if (finePointer) {
    $$('[data-tilt]').forEach((card) => {
      const frame = card.firstElementChild as HTMLElement;
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        frame.style.setProperty('--ty', `${((e.clientX - r.left) / r.width - 0.5) * 12}deg`);
        frame.style.setProperty('--tx', `${((e.clientY - r.top) / r.height - 0.5) * -12}deg`);
      });
      card.addEventListener('pointerleave', () => {
        frame.style.setProperty('--tx', '0deg');
        frame.style.setProperty('--ty', '0deg');
      });
    });
  }

  /* Process rail fills as you read */
  const steps = document.querySelector<HTMLElement>('[data-steps]');
  const fill = document.querySelector<HTMLElement>('[data-steps-fill]');
  if (steps && fill) {
    ScrollTrigger.create({ trigger: steps, start: 'top 70%', end: 'bottom 60%', scrub: true, onUpdate: (s) => fill.style.setProperty('--p', String(s.progress)) });
  }

  /* Counters */
  $$('[data-count]').forEach((el) => {
    const end = Number(el.dataset.count);
    const fmt = new Intl.NumberFormat(el.dataset.locale);
    const obj = { v: 0 };
    el.textContent = fmt.format(0);
    gsap.to(obj, { v: end, duration: 2, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true }, onUpdate: () => (el.textContent = fmt.format(Math.round(obj.v))) });
  });

  /* Parallax */
  $$('[data-parallax]').forEach((img) => {
    gsap.fromTo(img, { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  /* Footer wordmark rises letter by letter */

  /* Magnetic buttons */
  if (finePointer) {
    $$('[data-magnetic]').forEach((el) => {
      const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' });
      const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' });
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - r.left - r.width / 2) * 0.25);
        yTo((e.clientY - r.top - r.height / 2) * 0.35);
      });
      el.addEventListener('pointerleave', () => { xTo(0); yTo(0); });
    });
  }

  addEventListener('load', () => ScrollTrigger.refresh());
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}
