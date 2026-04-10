// ══════════════════════════════════════════════════════════════
//  home.js — Homepage scripts
//  Author: Neel Patel
// ══════════════════════════════════════════════════════════════
"use strict";

/** @type {{ text:string, author:string }[]} */
const QUOTES = [
  { text: "Fear is necessary for evolution. The fear that one could be destroyed at any moment.", author: "Sōsuke Aizen" },
  { text: "If I were rain, that joins the sky and the earth that otherwise never touch, could I join two hearts as well?", author: "Orihime Inoue" },
  { text: "Sanity? Sorry, I don't remember having such a thing to begin with.", author: "Kenpachi Zaraki" },
  { text: "The difference in our power is the difference in our experience of battle.", author: "Byakuya Kuchiki" },
  { text: "I see. So you resolved yourself. But can that resolution overcome despair?", author: "Ulquiorra Cifer" },
  { text: "We are taught that to protect, one must have something to protect. But I have nothing left to protect.", author: "Ulquiorra Cifer" },
  { text: "I am the wind itself. Strike me, and you strike nothing.", author: "Coyote Stark" },
  { text: "What is left when you strip away all emotion, all reason, all attachment? Only the soul — and its power.", author: "Yhwach" },
];

document.addEventListener("DOMContentLoaded", () => {
  QuoteRotator.init();
});

const QuoteRotator = (() => {
  let current = 0;

  function init() {
    const text   = document.getElementById("quoteText");
    const author = document.getElementById("quoteAuthor");
    const dots   = document.getElementById("qsDots");
    if (!text || !author || !dots) return;

    // Build dots
    QUOTES.forEach((_, i) => {
      const d = document.createElement("span");
      d.className = "qs-dot" + (i === 0 ? " active" : "");
      d.addEventListener("click", () => showQuote(i));
      dots.appendChild(d);
    });

    setInterval(() => showQuote((current + 1) % QUOTES.length), 5500);
  }

  function showQuote(idx) {
    const text   = /** @type {HTMLElement} */ (document.getElementById("quoteText"));
    const author = /** @type {HTMLElement} */ (document.getElementById("quoteAuthor"));
    const dotEls = document.querySelectorAll(".qs-dot");

    text.style.opacity   = "0";
    author.style.opacity = "0";

    setTimeout(() => {
      const q = QUOTES[idx];
      text.textContent   = q.text;
      author.textContent = `— ${q.author}`;
      text.style.opacity   = "1";
      author.style.opacity = "1";
      dotEls.forEach((d, i) => d.classList.toggle("active", i === idx));
      current = idx;
    }, 420);
  }

  return { init };
})();
 