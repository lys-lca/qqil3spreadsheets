/**
 * flashcards.js
 * ─────────────────────────────────────────────────────────────
 * LCA ICT — Flashcard game logic.
 *
 * Interaction model
 * ─────────────────
 *   Hint button (above card) — shows hint, never flips
 *   Card itself             — display only, no click/tap/swipe
 *   "Reveal answer" button  — flips card, enables mark buttons,
 *                             becomes "Hide answer" to flip back
 *   ✓ Correct / ✗ Incorrect — only active after card is revealed
 *   ← → nav buttons        — move between cards
 *
 * Keyboard shortcuts (unchanged):
 *   Space / Enter → flip
 *   H             → show hint
 *   C             → mark correct  (only when flipped)
 *   X             → mark wrong    (only when flipped)
 *   ← →           → navigate
 *
 * Depends on: glossary-data.js (GLOSSARY, CATEGORIES), shared.js,
 *             image-utils.js (injectCardImage)
 * ─────────────────────────────────────────────────────────────
 */

// ── STATE ─────────────────────────────────────────────────────
let deck      = [];
let cursor    = 0;
let results   = {};
let hintsUsed = new Set();
let gameMode  = 'all';
let isFlipped = false;

// ── ELEMENTS ──────────────────────────────────────────────────
const el = id => document.getElementById(id);

const elSetup      = el('setup-panel');
const elGame       = el('game-area');
const elReview     = el('review-panel');
const elCatSelect  = el('cat-select');
const elSetupCount = el('setup-count');
const elBtnStart   = el('btn-start');

const elProgress   = el('progress-bar');
const elCounter    = el('status-counter');
const elScCorrect  = el('score-correct');
const elScWrong    = el('score-wrong');
const elScHints    = el('score-hints');

const elHintRow    = el('hint-row');
const elBtnHint    = el('btn-hint');
const elHintText   = el('fc-hint-text');

const elCard       = el('fc-card');
const elCatTag     = el('fc-cat-tag');
const elTypeBadge  = el('fc-type-badge');
const elTerm       = el('fc-term');
const elHintDot    = el('fc-hint-dot');
const elBackTerm   = el('fc-back-term');
const elDef        = el('fc-def');

const elBtnFlip    = el('btn-flip');
const elBtnCorrect = el('btn-correct');
const elBtnWrong   = el('btn-wrong');
const elBtnPrev    = el('btn-prev');
const elBtnNext    = el('btn-next');
const elBtnReset   = el('btn-reset');
const elBtnNew     = el('btn-new-session');

const elRevStats   = el('review-stats');
const elRevWrap    = el('review-incorrect-wrap');
const elBtnRetry   = el('btn-retry-wrong');
const elBtnNewRev  = el('btn-new-session-review');
const elBtnPrint   = el('btn-print');
const elPrintArea  = el('print-area');

// ── HELPERS ───────────────────────────────────────────────────
const shuffle = arr => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const isAcronym = card => Boolean(card.abbr);

const catMeta = card => {
  if (!card.tags?.length) return null;
  return CATEGORIES[card.tags[0]] || null;
};

// ── SETUP ─────────────────────────────────────────────────────
function buildCategorySelect() {
  Object.entries(CATEGORIES).forEach(([key, meta]) => {
    const opt = Object.assign(document.createElement('option'), {
      value: key, textContent: meta.label
    });
    elCatSelect.appendChild(opt);
  });
}

function getPool() {
  const cat = elCatSelect.value;
  return cat === 'all'
    ? [...GLOSSARY]
    : GLOSSARY.filter(c => c.tags.includes(cat));
}

function updateSetupCount() {
  const pool = getPool();
  const n = gameMode === '10' ? Math.min(10, pool.length) : pool.length;
  elSetupCount.textContent = `${n} card${n !== 1 ? 's' : ''} in selection`;
}

// ── FLIP STATE ────────────────────────────────────────────────
function setFlipped(flipped) {
  isFlipped = flipped;
  elCard.classList.toggle('flipped', flipped);

  // Flip button label
  if (flipped) {
    elBtnFlip.textContent = 'Hide answer ↑';
    elBtnFlip.classList.add('is-flipped');
  } else {
    elBtnFlip.textContent = 'Reveal answer ↓';
    elBtnFlip.classList.remove('is-flipped');
  }

  // Mark buttons only active when answer is showing
  elBtnCorrect.disabled = !flipped;
  elBtnWrong.disabled   = !flipped;
}

