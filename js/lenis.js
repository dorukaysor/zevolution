/* ═══════════════════════════════════════════════════════════
   ZEVO — Lenis Smooth Scroll
   Initialised once, exposed globally so other modules can
   pause / resume scrolling (e.g. cart drawer, mobile menu).
═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* Wait until the Lenis CDN script has loaded */
  function waitForLenis(cb) {
    if (typeof window.Lenis !== 'undefined') return cb();
    const s = document.createElement('script');
    s.src   = 'https://unpkg.com/lenis@1.3.1/dist/lenis.min.js';
    s.async = true;
    s.onload = cb;
    document.head.appendChild(s);
  }

  waitForLenis(function () {
    /* ── Instance ─────────────────────────────────────── */
    const lenis = new Lenis({
      duration:      1.15,                           // slightly over 1s — silky not sluggish
      easing:        t => 1 - Math.pow(1 - t, 4),   // ease-out-quart: quick start, graceful stop
      smoothWheel:   true,
      wheelMultiplier: 0.9,                          // slightly dampened for elegance
      smoothTouch:   false,                          // disable on touch — native feels better
      touchMultiplier: 1.5,
    });

    /* ── RAF loop ─────────────────────────────────────── */
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    /* ── Public API ────────────────────────────────────── */
    window.__lenis = lenis;

    /* Pause native scroll and Lenis (for overlays, cart drawer, etc.) */
    window.lenisStop  = function () { lenis.stop(); };

    /* Resume Lenis */
    window.lenisStart = function () { lenis.start(); };

    /* Smooth anchor scrolling – honour any href="#id" clicks */
    document.addEventListener('click', function (e) {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const id  = anchor.getAttribute('href');
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -80, duration: 1.2 });
    });

    /* Re-sync after dynamic content injection (partials load) */
    document.addEventListener('zevo:partials:loaded', function () {
      lenis.resize();
    });
  });
})();
