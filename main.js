// ══════════════════════════════════════════════════════════════
//  BLEACH — Soul Society Archives
//  main.js — Pure TypeScript-style JavaScript (ES2022)
//  Author: Neel Patel
// ══════════════════════════════════════════════════════════════

"use strict";

// ── TYPE-ANNOTATED DATA LAYER ────────────────────────────────

/** @typedef {{ name: string, title: string, rank: string, ability: string, tag: string, icon: string, img: string }} Character */

/** @type {Character[]} */
const GOTEI_13 = [
  { name: "Ichigo Kurosaki", title: "Substitute Soul Reaper", rank: "Sub-Reaper", ability: "Hollowification, Final Getsuga Tenshō, True Zanpakutō", tag: "Protagonist", icon: "⚡", img: "images/gotei/ichigo.jpg" },
  { name: "Genryūsai Yamamoto", title: "Captain-Commander", rank: "1st Division", ability: "Ryūjin Jakka — Zanka no Tachi, the oldest and strongest fire Zanpakutō", tag: "Captain", icon: "🔥", img: "images/gotei/yamamoto.jpg" },
  { name: "Suì-Fēng", title: "Captain, 2nd Division", rank: "2nd Division", ability: "Suzumebachi — two-strike death; Jakuhō Raikōben missile Bankai", tag: "Captain", icon: "🐝", img: "images/gotei/suifeng.jpg" },
  { name: "Ichimaru Gin", title: "Former Captain", rank: "3rd Division", ability: "Shinsō Kamishini no Yari — 13 km flash-extension blade coated in Hogyoku poison", tag: "Ex-Captain", icon: "🐍", img: "images/gotei/gin.jpg" },
  { name: "Retsu Unohana", title: "Captain, 4th Division", rank: "4th Division", ability: "Minazuki — healing Zanpakutō; true nature: Kenpachi, the first", tag: "Captain", icon: "🌸", img: "images/gotei/unohana.jpg" },
  { name: "Sōsuke Aizen", title: "Former Captain", rank: "5th Division", ability: "Kyōka Suigetsu — complete hypnosis; Hogyoku transcendence", tag: "Villain", icon: "✦", img: "images/gotei/aizen.jpg" },
  { name: "Byakuya Kuchiki", title: "Captain, 6th Division", rank: "6th Division", ability: "Senbonzakura — thousand-blade cherry blossom Bankai", tag: "Captain", icon: "🌸", img: "images/gotei/byakuya.jpg" },
  { name: "Sajin Komamura", title: "Captain, 7th Division", rank: "7th Division", ability: "Kokujō Tengen Myō'ō — colossal warrior Bankai", tag: "Captain", icon: "🐺", img: "images/gotei/komamura.jpg" },
  { name: "Shunsui Kyōraku", title: "Captain-Commander", rank: "8th Division", ability: "Katen Kyōkotsu — reality-bending game-based Zanpakutō", tag: "Captain", icon: "🎲", img: "images/gotei/shunsui.jpg" },
  { name: "Tōshirō Hitsugaya", title: "Captain, 10th Division", rank: "10th Division", ability: "Hyōrinmaru — heaven and earth ice dragon Bankai", tag: "Captain", icon: "❄️", img: "images/gotei/hitsugaya.jpg" },
  { name: "Kenpachi Zaraki", title: "Captain, 11th Division", rank: "11th Division", ability: "Nozarashi — raw reiatsu amplification; wounds himself to grow stronger", tag: "Captain", icon: "⚔", img: "images/gotei/kenpachi.jpg" },
  { name: "Mayuri Kurotsuchi", title: "Captain, 12th Division", rank: "12th Division", ability: "Ashisogi Jizō — paralyzing Zanpakutō; scientist of Soul Society", tag: "Captain", icon: "⚗", img: "images/gotei/mayuri.jpg" },
  { name: "Jūshirō Ukitake", title: "Captain, 13th Division", rank: "13th Division", ability: "Sōgyo no Kotowari — twin blades that absorb and redirect energy", tag: "Captain", icon: "☁️", img: "images/gotei/ukitake.jpg" },
];