// ── GAME START ────────────────────────────────────────────────
function startSession(cards) {
  deck      = cards || buildDeck();
  cursor    = 0;
  results   = Object.fromEntries(deck.map((_, i) => [i, null]));
  hintsUsed = new Set();

  elSetup.classList.add('hidden');
  elReview.classList.add('hidden');
  elGame.classList.remove('hidden');

  renderCard(0);
}

function buildDeck() {
  let cards = shuffle(getPool());
  if (gameMode === '10') cards = cards.slice(0, 10);
  return cards;
}

// ── RENDER CARD ───────────────────────────────────────────────
function renderCard(idx) {
  const card = deck[idx];
  if (!card) return;

  // Always start un-flipped on a new card
  setFlipped(false);

  // Reset hint UI
  elHintText.classList.add('hidden');
  elHintText.textContent = '';
  elHintText.className   = 'fc-hint-text hidden';
  elBtnHint.textContent  = '💡 Show hint';
  elBtnHint.disabled     = false;
  elBtnHint.classList.remove('hint-revealed');

  const acronym = isAcronym(card);
  const meta    = catMeta(card);

  // ── FRONT ──
  elCatTag.textContent = meta ? meta.label : (card.tags?.[0] || '');
  if (meta) {
    elCatTag.style.color       = meta.color;
    elCatTag.style.borderColor = meta.border;
    elCatTag.style.background  = meta.bg;
  }

  elTypeBadge.textContent = acronym ? 'Acronym' : 'Term';
  elTypeBadge.className   = `fc-type-badge ${acronym ? 'type-acronym' : 'type-concept'}`;

  // Acronym cards show the abbreviation; concept cards show the full term
  elTerm.textContent = acronym ? card.abbr : card.term;

  // Hint dot — re-show if hint was already used on this card this session
  elHintDot.classList.toggle('hidden', !hintsUsed.has(idx));

  // Hide hint button if there's nothing to show
  const hasHint = acronym ? true : Boolean(card.hint);
  elBtnHint.style.display = hasHint ? '' : 'none';

  // ── BACK ──
  if (acronym) {
    elBackTerm.textContent = card.term;
    elBackTerm.classList.remove('hidden');
  } else {
    elBackTerm.textContent = '';
    elBackTerm.classList.add('hidden');
  }
  elDef.textContent = card.def;

  // ── IMAGE (back face) ──
  const elBackFace = elCard.querySelector('.fc-back');
  elBackFace.querySelectorAll('.card-img').forEach(i => i.remove());
  elBackFace.classList.remove('card-image-wrap');
  if (typeof injectCardImage === 'function') {
    injectCardImage(card, elBackFace, 'fc-card-img');
  }

  // ── MARKED STATE ──
  elCard.classList.remove('marked-correct', 'marked-wrong');
  const r = results[idx];
  if (r === 'correct') elCard.classList.add('marked-correct');
  if (r === 'wrong')   elCard.classList.add('marked-wrong');

  // ── PROGRESS ──
  elProgress.style.width = `${((idx + 1) / deck.length) * 100}%`;
  elCounter.textContent  = `${idx + 1} / ${deck.length}`;

  elBtnPrev.disabled = idx === 0;
  elBtnNext.disabled = idx === deck.length - 1;

  refreshScores();
}

function refreshScores() {
  const vals = Object.values(results);
  elScCorrect.textContent = vals.filter(v => v === 'correct').length;
  elScWrong.textContent   = vals.filter(v => v === 'wrong').length;
  elScHints.textContent   = hintsUsed.size;
}

// ── HINT ──────────────────────────────────────────────────────
function showHint() {
  const card    = deck[cursor];
  const acronym = isAcronym(card);

  hintsUsed.add(cursor);
  elHintDot.classList.remove('hidden');
  refreshScores();

  const hintText = acronym ? card.term : (card.hint || '');
  elHintText.textContent = hintText;
  elHintText.className   = `fc-hint-text${acronym ? ' hint-acronym' : ''}`;
  elHintText.classList.remove('hidden');

  // Replace button with a non-interactive indicator
  elBtnHint.textContent = '💡 Hint shown';
  elBtnHint.classList.add('hint-revealed');
  elBtnHint.disabled = true;
}

