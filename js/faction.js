// ══════════════════════════════════════════════════════════════
//  BLEACH — Faction Page Engine  (fixed)
//  faction.js
//  Author: Neel Patel
// ══════════════════════════════════════════════════════════════
"use strict";

// Cards are already in the HTML — this script only handles
// scroll-reveal, page transitions, and image error fallbacks.

window.addEventListener("load", () => {
  revealCards();
  initPageTransitions();
});

// ── EXPOSE image-error handler for inline onerror attrs ──────
window.imgFallback = function(img, icon) {
  const wrap = img.closest(".card-img");
  if (!wrap) return;
  img.style.display = "none";
  const fb = document.createElement("div");
  fb.className = "card-img-fallback";
  fb.innerHTML = `<span class="cif-icon">${icon}</span>`;
  wrap.insertBefore(fb, wrap.firstChild);
};

// ── SCROLL REVEAL ────────────────────────────────────────────
function revealCards() {
  const cards = document.querySelectorAll(".char-card");
  if (!cards.length) return;

  // First make sure all cards are visible by default (no hidden state)
  cards.forEach(c => {
    c.style.opacity = "1";
    c.style.transform = "none";
  });

  // Then apply subtle staggered entrance via IntersectionObserver
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("card-visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: "0px 0px -30px 0px" });

  cards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.04}s`;
    io.observe(card);
  });
}

// ── PAGE TRANSITIONS ─────────────────────────────────────────
function initPageTransitions() {
  document.querySelectorAll("a[href]").forEach(link => {
    const href = link.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto")) return;

    link.addEventListener("click", (e) => {
      e.preventDefault();
      document.body.style.transition = "opacity .3s ease";
      document.body.style.opacity = "0";
      setTimeout(() => { window.location.href = href; }, 280);
    });
  });
}
 