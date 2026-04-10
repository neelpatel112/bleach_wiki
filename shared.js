// ══════════════════════════════════════════════════════════════
//  BLEACH — Shared Engine
//  shared.js  (TypeScript-grade ES2022 JS)
//  Author: Neel Patel
// ══════════════════════════════════════════════════════════════
"use strict";

// ── TYPE INTERFACES (JSDoc) ──────────────────────────────────
/**
 * @typedef {{ x:number, y:number, vx:number, vy:number, r:number, alpha:number, phase:number, color:string }} Particle
 */

// ── BOOTSTRAP ───────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  Cursor.init();
  Navbar.init();
  Hamburger.init();
  ScrollReveal.init();

  const canvas = /** @type {HTMLCanvasElement|null} */ (document.getElementById("heroParticles"));
  if (canvas) Particles.init(canvas);
});

// ═══════════════════════════════════════════════════════════════
//  CURSOR MODULE
// ═══════════════════════════════════════════════════════════════
const Cursor = (() => {
  let orbX = 0, orbY = 0;
  let glowX = 0, glowY = 0;
  let mx = 0, my = 0;

  function init() {
    const orb  = /** @type {HTMLElement|null} */ (document.getElementById("cursorOrb"));
    const glow = /** @type {HTMLElement|null} */ (document.getElementById("cursorGlow"));
    if (!orb || !glow) return;

    document.addEventListener("mousemove", (e) => { mx = e.clientX; my = e.clientY; });

    // Expand on interactive elements
    document.querySelectorAll("a, button, .faction-card, .char-card, .gallery-item").forEach(el => {
      el.addEventListener("mouseenter", () => orb.classList.add("expanded"));
      el.addEventListener("mouseleave", () => orb.classList.remove("expanded"));
    });

    const tick = () => {
      orbX  += (mx - orbX)  * 0.18;
      orbY  += (my - orbY)  * 0.18;
      glowX += (mx - glowX) * 0.06;
      glowY += (my - glowY) * 0.06;
      orb.style.left  = `${orbX}px`;
      orb.style.top   = `${orbY}px`;
      glow.style.left = `${glowX}px`;
      glow.style.top  = `${glowY}px`;
      requestAnimationFrame(tick);
    };
    tick();
  }

  return { init };
})();

// ═══════════════════════════════════════════════════════════════
//  NAVBAR MODULE
// ═══════════════════════════════════════════════════════════════
const Navbar = (() => {
  function init() {
    const nav = document.getElementById("navbar");
    if (!nav) return;
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
  return { init };
})();

// ═══════════════════════════════════════════════════════════════
//  HAMBURGER MODULE
// ═══════════════════════════════════════════════════════════════
const Hamburger = (() => {
  function init() {
    const btn  = document.getElementById("hamburger");
    const menu = document.getElementById("mobileMenu");
    if (!btn || !menu) return;

    btn.addEventListener("click", () => {
      btn.classList.toggle("open");
      menu.classList.toggle("open");
    });
    menu.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        btn.classList.remove("open");
        menu.classList.remove("open");
      });
    });
  }
  return { init };
})();

// ═══════════════════════════════════════════════════════════════
//  SCROLL REVEAL MODULE (IntersectionObserver)
// ═══════════════════════════════════════════════════════════════
const ScrollReveal = (() => {
  function init() {
    const els = document.querySelectorAll(".reveal");
    if (!els.length) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -60px 0px" });

    els.forEach(el => io.observe(el));
  }
  return { init };
})();

// ═══════════════════════════════════════════════════════════════
//  PARTICLES MODULE (canvas)
// ═══════════════════════════════════════════════════════════════
const Particles = (() => {
  /** @type {string[]} */
  const COLORS = [
    "rgba(201,168,76,",
    "rgba(74,144,226,",
    "rgba(240,208,128,",
    "rgba(255,255,255,",
  ];

  /**
   * @param {HTMLCanvasElement} canvas
   */
  function init(canvas) {
    const ctx = /** @type {CanvasRenderingContext2D} */ (canvas.getContext("2d"));
    let W = 0, H = 0;

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth  || window.innerWidth;
      H = canvas.height = canvas.offsetHeight || window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const COUNT = 70;
    /** @type {Particle[]} */
    const particles = Array.from({ length: COUNT }, () => makeParticle(W, H));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) {
        p.phase += 0.018;
        const a = p.alpha * (0.55 + 0.45 * Math.sin(p.phase));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + a + ")";
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;

        if (p.y < -8)       Object.assign(p, makeParticle(W, H), { y: H + 8 });
        if (p.x < -8)       p.x = W + 8;
        if (p.x > W + 8)    p.x = -8;
      }
      requestAnimationFrame(draw);
    };
    draw();
  }

  /**
   * @param {number} W @param {number} H
   * @returns {Particle}
   */
  function makeParticle(W, H) {
    return {
      x:     Math.random() * W,
      y:     Math.random() * H,
      vx:    (Math.random() - 0.5) * 0.25,
      vy:    -(Math.random() * 0.45 + 0.08),
      r:     Math.random() * 1.8 + 0.3,
      alpha: Math.random() * 0.55 + 0.08,
      phase: Math.random() * Math.PI * 2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    };
  }

  return { init };
})();

// ── CONSOLE SIGNATURE ────────────────────────────────────────
console.log(
  "%cBLEACH · Soul Society Archives\n%cBuilt by Neel Patel · neelpatel112",
  "color:#c9a84c;font-size:1.1rem;font-weight:bold;font-family:serif;",
  "color:#9090b0;font-size:.8rem;"
);
 