// ── NAVIGATION ────────────────────────────────────────────────
function goTo(idx) {
  if (idx < 0 || idx >= deck.length) return;
  cursor = idx;
  renderCard(cursor);
}

function advance() {
  if (cursor < deck.length - 1) {
    goTo(cursor + 1);
  } else {
    const anyUnmarked = Object.values(results).some(v => v === null);
    if (!anyUnmarked) showReview();
  }
}

// ── MARK ──────────────────────────────────────────────────────
function markCard(result) {
  if (!isFlipped) return; // safety — shouldn't be reachable since buttons are disabled

  results[cursor] = result;
  refreshScores();

  elCard.classList.remove('marked-correct', 'marked-wrong');
  void elCard.offsetWidth; // reflow
  elCard.classList.add(result === 'correct' ? 'marked-correct' : 'marked-wrong');

  setTimeout(() => {
    if (cursor < deck.length - 1) {
      advance();
    } else {
      showReview();
    }
  }, 350);
}

// ── RESET / NEW SESSION ───────────────────────────────────────
function resetScores() {
  Object.keys(results).forEach(k => { results[k] = null; });
  hintsUsed.clear();
  renderCard(cursor);
}

function backToSetup() {
  elGame.classList.add('hidden');
  elReview.classList.add('hidden');
  elSetup.classList.remove('hidden');
  updateSetupCount();
}