/** @type {Character[]} */
const ESPADA = [
  { name: "Sōsuke Aizen", title: "Leader of Hueco Mundo", rank: "Overlord", ability: "Kyōka Suigetsu — supreme hypnosis; Hogyoku god-form transcendence", tag: "Villain", icon: "✦", img: "images/espada/aizen.jpg" },
  { name: "Coyote Stark", title: "Primera Espada", rank: "Espada #1", ability: "Cero Metralleta — infinite Ceros from wolves split from his own soul", tag: "Espada", icon: "🐺", img: "images/espada/stark.jpg" },
  { name: "Baraggan Louisenbairn", title: "Segunda Espada", rank: "Espada #2", ability: "Arrogante — Respira, the breath of death that ages everything to dust", tag: "Espada", icon: "💀", img: "images/espada/baraggan.jpg" },
  { name: "Tier Harribel", title: "Tercera Espada", rank: "Espada #3", ability: "Tiburón — water and blood manipulation, shark Resurreción", tag: "Espada", icon: "🦈", img: "images/espada/harribel.jpg" },
  { name: "Ulquiorra Cifer", title: "Cuarta Espada", rank: "Espada #4", ability: "Murciélago — Segunda Etapa, the only Espada with a second Resurreción form", tag: "Espada", icon: "🦇", img: "images/espada/ulquiorra.jpg" },
  { name: "Nnoitra Gilga", title: "Quinta Espada", rank: "Espada #5", ability: "Santa Teresa — six-armed scythe form, near-impenetrable hierro", tag: "Espada", icon: "🌙", img: "images/espada/nnoitra.jpg" },
  { name: "Grimmjow Jaegerjaquez", title: "Sexta Espada", rank: "Espada #6", ability: "Pantera — lightning speed, destructive Desgarrón claw attack", tag: "Espada", icon: "🐆", img: "images/espada/grimmjow.jpg" },
  { name: "Zommari Rureaux", title: "Séptima Espada", rank: "Espada #7", ability: "Brujería — 50 eyes of soul possession; fastest Sonído user", tag: "Espada", icon: "👁", img: "images/espada/zommari.jpg" },
  { name: "Szayelaporro Granz", title: "Octava Espada", rank: "Espada #8", ability: "Fornicaras — body-puppet control, self-reincarnation through hosts", tag: "Espada", icon: "🧬", img: "images/espada/szayelaporro.jpg" },
  { name: "Aaroniero Arruruerie", title: "Novena Espada", rank: "Espada #9", ability: "Glotonería — absorption of all Hollows and their powers", tag: "Espada", icon: "🌑", img: "images/espada/aaroniero.jpg" },
];

