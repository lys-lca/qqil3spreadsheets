/**
 * memory.js
 * ─────────────────────────────────────────────────────────────
 * LCA ICT — Memory Game
 *
 * Modes
 * ─────
 *   Simple  — cards shown face-up in study phase, then
 *             shuffled and hidden when student presses
 *             "Shuffle & Hide". Timer starts at that point.
 *   Complex — cards hidden from the start. Timer starts
 *             immediately when game begins.
 *
 * Each pair: one WORD card + one DEFINITION card.
 * Cards are matched when both cards in a pair are flipped.
 * Wrong pair: brief red flash, then both flip back after 1s.
 * Matched pair: stay face-up, highlighted in a distinct colour.
 *
 * Mobile: auto-caps at 8 pairs.
 *
 * Completion: full revision summary (term + full name + def).
 *
 * Depends on: glossary-data.js (GLOSSARY, CATEGORIES), shared.js
 * ─────────────────────────────────────────────────────────────
 */

// ── MATCH COLOURS ─────────────────────────────────────────────
const MATCH_COLORS = [
  '#16a34a', // green
  '#2563eb', // blue
  '#9333ea', // purple
  '#ea580c', // orange
  '#0891b2', // cyan
  '#be123c', // rose
  '#ca8a04', // amber
  '#0d9488', // teal
  '#7c3aed', // violet
  '#b45309', // amber-dark
];

// ── STATE ─────────────────────────────────────────────────────
let gameState = null;
/*
  gameState = {
    pairs          : [{ entry, word, pairId, colorIdx }],
    cards          : [{ id, pairId, type:'word'|'def', el }],
    flipped        : [],   // indices of currently face-up unmatched cards (max 2)
    matched        : Set,  // pairIds that have been matched
    moves          : number,
    timerInterval  : id,
    elapsed        : seconds,
    locked         : bool, // true while wrong-pair animation plays
    gameMode       : 'simple'|'complex',
  }
*/

let pairCount = 8;
let gameMode  = 'simple';

// ── ELEMENTS ──────────────────────────────────────────────────
const el = id => document.getElementById(id);

const elSetup      = el('setup-panel');
const elStudy      = el('study-phase');
const elGame       = el('game-area');
const elCompletion = el('completion-panel');
const elCatSelect  = el('cat-select');
const elSetupCount = el('setup-count');
const elBtnStart   = el('btn-start');
const elBtnHide    = el('btn-hide');
const elStudyGrid  = el('study-grid');
const elGameGrid   = el('game-grid');
const elTimer      = el('timer-display');
const elMoves      = el('moves-display');
const elPairsFound = el('pairs-found');
const elPairsTotal = el('pairs-total');
const elBtnNewGame = el('btn-new-game');
const elCompStats  = el('completion-stats');
const elCompSum    = el('completion-summary');
const elBtnAgain   = el('btn-play-again');
const elBtnChange  = el('btn-change-settings');

// ── HELPERS ───────────────────────────────────────────────────
const isMobile = () => window.innerWidth <= 700;

const shuffle = arr => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

/** Derive the display word for an entry (same logic as flashcards) */
const entryWord = entry =>
  entry.abbr ? entry.abbr : entry.term;

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
    : GLOSSARY.filter(e => e.tags.includes(cat));
}

function getEffectivePairCount() {
  // Cap at 8 on mobile
  return isMobile() ? Math.min(pairCount, 8) : pairCount;
}

function updateSetupCount() {
  const n = getPool().length;
  const cap = getEffectivePairCount();
  elSetupCount.textContent = `${n} pairs available`;
  elBtnStart.disabled = n < cap;
}

// ── GRID LAYOUT CALCULATION ───────────────────────────────────
/**
 * Returns { cols, cardHeight } for a grid of `total` cards.
 * Tries to keep cards roughly square-ish and fill the viewport.
 */
function calcLayout(total) {
  const vw = Math.min(window.innerWidth - 48, 1060);

  // Choose columns: prefer even number, wider cards on desktop
  let cols;
  if (vw > 800)       cols = total <= 12 ? 4 : 5;
  else if (vw > 500)  cols = total <= 12 ? 4 : 4;
  else                cols = total <= 12 ? 3 : 4;

  // Ensure cols divides evenly or add 1
  while (total % cols !== 0 && cols > 2) cols--;

  const gap     = 10; // px
  const cardW   = Math.floor((vw - gap * (cols - 1)) / cols);
  const cardH   = Math.min(Math.max(cardW * 0.75, 90), 150);

  return { cols, cardW, cardH };
}

// ── BUILD PAIRS ───────────────────────────────────────────────
function buildPairs(entries, count) {
  const selected = shuffle(entries).slice(0, count);
  return selected.map((entry, idx) => ({
    entry,
    word:     entryWord(entry),
    pairId:   idx,
    colorIdx: idx % MATCH_COLORS.length,
  }));
}