// ── REVIEW ────────────────────────────────────────────────────
function showReview() {
  elGame.classList.add('hidden');
  elReview.classList.remove('hidden');

  const total   = deck.length;
  const correct = Object.values(results).filter(v => v === 'correct').length;
  const wrong   = Object.values(results).filter(v => v === 'wrong').length;
  const hints   = hintsUsed.size;
  const pct     = total > 0 ? Math.round((correct / total) * 100) : 0;

  elRevStats.innerHTML = `
    <div class="stat-item stat-correct"><strong>${correct}</strong>Correct</div>
    <div class="stat-item stat-wrong"><strong>${wrong}</strong>Incorrect</div>
    <div class="stat-item stat-hints"><strong>${hints}</strong>Hints Used</div>
    <div class="stat-item stat-pct"><strong>${pct}%</strong>Score</div>
  `;

  const wrongIndices = Object.entries(results)
    .filter(([, v]) => v === 'wrong')
    .map(([i]) => Number(i));

  elRevWrap.innerHTML = '';

  if (wrongIndices.length === 0) {
    elRevWrap.innerHTML = `
      <p style="text-align:center;color:var(--text-muted);font-family:var(--mono);
                font-size:13px;padding:1.5rem 0;">
        🎉 No incorrect cards — perfect score!
      </p>`;
    elBtnRetry.disabled = true;
    elBtnRetry.style.opacity = '0.35';
    elBtnPrint.disabled = true;
    elBtnPrint.style.opacity = '0.35';
    return;
  }

  elBtnRetry.disabled = false;
  elBtnRetry.style.opacity = '';
  elBtnPrint.disabled = false;
  elBtnPrint.style.opacity = '';

  const titleEl = document.createElement('h3');
  titleEl.className = 'review-section-title';
  titleEl.innerHTML = `
    Review Incorrect
    <span class="review-badge review-badge-wrong">${wrongIndices.length}</span>
  `;
  elRevWrap.appendChild(titleEl);

  const cardsWrap = document.createElement('div');
  cardsWrap.className = 'review-cards';

  wrongIndices.forEach(idx => {
    const card      = deck[idx];
    const acronym   = isAcronym(card);
    const hintShown = hintsUsed.has(idx);

    const div = document.createElement('div');
    div.className = `review-card${hintShown ? ' hint-used' : ''}`;
    div.innerHTML = `
      <div class="review-card-header">
        <span class="review-card-term">${acronym ? card.abbr : card.term}</span>
        <span class="review-card-meta">
          ${acronym ? `<span class="review-card-abbr">${card.abbr}</span>` : ''}
          ${hintShown ? `<span class="review-hint-flag">💡 hint used</span>` : ''}
        </span>
      </div>
      ${acronym
        ? `<div style="font-family:var(--display);font-size:0.9rem;font-weight:700;
                       color:var(--accent);margin-bottom:0.35rem;">${card.term}</div>`
        : ''}
      <div class="review-card-def">${card.def}</div>
    `;
    cardsWrap.appendChild(div);
  });

  elRevWrap.appendChild(cardsWrap);
}

// ── PRINT ─────────────────────────────────────────────────────
function printIncorrect() {
  const wrongIndices = Object.entries(results)
    .filter(([, v]) => v === 'wrong')
    .map(([i]) => Number(i));

  if (!wrongIndices.length) return;

  const now     = new Date().toLocaleDateString('en-IE', { day: 'numeric', month: 'long', year: 'numeric' });
  const catName = elCatSelect.options[elCatSelect.selectedIndex]?.text || 'All Categories';
  const n       = wrongIndices.length;

  const cardsHtml = wrongIndices.map(idx => {
    const card      = deck[idx];
    const acronym   = isAcronym(card);
    const hintShown = hintsUsed.has(idx);

    return `
      <div class="print-card${hintShown ? ' hint-used' : ''}">
        <div class="print-card-term">
          ${acronym ? card.abbr : card.term}
        </div>
        ${acronym ? `<div class="print-card-abbr">Stands for: ${card.term}</div>` : ''}
        ${hintShown ? `<div class="print-card-hint-used">💡 Hint was used during session</div>` : ''}
        <div class="print-card-def">${card.def}</div>
      </div>`;
  }).join('');

  elPrintArea.innerHTML = `
    <div class="print-title">LCA ICT — Flashcard Review</div>
    <div class="print-subtitle">
      Incorrect cards · ${catName} · ${now} · ${n} card${n !== 1 ? 's' : ''}
      ${hintsUsed.size ? ` · ${hintsUsed.size} hint${hintsUsed.size !== 1 ? 's' : ''} used (orange border)` : ''}
    </div>
    <div class="print-cards">${cardsHtml}</div>
  `;

  window.print();
}

// ── KEYBOARD ──────────────────────────────────────────────────
document.addEventListener('keydown', e => {
  if (elGame.classList.contains('hidden')) return;

  switch (e.key) {
    case ' ':
    case 'Enter':
      e.preventDefault();
      setFlipped(!isFlipped);
      break;
    case 'ArrowRight':
    case 'ArrowDown':
      e.preventDefault();
      advance();
      break;
    case 'ArrowLeft':
    case 'ArrowUp':
      e.preventDefault();
      goTo(cursor - 1);
      break;
    case 'h':
    case 'H':
      if (!elBtnHint.disabled) showHint();
      break;
    case 'c':
    case 'C':
      if (isFlipped) markCard('correct');
      break;
    case 'x':
    case 'X':
      if (isFlipped) markCard('wrong');
      break;
  }
});

// ── INIT ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {

  buildCategorySelect();
  updateSetupCount();

  // Setup controls
  elCatSelect.addEventListener('change', updateSetupCount);

  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      gameMode = btn.dataset.mode;
      updateSetupCount();
    });
  });

  elBtnStart.addEventListener('click', () => startSession());

  // Hint — button only, no card interaction
  elBtnHint.addEventListener('click', () => {
    if (!elBtnHint.disabled) showHint();
  });

  // Flip button — the only way to flip the card
  elBtnFlip.addEventListener('click', () => setFlipped(!isFlipped));

  // Mark buttons — disabled until card is revealed
  elBtnCorrect.addEventListener('click', () => markCard('correct'));
  elBtnWrong.addEventListener('click',   () => markCard('wrong'));

  // Navigation
  elBtnPrev.addEventListener('click', () => goTo(cursor - 1));
  elBtnNext.addEventListener('click', () => advance());

  // Session controls
  elBtnReset.addEventListener('click', resetScores);
  elBtnNew.addEventListener('click',   backToSetup);

  // Review actions
  elBtnRetry.addEventListener('click', () => {
    const wrongCards = Object.entries(results)
      .filter(([, v]) => v === 'wrong')
      .map(([i]) => deck[Number(i)]);
    if (wrongCards.length) startSession(shuffle(wrongCards));
  });

  elBtnNewRev.addEventListener('click', backToSetup);
  elBtnPrint.addEventListener('click',  printIncorrect);
});