// Motion layer for the Securinets site. Pairs with src/styles/motion.css.
//
// 1) HERO: the headline loads as cipher text and decodes line by line
//    ("Break it." -> "Understand it." -> "Secure it."), then the hero settles in and a
//    single scan passes over it.
// 2) BUILD ON SCROLL: the page assembles itself piece by piece as you scroll. Every piece is
//    scrubbed by scroll position (not a timer): frames/lines first, then titles, then the
//    contents one by one. A piece never un-builds once built. Pieces already on screen at
//    load build in a short timed sequence instead.
//
// Pieces are only ever revealed with clip-path and opacity, never with size, position or
// transforms, so nothing can shift the layout or move the scroll position.
// It only adds data-attributes to existing elements (React never touches those), so no
// component, text, colour or layout changes. Static, no dependencies. Skipped completely
// for visitors with prefers-reduced-motion.

const POOL = 'ABCDEFGHJKLNOPQRSTUVXYZ0123456789';
const randomGlyph = () => POOL[(Math.random() * POOL.length) | 0];
const isGlyph = (c) => /[A-Za-z0-9]/.test(c);
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const easeOut = (p) => 1 - Math.pow(1 - p, 3);

/* kinds:  title = line draws, then title wipes in    x = wipe left->right
           y = wipe top->bottom                       c = wipe from the centre outwards
           fade = fade in
   step  = extra scroll distance (px) between siblings, so they build one after another
   after = scroll distance (px) this piece waits behind the one before it
   mod   = restart the sibling count every N items (rows of a grid)                      */
const PIECES = [
  // titles
  { sel: '.h2', kind: 'title' },
  { sel: '.split h2', kind: 'title' },
  { sel: '.event > h2', kind: 'x' },
  { sel: '.section-note', kind: 'fade', after: 70 },

  // home: why -> frame wipes down, then its heading and text
  { sel: '.why-list li', kind: 'y', step: 70 },
  { sel: '.why-list h3', kind: 'fade', after: 60 },
  { sel: '.why-list p', kind: 'fade', after: 110 },

  // home: what we work on -> tiles assemble row by row
  { sel: '.fields-grid li', kind: 'x', step: 60, mod: 4 },

  // home: calendar -> frame, weekdays, then day cells one after another
  { sel: '.cal', kind: 'y' },
  { sel: '.cal-break-note', kind: 'x', after: 40 },
  { sel: '.cal-bar', kind: 'fade', after: 40 },
  { sel: '.cal-wd', kind: 'fade', step: 22, after: 70, mod: 7 },
  { sel: '.cal-day', kind: 'fade', step: 16, after: 110, mod: 7 },
  { sel: '.cal-legend', kind: 'fade', after: 200 },
  { sel: '.cal-list-head', kind: 'fade', after: 40 },
  { sel: '.cal-list li', kind: 'fade', step: 55, after: 60 },
  { sel: '.cal-list .empty', kind: 'fade', after: 60 },

  // photo strips open from the centre
  { sel: '.pano', kind: 'c' },
  { sel: '.friendly-ctf-card', kind: 'y' },

  // inner pages
  { sel: '.split-body > *', kind: 'fade', step: 60, after: 50 },
  { sel: '.event > :not(h2)', kind: 'fade', step: 55, after: 60 },
  { sel: '.note', kind: 'x' },

  // footer
  { sel: '.footer-brand', kind: 'fade' },
  { sel: '.footer-follow', kind: 'fade', after: 60 },
  { sel: '.footer-socials li', kind: 'fade', step: 50, after: 110 },
  { sel: '.footer-rights', kind: 'x', after: 40 },
];

const RANGE = { title: 320, x: 300, y: 380, c: 440, fade: 240 };
// sections that must appear instantly, with no build animation: "What we work on" and the calendar
const STATIC = '.cal-section, [aria-labelledby="fields-title"]';
const GATE_MS = 650; // timed build for pieces that are already on screen at load

/* ------------------------------------------------------------------ */
/* Hero: decode the headline                                           */
/* ------------------------------------------------------------------ */
function decodeHero(h1) {
  const hero = h1.closest('.hero');
  if (!hero) return;
  const markReady = () => hero.setAttribute('data-ready', '');

  const spans = Array.from(h1.querySelectorAll('.line > span'));
  const nodes = spans.map((s) => s.firstChild);
  if (!spans.length || nodes.some((n) => !n || n.nodeType !== 3)) {
    markReady();
    return;
  }

  const finals = nodes.map((n) => n.nodeValue);
  // screen readers get the real sentence, never the cipher
  h1.setAttribute('aria-label', finals.join(' '));
  spans.forEach((s) => {
    s.setAttribute('aria-hidden', 'true');
    s.setAttribute('data-decoding', '');
  });

  const LINE_GAP = 380; // ms between lines starting to resolve
  const CHAR_GAP = 30; // ms between letters inside a line
  const JITTER = 200;
  const introUp = !!document.querySelector('.home-intro');
  const start = performance.now() + (introUp ? 1650 : 150);

  const plans = finals.map((text, li) =>
    Array.from(text).map((ch, ci) => ({
      ch,
      glyph: isGlyph(ch),
      at: li * LINE_GAP + ci * CHAR_GAP + Math.random() * JITTER,
    }))
  );
  const cache = plans.map((p) => p.map(() => randomGlyph()));

  let lastTick = 0;
  let glitched = false;
  let readied = false;

  const finish = () => {
    nodes.forEach((n, i) => {
      n.nodeValue = finals[i];
    });
    spans.forEach((s) => {
      s.removeAttribute('data-decoding');
      s.removeAttribute('data-glitch');
    });
    markReady();
    hero.setAttribute('data-scan', '');
  };

  const frame = (now) => {
    if (!h1.isConnected) return;
    const t = now - start;
    const tick = now - lastTick > 45;
    if (tick) lastTick = now;

    let pending = false;
    plans.forEach((plan, li) => {
      const out = plan
        .map((p, ci) => {
          if (!p.glyph || t >= p.at) return p.ch;
          pending = true;
          if (tick) cache[li][ci] = randomGlyph();
          return cache[li][ci];
        })
        .join('');
      if (nodes[li].nodeValue !== out) nodes[li].nodeValue = out;
    });

    if (!glitched && t >= 0) {
      glitched = true;
      spans[0].setAttribute('data-glitch', '');
      window.setTimeout(() => spans[0].removeAttribute('data-glitch'), 720);
    }
    if (!readied && t >= 900) {
      readied = true;
      markReady();
    }

    if (pending) requestAnimationFrame(frame);
    else finish();
  };

  // paint the corrupted state immediately, then wait for the intro to clear
  frame(performance.now());
  window.setTimeout(markReady, (introUp ? 1650 : 150) + 3500); // safety net
}

