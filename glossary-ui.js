/**
 * glossary-ui.js
 * ─────────────────────────────────────────────────────────────
 * LCA ICT Glossary — UI logic: filtering, searching, sorting,
 * alphabet navigation and card rendering.
 *
 * Theme / nav handled by shared.js (loaded before this file).
 * Depends on: glossary-data.js (GLOSSARY, CATEGORIES)
 * ─────────────────────────────────────────────────────────────
 */

// ── STATE ─────────────────────────────────────────────────────
let sortAZ        = true;
let currentFilter = 'all';
let currentSearch = '';
let currentAlpha  = null;

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

// ── FILTER & SORT ─────────────────────────────────────────────
function getFilteredTerms() {
  let terms = [...GLOSSARY];

  terms.sort((a, b) =>
    sortAZ ? a.term.localeCompare(b.term) : b.term.localeCompare(a.term)
  );

  if (currentFilter !== 'all') {
    terms = terms.filter(t => t.tags.includes(currentFilter));
  }

  if (currentSearch) {
    const q = currentSearch.toLowerCase();
    terms = terms.filter(t =>
      t.term.toLowerCase().includes(q) ||
      (t.abbr && t.abbr.toLowerCase().includes(q)) ||
      t.def.toLowerCase().includes(q)
    );
  }

  if (currentAlpha) {
    terms = terms.filter(t => t.term[0].toUpperCase() === currentAlpha);
  }

  return terms;
}

// ── HIGHLIGHT ─────────────────────────────────────────────────
function highlight(text, query) {
  if (!query) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`(${escaped})`, 'gi');
  return text.replace(re, '<mark>$1</mark>');
}

// ── ALPHABET NAV ──────────────────────────────────────────────
function renderAlphaNav(terms) {
  const nav  = document.getElementById('alpha-nav');
  const used = new Set(terms.map(t => t.term[0].toUpperCase()));

  nav.innerHTML = ALPHABET.map(l => {
    let cls = 'alpha-btn';
    if (!used.has(l)) {
      cls += ' no-items';
    } else {
      cls += ' has-items';
      if (l === currentAlpha) cls += ' active';
    }
    return `<button class="${cls}" data-alpha="${l}" ${!used.has(l) ? 'disabled' : ''}>${l}</button>`;
  }).join('');

  nav.querySelectorAll('.alpha-btn.has-items').forEach(btn => {
    btn.addEventListener('click', () => {
      const l = btn.dataset.alpha;
      currentAlpha = (currentAlpha === l) ? null : l;
      render();
    });
  });
}

// ── CARDS ─────────────────────────────────────────────────────
function renderCards(terms) {
  const container = document.getElementById('glossary-container');
  const noResults = document.getElementById('no-results');

  if (terms.length === 0) {
    container.innerHTML = '';
    noResults.style.display = 'block';
    document.getElementById('visible-count').textContent = 0;
    return;
  }

  noResults.style.display = 'none';

  const grouped = {};
  terms.forEach(t => {
    const l = t.term[0].toUpperCase();
    if (!grouped[l]) grouped[l] = [];
    grouped[l].push(t);
  });

  const letters = Object.keys(grouped).sort(
    sortAZ ? undefined : (a, b) => b.localeCompare(a)
  );

  let html = '';
  letters.forEach(letter => {
    const group = grouped[letter];
    html += `
      <div class="alpha-section" id="section-${letter}">
        <div class="alpha-header">
          <span class="alpha-letter">${letter}</span>
          <div class="alpha-line"></div>
          <span class="alpha-count">${group.length} term${group.length !== 1 ? 's' : ''}</span>
        </div>
        <div class="cards-grid">`;

    group.forEach((item, i) => {
      const termHl     = highlight(item.term, currentSearch);
      const defHl      = highlight(item.def,  currentSearch);
      const abbrHl     = item.abbr ? highlight(item.abbr, currentSearch) : null;
      const tagsHtml   = item.tags
        .map(tag => `<span class="tag ${tag}">${CATEGORIES[tag]?.label ?? tag}</span>`)
        .join('');
      // Store GLOSSARY index so the post-render pass can look up the card object
      const glossaryIdx = GLOSSARY.indexOf(item);

      html += `
        <div class="card" style="animation-delay:${i * 0.03}s"
             data-glossary-idx="${glossaryIdx}">
          <div class="card-head">
            <span class="card-term">${termHl}</span>
            ${item.abbr ? `<span class="card-abbr">${abbrHl}</span>` : ''}
          </div>
          <p class="card-def">${defHl}</p>
          <div class="card-tags">${tagsHtml}</div>
        </div>`;
    });

    html += `</div></div>`;
  });

  container.innerHTML = html;
  document.getElementById('visible-count').textContent = terms.length;

  // ── POST-RENDER: inject images where available ──
  // image-utils.js may not be loaded on all pages — guard with typeof check
  if (typeof injectCardImage === 'function') {
    container.querySelectorAll('.card[data-glossary-idx]').forEach(cardEl => {
      const idx  = parseInt(cardEl.dataset.glossaryIdx, 10);
      const item = GLOSSARY[idx];
      if (item) injectCardImage(item, cardEl);
    });
  }
}

// ── MAIN RENDER ───────────────────────────────────────────────
function render() {
  const terms = getFilteredTerms();
  renderAlphaNav(terms);
  renderCards(terms);
}

// ── FILTER BUTTONS ────────────────────────────────────────────
function buildFilterButtons() {
  const container = document.getElementById('filter-btns');
  if (!container) return;

  Object.entries(CATEGORIES).forEach(([key, meta]) => {
    const btn = document.createElement('button');
    btn.className      = 'filter-btn';
    btn.dataset.filter = key;
    btn.textContent    = meta.label;
    container.appendChild(btn);
  });

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      currentAlpha  = null;
      render();
    });
  });
}

// ── INIT ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {

  document.getElementById('total-count').textContent = GLOSSARY.length;
  document.getElementById('cat-count').textContent   = Object.keys(CATEGORIES).length;

  buildFilterButtons();

  const searchInput = document.getElementById('search');
  searchInput.addEventListener('input', () => {
    currentSearch = searchInput.value.trim();
    currentAlpha  = null;
    render();
  });

  const sortBtn = document.getElementById('sort-toggle');
  sortBtn.addEventListener('click', () => {
    sortAZ = !sortAZ;
    sortBtn.textContent = sortAZ ? 'A→Z ↕' : 'Z→A ↕';
    render();
  });

  render();
});