/** @type {Character[]} */
const STERNRITTERS = [
  { name: "Yhwach", title: "Emperor of Wandenreich", rank: "His Majesty", ability: "Almighty — foresight and modification of all futures; Auswählen", tag: "Emperor", icon: "👑", img: "images/sternritters/yhwach.jpg" },
  { name: "Jugram Haschwalth", title: "Grand Master", rank: "Sternritter 'B'", ability: "The Balance — misfortune redistribution; becomes Almighty at night", tag: "Grand Master", icon: "⚖", img: "images/sternritters/haschwalth.jpg" },
  { name: "Uryū Ishida", title: "Yhwach's Successor", rank: "Sternritter 'A'", ability: "The Antithesis — fate reversal between two targets", tag: "Sternritter", icon: "✦", img: "images/sternritters/uryu.jpg" },
  { name: "Bazz-B", title: "Sternritter", rank: "Sternritter 'H'", ability: "The Heat — finger-based fire attacks, scales with injury", tag: "Sternritter", icon: "🔥", img: "images/sternritters/bazzb.jpg" },
  { name: "NaNaNa Najahkoop", title: "Sternritter", rank: "Sternritter 'U'", ability: "The Underbelly — pressure map of spiritual power weaknesses", tag: "Sternritter", icon: "🔱", img: "images/sternritters/nanana.jpg" },
  { name: "Äs Nödt", title: "Sternritter", rank: "Sternritter 'F'", ability: "The Fear — injects thorns of pure fear into victims' souls", tag: "Sternritter", icon: "🕸", img: "images/sternritters/asnödt.jpg" },
  { name: "BG9", title: "Sternritter", rank: "Sternritter 'K'", ability: "The Killer — mechanical body with multiple weapon systems", tag: "Sternritter", icon: "🤖", img: "images/sternritters/bg9.jpg" },
  { name: "Cang Du", title: "Sternritter", rank: "Sternritter 'I'", ability: "The Iron — steel-hard skin that deflects reiatsu attacks", tag: "Sternritter", icon: "🛡", img: "images/sternritters/cangdu.jpg" },
  { name: "Liltotto Lamperd", title: "Sternritter", rank: "Sternritter 'G'", ability: "The Glutton — giant mouth capable of consuming anything", tag: "Sternritter", icon: "👄", img: "images/sternritters/liltotto.jpg" },
  { name: "Giselle Gewelle", title: "Sternritter", rank: "Sternritter 'Z'", ability: "The Zombie — blood-zombie reanimation of corpses and Shinigami", tag: "Sternritter", icon: "🧟", img: "images/sternritters/giselle.jpg" },
  { name: "Candice Catnipp", title: "Sternritter", rank: "Sternritter 'T'", ability: "The Thunderbolt — lightning goddess with massive electric volleys", tag: "Sternritter", icon: "⚡", img: "images/sternritters/candice.jpg" },
  { name: "Pernida Parnkgjas", title: "Sternritter", rank: "Sternritter 'C'", ability: "The Compulsory — nerves control the structure of anything touched", tag: "Sternritter", icon: "🖐", img: "images/sternritters/pernida.jpg" },
];

// ── ROTATING QUOTES ──────────────────────────────────────────
/** @type {{ text: string, author: string }[]} */
const QUOTES = [
  { text: "Fear is necessary for evolution. The fear that one could be destroyed at any moment.", author: "Sōsuke Aizen" },
  { text: "I see. So you resolved yourself. But can that resolution overcome despair?", author: "Ulquiorra Cifer" },
  { text: "Sanity? Sorry, I don't remember having such a thing to begin with.", author: "Kenpachi Zaraki" },
  { text: "How can you move forward when you keep regretting the past?", author: "Erza Scarlet" },
  { text: "If I were rain, that joins the sky and earth that otherwise never touch, could I join two hearts as well?", author: "Orihime Inoue" },
  { text: "The difference in our power is the difference in our experience of battle.", author: "Byakuya Kuchiki" },
  { text: "I am the wind itself. Strike me, and you strike nothing.", author: "Coyote Stark" },
  { text: "We are taught that to protect, one must have something to protect. But I have nothing to protect.", author: "Ulquiorra Cifer" },
];

// ═══════════════════════════════════════════════════════════════
//  INIT ON DOM READY
// ═══════════════════════════════════════════════════════════════
document.addEventListener("DOMContentLoaded", () => {
  initCursorGlow();
  initNavbar();
  initHamburger();
  initParticles();
  injectCharacterCards("goteiGrid",   GOTEI_13,     "gotei-section");
  injectCharacterCards("espadaGrid",  ESPADA,       "espada-section");
  injectCharacterCards("sternGrid",   STERNRITTERS, "stern-section");
  initScrollReveal();
  initActiveNavLinks();
  initRotatingQuotes();
  tryLoadGalleryImages();
  initGalleryLightbox();
});

// ═══════════════════════════════════════════════════════════════
//  CURSOR GLOW
// ═══════════════════════════════════════════════════════════════
function initCursorGlow() {
  const glow = /** @type {HTMLElement} */ (document.getElementById("cursorGlow"));
  if (!glow) return;
  let mx = 0, my = 0, cx = 0, cy = 0;

  document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
  });

  const animate = () => {
    cx += (mx - cx) * 0.08;
    cy += (my - cy) * 0.08;
    glow.style.left = `${cx}px`;
    glow.style.top  = `${cy}px`;
    requestAnimationFrame(animate);
  };
  animate();
}

// ═══════════════════════════════════════════════════════════════
//  NAVBAR SCROLL
// ═══════════════════════════════════════════════════════════════
function initNavbar() {
  const nav = document.getElementById("navbar");
  if (!nav) return;
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 40);
  }, { passive: true });
}