// ── RENDER A SINGLE CARD ELEMENT ──────────────────────────────
function createCardEl(card, faceUpForStudy = false) {
  const { id, pairId, type, pair } = card;

  const wrapper = document.createElement('div');
  wrapper.className    = 'mem-card';
  wrapper.dataset.id   = id;
  wrapper.dataset.pair = pairId;
  if (faceUpForStudy) wrapper.classList.add('study-visible');

  const inner = document.createElement('div');
  inner.className = 'mem-card-inner';

  // Back face (what you see when card is hidden)
  const back = document.createElement('div');
  back.className = 'mem-card-face mem-card-back';
  const pattern = document.createElement('div');
  pattern.className   = 'card-back-pattern';
  pattern.textContent = '? ? ?';
  back.appendChild(pattern);

  // Front face (the content)
  const front = document.createElement('div');
  front.className = `mem-card-face mem-card-front type-${type}`;

  if (type === 'word') {
    const label = document.createElement('div');
    label.className   = 'mem-word-label';
    label.textContent = pair.entry.abbr ? 'Abbreviation' : 'Term';

    const text = document.createElement('div');
    text.className   = 'mem-word-text';
    text.textContent = pair.word;

    front.appendChild(label);
    front.appendChild(text);
  } else {
    const label = document.createElement('div');
    label.className   = 'mem-def-label';
    label.textContent = 'Definition';

    const text = document.createElement('div');
    text.className   = 'mem-def-text';
    text.textContent = pair.entry.def;

    front.appendChild(label);
    front.appendChild(text);
  }

  inner.appendChild(back);
  inner.appendChild(front);
  wrapper.appendChild(inner);

  return wrapper;
}

// ── RENDER GRID ───────────────────────────────────────────────
function renderGrid(gridEl, cards, faceUp = false) {
  const total  = cards.length;
  const layout = calcLayout(total);

  gridEl.style.gridTemplateColumns = `repeat(${layout.cols}, 1fr)`;
  gridEl.style.gap                 = '0.65rem';
  gridEl.innerHTML = '';

  cards.forEach(card => {
    const cardEl = createCardEl(card, faceUp);
    cardEl.style.height = `${layout.cardH}px`;

    if (faceUp) {
      // Study phase — show front immediately
      cardEl.classList.add('flipped');
    } else {
      // Game phase — add click handler
      cardEl.addEventListener('click', () => onCardClick(card.id));
    }

    card.el = cardEl;
    gridEl.appendChild(cardEl);
  });
}

// ── CARD CLICK ────────────────────────────────────────────────
function onCardClick(cardId) {
  if (!gameState || gameState.locked) return;

  const card = gameState.cards.find(c => c.id === cardId);
  if (!card) return;

  // Ignore already matched or already flipped cards
  if (gameState.matched.has(card.pairId)) return;
  if (gameState.flipped.includes(cardId)) return;
  if (gameState.flipped.length >= 2) return;

  // Flip the card
  card.el.classList.add('flipped');
  gameState.flipped.push(cardId);

  if (gameState.flipped.length === 2) {
    gameState.moves++;
    elMoves.textContent = gameState.moves;
    checkMatch();
  }
}

// ── CHECK MATCH ───────────────────────────────────────────────
function checkMatch() {
  const [id1, id2] = gameState.flipped;
  const c1 = gameState.cards.find(c => c.id === id1);
  const c2 = gameState.cards.find(c => c.id === id2);

  if (c1.pairId === c2.pairId) {
    // ── MATCH ──
    const color = MATCH_COLORS[c1.pair.colorIdx];

    // Small delay so the second card finishes flipping before highlight
    setTimeout(() => {
      [c1, c2].forEach(c => {
        c.el.classList.add('matched');
        c.el.style.setProperty('--match-color', color);
        c.el.removeEventListener('click', () => onCardClick(c.id));
      });

      gameState.matched.add(c1.pairId);
      gameState.flipped = [];

      const found = gameState.matched.size;
      elPairsFound.textContent = found;

      if (found === gameState.pairs.length) {
        setTimeout(showCompletion, 500);
      }
    }, 300);

  } else {
    // ── NO MATCH — red flash then flip back ──
    gameState.locked = true;

    setTimeout(() => {
      [c1, c2].forEach(c => c.el.classList.add('wrong'));
    }, 100);

    setTimeout(() => {
      [c1, c2].forEach(c => {
        c.el.classList.remove('wrong', 'flipped');
      });
      gameState.flipped = [];
      gameState.locked  = false;
    }, 1100);
  }
}

// ── TIMER ─────────────────────────────────────────────────────
function startTimer() {
  gameState.elapsed = 0;
  elTimer.textContent = '0:00';
  gameState.timerInterval = setInterval(() => {
    gameState.elapsed++;
    const m = Math.floor(gameState.elapsed / 60);
    const s = gameState.elapsed % 60;
    elTimer.textContent = `${m}:${s.toString().padStart(2, '0')}`;
  }, 1000);
}

function stopTimer() {
  clearInterval(gameState?.timerInterval);
}

