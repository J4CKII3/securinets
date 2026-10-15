// 3D depth layer for the Securinets site. Pairs with src/styles/motion.css.
//
// Real browser 3D (CSS perspective + transforms), no WebGL, no dependencies, fully static.
//   - hero: layers at different depths react to the mouse and to scrolling
//   - cards/tiles: tilt toward the pointer with a moving light glare
//   - photo strips: curved 3D gallery (centre faces you, edges turn away)
// JS only writes CSS variables / transforms on existing elements that React never styles,
// so no component, text, colour or layout changes. Skipped for prefers-reduced-motion.

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

/* ------------------------------------------------------------------ */
/* Tilt + glare on cards and tiles (fine pointers only)                */
/* ------------------------------------------------------------------ */
const TILT = [
  ['.field-tile', 9],
  ['.friendly-ctf-card', 3.2],
  ['.board-wrap', 3.2],
];

function initTilt() {
  let current = null;
  const reset = (el) => {
    ['--rx', '--ry', '--mx', '--my'].forEach((p) => el.style.removeProperty(p));
  };

  document.addEventListener(
    'pointermove',
    (e) => {
      if (e.pointerType !== 'mouse') return;
      let hit = null;
      let max = 0;
      const target = e.target instanceof Element ? e.target : null;
      if (target) {
        for (const [sel, m] of TILT) {
          const el = target.closest(sel);
          if (el) {
            hit = el;
            max = m;
            break;
          }
        }
      }
      if (hit !== current) {
        if (current) reset(current);
        current = hit;
      }
      if (!hit) return;
      const r = hit.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const x = clamp((e.clientX - r.left) / r.width);
      const y = clamp((e.clientY - r.top) / r.height);
      hit.style.setProperty('--rx', ((0.5 - y) * 2 * max).toFixed(2) + 'deg');
      hit.style.setProperty('--ry', ((x - 0.5) * 2 * max).toFixed(2) + 'deg');
      hit.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
      hit.style.setProperty('--my', (y * 100).toFixed(1) + '%');
    },
    { passive: true }
  );

  document.documentElement.addEventListener('mouseleave', () => {
    if (current) reset(current);
    current = null;
  });
}

/* ------------------------------------------------------------------ */
/* Hero: depth layers follow the mouse and the scroll                  */
/* ------------------------------------------------------------------ */
function initHero(finePointer) {
  const st = { tx: 0, ty: 0, x: 0, y: 0 };
  let running = false;
  let lastScroll = -1;

  const loop = () => {
    const hero = document.querySelector('.hero');
    if (!hero) {
      running = false;
      return;
    }
    const sy = window.scrollY || 0;
    if (sy > hero.offsetHeight * 1.1) {
      running = false; // hero is off screen: sleep
      return;
    }
    st.x += (st.tx - st.x) * 0.07;
    st.y += (st.ty - st.y) * 0.07;
    hero.style.setProperty('--hx', st.x.toFixed(4));
    hero.style.setProperty('--hy', st.y.toFixed(4));
    hero.style.setProperty('--hs', String(Math.round(sy)));

    const settled = Math.abs(st.tx - st.x) < 0.001 && Math.abs(st.ty - st.y) < 0.001;
    if (settled && sy === lastScroll) {
      running = false;
      return;
    }
    lastScroll = sy;
    requestAnimationFrame(loop);
  };

  const kick = () => {
    if (running) return;
    running = true;
    requestAnimationFrame(loop);
  };

  if (finePointer) {
    window.addEventListener(
      'pointermove',
      (e) => {
        if (e.pointerType !== 'mouse') return;
        st.tx = (e.clientX / (window.innerWidth || 1)) * 2 - 1;
        st.ty = (e.clientY / (window.innerHeight || 1)) * 2 - 1;
        kick();
      },
      { passive: true }
    );
    document.documentElement.addEventListener('mouseleave', () => {
      st.tx = 0;
      st.ty = 0;
      kick();
    });
  }
  window.addEventListener('scroll', kick, { passive: true });
  // the hero is inserted by React after this runs, and again on every visit to Home
  new MutationObserver(kick).observe(document.getElementById('root') || document.body, {
    childList: true,
    subtree: true,
  });
  kick();
}

/* ------------------------------------------------------------------ */
/* Photo strips: curved 3D gallery                                     */
/* ------------------------------------------------------------------ */
function initPano() {
  const tick = () => {
    let any = false;
    const vh = window.innerHeight || 800;
    document.querySelectorAll('.pano').forEach((strip) => {
      const sr = strip.getBoundingClientRect();
      if (sr.bottom < 0 || sr.top > vh || !sr.width) return;
      any = true;
      const cx = sr.left + sr.width / 2;
      const half = sr.width / 2;
      const items = Array.from(strip.querySelectorAll('.pano-item'));
      // read all, then write all
      const ts = items.map((it) => {
        const r = it.getBoundingClientRect();
        return (r.left + r.width / 2 - cx) / half;
      });
      // gentler curve on narrow screens so photos stay big and readable
      const k = clamp(sr.width / 1000, 0.35, 1);
      items.forEach((it, i) => {
        if (Math.abs(ts[i]) > 2.4) return; // far off screen: leave it alone
        const t = clamp(ts[i], -1.2, 1.2);
        const a = Math.abs(t);
        it.style.transform = `perspective(900px) rotateY(${(-t * 28 * k).toFixed(2)}deg) translateZ(${(-a * 110 * k).toFixed(1)}px)`;
        it.style.opacity = (1 - a * a * 0.3 * k).toFixed(3);
      });
    });
    if (any) requestAnimationFrame(tick);
    else window.setTimeout(tick, 250); // nothing on screen: check again shortly
  };
  tick();
}

export function initDepth() {
  if (typeof window === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  document.documentElement.classList.add('depth-ready');
  // card tilt is switched off on purpose (calendar, categories, scoreboard stay still)
  initHero(finePointer);
  initPano();
}