/* ------------------------------------------------------------------ */
/* Build on scroll                                                     */
/* ------------------------------------------------------------------ */
export function initMotion() {
  if (typeof window === 'undefined') return;

  // Always open at the top: no restored scroll position (this is what could drop you at the bottom)
  if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

  if (!('MutationObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.documentElement.classList.add('motion-ready');

  const seen = new WeakSet();
  const pinged = new WeakSet();
  const items = new Map(); // element -> { kind, delay, gateAt, p }
  const pending = new Set();
  const pings = new Set();

  const update = (now = performance.now()) => {
    const vh = window.innerHeight || 800;
    // End-of-page rule: near the bottom there is no more scrolling left to "pay" for the
    // last pieces (footer icons etc.), so the build catches up and finishes on its own.
    const maxScroll = Math.max(0, document.documentElement.scrollHeight - vh);
    const remaining = maxScroll - (window.scrollY || 0);
    const nearEnd = clamp(1 - remaining / 500);
    const atEnd = remaining <= 4;
    const anchor = vh * 0.9 + nearEnd * 1200; // a piece starts building when its top passes 90% of the screen

    // read phase (no writes in between: no layout thrash)
    const reads = [];
    pending.forEach((el) => {
      if (!el.isConnected) {
        pending.delete(el);
        items.delete(el);
        return;
      }
      reads.push([el, items.get(el), el.getBoundingClientRect().top]);
    });
    pings.forEach((el) => {
      if (!el.isConnected) pings.delete(el);
      else if (el.getBoundingClientRect().top < vh * 0.85) {
        el.setAttribute('data-ping-in', '');
        pings.delete(el);
      }
    });

    // write phase
    let timed = false;
    for (const [el, it, top] of reads) {
      const gate = clamp((now - it.gateAt) / GATE_MS);
      if (gate < 1) timed = true;
      let p = Math.min(clamp((anchor - top - it.delay) / RANGE[it.kind]), gate);
      if (atEnd && top < vh + 80) p = gate; // at the very bottom: everything on screen is complete
      p = Math.max(p, it.p); // never un-builds
      if (p === it.p) continue;
      it.p = p;
      const shown = it.kind === 'fade' ? p : easeOut(p);
      el.style.setProperty('--p', shown.toFixed(3));
      if (p >= 1) {
        el.setAttribute('data-done', '');
        pending.delete(el);
      }
    }
    if (timed) requestAnimationFrame(update);
  };

  let queued = false;
  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame((t) => {
      queued = false;
      update(t);
    });
  };

  const scan = () => {
    document.querySelectorAll('.hero h1').forEach((h1) => {
      if (seen.has(h1)) return;
      seen.add(h1);
      decodeHero(h1);
    });

    const introUp = !!document.querySelector('.home-intro');
    const t0 = performance.now() + (introUp ? 1900 : 0);
    let added = false;

    // today's cell is built like every other cell, and ALSO pings once it is on screen
    // (the calendar's "today" ping is switched off: the calendar is static now)
    document.querySelectorAll('.cal-day.is-today').forEach((el) => {
      if (pinged.has(el)) return;
      pinged.add(el);
      added = true;
    });

    for (const def of PIECES) {
      document.querySelectorAll(def.sel).forEach((el) => {
        if (seen.has(el)) return;
        if (el.closest(STATIC)) return; // these sections show up with no animation
        seen.add(el);
        const idx = el.parentElement ? Array.from(el.parentElement.children).indexOf(el) : 0;
        const n = def.mod ? idx % def.mod : idx;
        const delay = (def.after || 0) + n * (def.step || 0);
        items.set(el, { kind: def.kind, delay, gateAt: t0 + delay * 1.6, p: 0 });
        el.setAttribute('data-build', def.kind);
        el.style.setProperty('--p', '0'); // hidden before the very first paint
        pending.add(el);
        added = true;
      });
    }
    if (added) schedule();
  };

  scan();
  // route changes and month switches insert new nodes: build those too
  new MutationObserver(scan).observe(document.getElementById('root') || document.body, {
    childList: true,
    subtree: true,
  });

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  window.addEventListener('load', schedule);
  // safety net: images/fonts can move things without a scroll event
  window.setInterval(() => {
    if (pending.size && !document.hidden) schedule();
  }, 500);
}