// ═══════════════════════════════════════════════════════════════
//  HAMBURGER MENU
// ═══════════════════════════════════════════════════════════════
function initHamburger() {
  const btn  = document.getElementById("hamburger");
  const menu = document.getElementById("mobileMenu");
  if (!btn || !menu) return;

  btn.addEventListener("click", () => {
    menu.classList.toggle("open");
  });

  menu.querySelectorAll(".mobile-link").forEach(link => {
    link.addEventListener("click", () => menu.classList.remove("open"));
  });
}

// ═══════════════════════════════════════════════════════════════
//  PARTICLE CANVAS
// ═══════════════════════════════════════════════════════════════
function initParticles() {
  const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("particlesCanvas"));
  if (!canvas) return;
  const ctx = /** @type {CanvasRenderingContext2D} */ (canvas.getContext("2d"));

  const resize = () => {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener("resize", resize, { passive: true });

  /** @typedef {{ x: number, y: number, vx: number, vy: number, size: number, opacity: number, pulse: number }} Particle */

  const COUNT = 60;
  /** @type {Particle[]} */
  const particles = Array.from({ length: COUNT }, () => ({
    x:       Math.random() * canvas.width,
    y:       Math.random() * canvas.height,
    vx:      (Math.random() - 0.5) * 0.3,
    vy:      -Math.random() * 0.5 - 0.1,
    size:    Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.5 + 0.1,
    pulse:   Math.random() * Math.PI * 2,
  }));

  const COLORS = ["#c9a84c", "#4a90e2", "#ffffff", "#a0a8c0"];

  const tick = (time = 0) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
      p.pulse += 0.02;
      const alpha = p.opacity * (0.6 + 0.4 * Math.sin(p.pulse));
      const color = COLORS[i % COLORS.length];

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.globalAlpha = alpha;
      ctx.fill();
      ctx.globalAlpha = 1;

      p.x += p.vx;
      p.y += p.vy;

      if (p.y < -10)  { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
      if (p.x < -10)  p.x = canvas.width + 10;
      if (p.x > canvas.width + 10) p.x = -10;
    });

    requestAnimationFrame(tick);
  };
  tick();
}

// ═══════════════════════════════════════════════════════════════
//  INJECT CHARACTER CARDS
// ═══════════════════════════════════════════════════════════════
/**
 * @param {string} gridId
 * @param {Character[]} characters
 * @param {string} sectionClass
 */
function injectCharacterCards(gridId, characters, sectionClass) {
  const grid = document.getElementById(gridId);
  if (!grid) return;

  characters.forEach((char, idx) => {
    const card = document.createElement("div");
    card.className = "char-card";
    card.style.setProperty("animation-delay", `${idx * 0.06}s`);
    card.style.setProperty("animation-fill-mode", "both");

    card.innerHTML = `
      <div class="card-img-wrap">
        ${char.img
          ? `<img src="${char.img}" alt="${char.name}" loading="lazy"
               onerror="this.parentElement.innerHTML='<div class=\\'card-placeholder\\'><span class=\\'card-ph-icon\\'>${char.icon}</span><span class=\\'card-ph-hint\\'>Add image</span></div>'" />`
          : `<div class="card-placeholder"><span class="card-ph-icon">${char.icon}</span><span class="card-ph-hint">Add image</span></div>`
        }
        <span class="card-rank-badge">${char.rank}</span>
      </div>
      <div class="card-body">
        <div class="card-name">${char.name}</div>
        <div class="card-title">${char.title}</div>
        <div class="card-ability">${char.ability}</div>
        <span class="card-tag">${char.tag}</span>
      </div>
    `;

    grid.appendChild(card);
  });
}

// ═══════════════════════════════════════════════════════════════
//  SCROLL REVEAL (IntersectionObserver)
// ═══════════════════════════════════════════════════════════════
function initScrollReveal() {
  const targets = document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -60px 0px" });

  targets.forEach(el => observer.observe(el));
}