function formatTime(secs) {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

// ── COMPLETION ────────────────────────────────────────────────
function showCompletion() {
  stopTimer();
  elGame.classList.add('hidden');
  elCompletion.classList.remove('hidden');

  elCompStats.innerHTML = `
    <div class="completion-stat">
      <strong>${gameState.pairs.length}</strong>pairs matched
    </div>
    <div class="completion-stat">
      <strong>${gameState.moves}</strong>moves taken
    </div>
    <div class="completion-stat">
      <strong>${formatTime(gameState.elapsed)}</strong>time taken
    </div>
  `;

  // Revision summary
  const titleEl = document.createElement('h3');
  titleEl.className   = 'summary-title';
  titleEl.textContent = 'Pairs & Definitions — Revision Summary';

  const listEl = document.createElement('div');
  listEl.className = 'summary-list';

  gameState.pairs.forEach(({ entry, word }) => {
    const card = document.createElement('div');
    card.className = 'summary-card';

    const hasFullTerm = entry.abbr && entry.term !== entry.abbr;
    card.innerHTML = `
      <div class="summary-word">${word}</div>
      ${hasFullTerm ? `<div class="summary-full">${entry.term}</div>` : ''}
      <div class="summary-def">${entry.def}</div>
    `;
    listEl.appendChild(card);
  });

  elCompSum.innerHTML = '';
  elCompSum.appendChild(titleEl);
  elCompSum.appendChild(listEl);
}

// ── START SESSION ─────────────────────────────────────────────
function startSession() {
  const pool       = getPool();
  const effectiveN = getEffectivePairCount();
  if (pool.length < effectiveN) return;

  const pairs = buildPairs(pool, effectiveN);

  // Build card objects: one word card + one def card per pair
  const cards = [];
  let cardId  = 0;

  pairs.forEach(pair => {
    cards.push({ id: cardId++, pairId: pair.pairId, type: 'word', pair, el: null });
    cards.push({ id: cardId++, pairId: pair.pairId, type: 'def',  pair, el: null });
  });

  const shuffledCards = shuffle(cards);

  gameState = {
    pairs,
    cards:         shuffledCards,
    flipped:       [],
    matched:       new Set(),
    moves:         0,
    timerInterval: null,
    elapsed:       0,
    locked:        false,
    gameMode,
  };

  elSetup.classList.add('hidden');
  elCompletion.classList.add('hidden');
  elMoves.textContent      = '0';
  elTimer.textContent      = '0:00';
  elPairsFound.textContent = '0';
  elPairsTotal.textContent = pairs.length;

  if (gameMode === 'simple') {
    // ── SIMPLE: show study phase first ──
    elStudy.classList.remove('hidden');
    elGame.classList.add('hidden');

    // Render face-up in study grid (cards in pair order, not shuffled, for easier study)
    const studyCards = [];
    pairs.forEach(pair => {
      studyCards.push({ id: -1, pairId: pair.pairId, type: 'word', pair, el: null });
      studyCards.push({ id: -2, pairId: pair.pairId, type: 'def',  pair, el: null });
    });

    renderGrid(elStudyGrid, studyCards, true);

  } else {
    // ── COMPLEX: straight to game ──
    elStudy.classList.add('hidden');
    elGame.classList.remove('hidden');
    renderGrid(elGameGrid, shuffledCards, false);
    startTimer();
  }
}

// ── SHUFFLE & HIDE (Simple mode) ──────────────────────────────
function shuffleAndHide() {
  elStudy.classList.add('hidden');
  elGame.classList.remove('hidden');

  // Cards are already built in gameState — render shuffled into game grid
  renderGrid(elGameGrid, gameState.cards, false);
  startTimer();
}

// ── NEW GAME (same settings) ───────────────────────────────────
function newGame() {
  stopTimer();
  elStudy.classList.add('hidden');
  elGame.classList.add('hidden');
  elStudyGrid.innerHTML = '';
  elGameGrid.innerHTML  = '';
  startSession();
}

// ── BACK TO SETUP ─────────────────────────────────────────────
function backToSetup() {
  stopTimer();
  elStudy.classList.add('hidden');
  elGame.classList.add('hidden');
  elCompletion.classList.add('hidden');
  elStudyGrid.innerHTML = '';
  elGameGrid.innerHTML  = '';
  elSetup.classList.remove('hidden');
  updateSetupCount();
}

// ── INIT ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {

  buildCategorySelect();
  updateSetupCount();

  // Category
  elCatSelect.addEventListener('change', updateSetupCount);

  // Pair count
  document.querySelectorAll('.count-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.count-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      pairCount = parseInt(btn.dataset.count);
      updateSetupCount();
    });
  });

  // Mode toggle
  document.querySelectorAll('[data-mode]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-mode]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      gameMode = btn.dataset.mode;
    });
  });

  // Start
  elBtnStart.addEventListener('click', startSession);

  // Shuffle & hide (simple mode)
  elBtnHide.addEventListener('click', shuffleAndHide);

  // New game
  elBtnNewGame.addEventListener('click', newGame);

  // Completion
  elBtnAgain.addEventListener('click', () => {
    elCompletion.classList.add('hidden');
    startSession();
  });

  elBtnChange.addEventListener('click', backToSetup);

  // Handle resize (recalculate mobile cap)
  window.addEventListener('resize', updateSetupCount);
});
