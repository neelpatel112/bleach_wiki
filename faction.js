// ══════════════════════════════════════════════════════════════
//  BLEACH — Faction Page Engine
//  faction.js  (TypeScript-grade ES2022)
//  Author: Neel Patel
// ══════════════════════════════════════════════════════════════
"use strict";

// ── TYPE DEFINITIONS (JSDoc) ─────────────────────────────────

/**
 * @typedef {{
 *   name:         string,
 *   rank:         string,
 *   division:     string,
 *   img:          string,
 *   icon:         string,
 *   bankai?:      string,
 *   resurreccion?: string,
 *   schrift?:     string,
 *   ability:      string,
 *   quote:        string
 * }} Character
 */

/**
 * @typedef {{
 *   name:       string,
 *   accentVar:  string,
 *   characters: Character[]
 * }} FactionData
 */

// ── BOOTSTRAP ────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  const data = /** @type {FactionData|undefined} */ (window.FACTION_DATA);
  if (!data) { console.error("[Faction] No FACTION_DATA found on window."); return; }

  CardRenderer.render(data);
  ScrollReveal.initCards();
  PageTransition.init();
});

// ═══════════════════════════════════════════════════════════════
//  CARD RENDERER
// ═══════════════════════════════════════════════════════════════
const CardRenderer = (() => {

  /**
   * @param {FactionData} data
   */
  function render(data) {
    const grid = document.getElementById("charGrid");
    if (!grid) return;

    data.characters.forEach((char, idx) => {
      const card = buildCard(char, data.name, idx);
      grid.appendChild(card);
    });
  }

  /**
   * @param {Character} char
   * @param {string}    faction
   * @param {number}    idx
   * @returns {HTMLElement}
   */
  function buildCard(char, faction, idx) {
    const card = document.createElement("article");
    card.className = "char-card";
    card.style.animationDelay = `${idx * 0.07}s`;

    // ── Power label ───────────────────────────────────────────
    let powerType = "Ability";
    let powerNote = "";
    if (faction === "gotei" && char.bankai) {
      powerType = "Bankai";
      powerNote = `<span class="card-power-sub">${char.bankai}</span>`;
    } else if (faction === "espada" && char.resurreccion) {
      powerType = "Resurreccion";
      powerNote = `<span class="card-power-sub">${char.resurreccion}</span>`;
    } else if (faction === "stern" && char.schrift) {
      powerType = `Schrift: ${char.schrift}`;
    }

    // ── Schrift badge (Sternritters only) ─────────────────────
    const schriftBadge = (faction === "stern" && char.schrift)
      ? `<span class="schrift-badge">${char.schrift}</span>`
      : "";

    // ── Rank badge text ───────────────────────────────────────
    const badgeText = char.division || char.rank;

    card.innerHTML = `
      <div class="card-img" id="cardImg${idx}">
        <img
          src="${char.img}"
          alt="${char.name}"
          loading="lazy"
          onerror="CardRenderer.handleImgError(this, '${escapeAttr(char.icon)}')"
        />
        ${schriftBadge}
        <span class="card-badge">${escapeHTML(badgeText)}</span>
      </div>

      <div class="card-body">
        <span class="card-division">${escapeHTML(char.division || char.rank)}</span>
        <h3 class="card-name">${escapeHTML(char.name)}</h3>
        <p class="card-rank">${escapeHTML(char.rank)}</p>

        <div class="card-divider"></div>

        <span class="card-power-label">${escapeHTML(powerType)}</span>
        ${powerNote}
        <p class="card-ability">${escapeHTML(char.ability)}</p>

        <blockquote class="card-quote">${char.quote}</blockquote>
      </div>
    `;

    // Hover cursor expansion
    card.addEventListener("mouseenter", () => {
      document.getElementById("cursorOrb")?.classList.add("expanded");
    });
    card.addEventListener("mouseleave", () => {
      document.getElementById("cursorOrb")?.classList.remove("expanded");
    });

    return card;
  }

  /**
   * Fallback when image 404s — swap to icon placeholder
   * @param {HTMLImageElement} img
   * @param {string} icon
   */
  function handleImgError(img, icon) {
    const wrap = img.parentElement;
    if (!wrap) return;
    img.remove();
    const fallback = document.createElement("div");
    fallback.className = "card-img-fallback";
    fallback.innerHTML = `
      <span class="cif-icon">${icon}</span>
      <span class="cif-hint">Add image to folder</span>
    `;
    // Keep badges if any
    wrap.insertBefore(fallback, wrap.firstChild);
  }

  /** @param {string} s @returns {string} */
  function escapeHTML(s) {
    return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
  }
  /** @param {string} s @returns {string} */
  function escapeAttr(s) { return s.replace(/'/g,"\\'"); }

  return { render, handleImgError };
})();

// Expose for onerror inline handler
window.CardRenderer = CardRenderer;

// ═══════════════════════════════════════════════════════════════
//  CARD SCROLL REVEAL (staggered IntersectionObserver)
// ═══════════════════════════════════════════════════════════════
const ScrollReveal = (() => {
  function initCards() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("card-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06, rootMargin: "0px 0px -40px 0px" });

    document.querySelectorAll(".char-card").forEach(card => io.observe(card));
  }
  return { initCards };
})();

// ═══════════════════════════════════════════════════════════════
//  PAGE TRANSITION (fade-in on load)
// ═══════════════════════════════════════════════════════════════
const PageTransition = (() => {
  function init() {
    // Inject page-enter CSS once
    if (!document.getElementById("ptStyle")) {
      const s = document.createElement("style");
      s.id = "ptStyle";
      s.textContent = `
        body { animation: pageEnter .6s cubic-bezier(.25,.8,.25,1) both; }
        @keyframes pageEnter { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:none} }
        .char-card { opacity:0; transform:translateY(28px); transition:opacity .55s cubic-bezier(.25,.8,.25,1),transform .55s cubic-bezier(.25,.8,.25,1); }
        .char-card.card-visible { opacity:1; transform:none; }
        .card-power-sub { display:block;font-family:'Cinzel',serif;font-size:.75rem;color:var(--faction-color);letter-spacing:.08em;margin-bottom:10px;opacity:.8; }
      `;
      document.head.appendChild(s);
    }

    // Intercept nav links for smooth transition out
    document.querySelectorAll("a[href]").forEach(link => {
      const href = link.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("http")) return;

      link.addEventListener("click", (e) => {
        e.preventDefault();
        document.body.style.animation = "pageLeave .35s cubic-bezier(.4,0,1,1) forwards";

        if (!document.getElementById("leaveStyle")) {
          const s = document.createElement("style");
          s.id = "leaveStyle";
          s.textContent = `@keyframes pageLeave{to{opacity:0;transform:translateY(-8px)}}`;
          document.head.appendChild(s);
        }

        setTimeout(() => { window.location.href = href; }, 330);
      });
    });
  }
  return { init };
})();
 