// ═══════════════════════════════════════════════════════════════
//  ACTIVE NAV LINKS (scroll spy)
// ═══════════════════════════════════════════════════════════════
function initActiveNavLinks() {
  const sections = ["home", "gotei13", "espada", "sternritters"];
  const links    = /** @type {NodeListOf<HTMLElement>} */ (document.querySelectorAll(".nav-link[data-section]"));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        links.forEach(link => {
          link.classList.toggle("active", link.dataset.section === id);
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
}

// ═══════════════════════════════════════════════════════════════
//  ROTATING QUOTES
// ═══════════════════════════════════════════════════════════════
function initRotatingQuotes() {
  const quoteEl  = document.getElementById("rotatingQuote");
  const authorEl = document.getElementById("quoteAuthor");
  if (!quoteEl || !authorEl) return;

  let index = 0;

  const show = () => {
    quoteEl.style.opacity  = "0";
    authorEl.style.opacity = "0";

    setTimeout(() => {
      const q = QUOTES[index % QUOTES.length];
      quoteEl.textContent  = q.text;
      authorEl.textContent = `— ${q.author}`;
      quoteEl.style.opacity  = "1";
      authorEl.style.opacity = "1";
      index++;
    }, 500);
  };

  quoteEl.style.transition  = "opacity 0.5s ease";
  authorEl.style.transition = "opacity 0.5s ease";

  setInterval(show, 5000);
}

// ═══════════════════════════════════════════════════════════════
//  TRY LOADING GALLERY IMAGES
// ═══════════════════════════════════════════════════════════════
function tryLoadGalleryImages() {
  document.querySelectorAll(".gallery-placeholder[data-img]").forEach(placeholder => {
    const src = placeholder.getAttribute("data-img");
    if (!src) return;

    const img = new Image();
    img.onload = () => {
      const el = /** @type {HTMLElement} */ (placeholder);
      const imgTag = document.createElement("img");
      imgTag.src = src;
      imgTag.alt = "";
      el.insertBefore(imgTag, el.firstChild);
    };
    img.src = src;
  });
}

// ═══════════════════════════════════════════════════════════════
//  GALLERY LIGHTBOX
// ═══════════════════════════════════════════════════════════════
function initGalleryLightbox() {
  // Create lightbox
  const lb = document.createElement("div");
  lb.id = "lightbox";
  lb.style.cssText = `
    position:fixed;inset:0;z-index:99999;
    display:none;align-items:center;justify-content:center;
    background:rgba(4,4,13,0.92);
    backdrop-filter:blur(20px);cursor:pointer;
    transition:opacity 0.3s;
  `;
  lb.innerHTML = `
    <div style="max-width:90vw;max-height:90vh;position:relative;">
      <img id="lbImg" style="max-width:100%;max-height:90vh;border-radius:12px;box-shadow:0 24px 80px rgba(0,0,0,0.8);" src="" alt="" />
      <button id="lbClose" style="position:absolute;top:-16px;right:-16px;background:var(--gold);color:#000;border:none;border-radius:50%;width:32px;height:32px;font-size:1rem;cursor:pointer;display:flex;align-items:center;justify-content:center;">✕</button>
    </div>
  `;
  document.body.appendChild(lb);

  const lbImg   = /** @type {HTMLImageElement} */ (document.getElementById("lbImg"));
  const lbClose = document.getElementById("lbClose");

  const open  = (src = "") => { lbImg.src = src; lb.style.display = "flex"; document.body.style.overflow = "hidden"; };
  const close = () => { lb.style.display = "none"; document.body.style.overflow = ""; };

  lb.addEventListener("click", (e) => { if (e.target === lb) close(); });
  lbClose?.addEventListener("click", close);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });

  document.querySelectorAll(".gallery-placeholder[data-img]").forEach(el => {
    el.addEventListener("click", () => {
      const src = el.getAttribute("data-img");
      if (src) open(src);
    });
  });
}

// ═══════════════════════════════════════════════════════════════
//  LOG
// ═══════════════════════════════════════════════════════════════
console.log(
  "%cBLEACH — Soul Society Archives\n%cBuilt by Neel Patel | neelpatel112",
  "color: #c9a84c; font-size: 1.2rem; font-weight: bold; font-family: serif;",
  "color: #9090b0; font-size: 0.8rem;"
);
 
