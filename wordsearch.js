/**
 * wordsearch.js
 * ─────────────────────────────────────────────────────────────
 * LCA ICT — Dynamic Wordsearch
 *
 * Word selection
 *   Only entries where searchable !== false are eligible.
 *   Word used: abbr (if set and no slash), else term with
 *   punctuation stripped. Max 15 chars.
 *
 * Grid generation
 *   Attempts to place each word up to MAX_PLACE_ATTEMPTS times.
 *   If a word cannot be placed it is swapped for another.
 *   Remaining cells filled with random letters.
 *
 * Interaction
 *   Click/tap first cell → click/tap last cell in the word.
 *   Correct: word highlighted, clue ticked, word revealed (def mode).
 *   Wrong:   brief red flash, selection cleared.
 *
 * Depends on: glossary-data.js (GLOSSARY, CATEGORIES), shared.js
 * ─────────────────────────────────────────────────────────────
 */

// ── CONSTANTS ─────────────────────────────────────────────────
const MAX_WORD_LEN       = 15;
const MAX_PLACE_ATTEMPTS = 100;
const FILL_CHARS         = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

// Directions: [rowDelta, colDelta]
const DIR_SIMPLE  = [[0,1],[1,0]];
const DIR_COMPLEX = [[0,1],[1,0],[1,1],[1,-1],[0,-1],[-1,0],[-1,-1],[-1,1]];

// ── STATE ─────────────────────────────────────────────────────
let gameState = null;
/*
  gameState = {
    words        : [{ word, entry, row, col, dr, dc, colorIdx, found }],
    grid         : 2D array of chars,
    gridSize     : number,
    clueMode     : 'word' | 'definition',
    dirMode      : 'simple' | 'complex',
    selectStart  : { row, col } | null,
    timerInterval: id,
    elapsed      : seconds,
    foundCount   : number,
  }
*/

// ── ELEMENT REFS ──────────────────────────────────────────────
const el = id => document.getElementById(id);

const elSetup      = el('setup-panel');
const elGame       = el('game-area');
const elCompletion = el('completion-panel');
const elCatSelect  = el('cat-select');
const elSetupCount = el('setup-count');
const elBtnStart   = el('btn-start');
const elTimer      = el('timer-display');
const elFoundCount = el('found-count');
const elTotalCount = el('total-count');
const elBtnNewGame = el('btn-new-game');
const elGrid       = el('ws-grid');
const elCluesList  = el('clues-list');
const elCluesTitle = el('clues-title');
const elCompStats  = el('completion-stats');
const elCompWords  = el('completion-words');
const elBtnAgain   = el('btn-play-again');
const elBtnChange  = el('btn-change-settings');

let wordCount = 12;
let clueMode  = 'word';
let dirMode   = 'simple';

// ── SETUP ─────────────────────────────────────────────────────
function buildCategorySelect() {
  Object.entries(CATEGORIES).forEach(([key, meta]) => {
    const opt = Object.assign(document.createElement('option'), {
      value: key, textContent: meta.label
    });
    elCatSelect.appendChild(opt);
  });
}

/** Derive the search word for an entry */
function entryWord(entry) {
  if (entry.abbr && !entry.abbr.includes('/')) {
    return entry.abbr.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
  }
  return entry.term.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
}

/** Return eligible entries for the current category */
function getEligibleEntries() {
  const cat = elCatSelect.value;
  let pool = cat === 'all' ? [...GLOSSARY] : GLOSSARY.filter(e => e.tags.includes(cat));
  return pool.filter(e => {
    if (e.searchable === false) return false;
    const w = entryWord(e);
    return w.length >= 2 && w.length <= MAX_WORD_LEN;
  });
}

function updateSetupCount() {
  const n = getEligibleEntries().length;
  elSetupCount.textContent = `${n} word${n !== 1 ? 's' : ''} available`;
  elBtnStart.disabled = n < wordCount;
}

// ── SHUFFLE ───────────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── GRID GENERATION ───────────────────────────────────────────
function calcGridSize(words) {
  const longest = Math.max(...words.map(w => w.length));
  // Base: longest word + 4, scaled up for more words
  const base = Math.max(longest + 4, Math.ceil(Math.sqrt(words.join('').length * 2.2)));
  return Math.min(Math.max(base, 12), 24); // clamp 12–24
}

function buildGrid(size) {
  return Array.from({ length: size }, () => new Array(size).fill(''));
}

function canPlace(grid, word, row, col, dr, dc) {
  const size = grid.length;
  for (let i = 0; i < word.length; i++) {
    const r = row + dr * i;
    const c = col + dc * i;
    if (r < 0 || r >= size || c < 0 || c >= size) return false;
    if (grid[r][c] !== '' && grid[r][c] !== word[i]) return false;
  }
  return true;
}

function placeWord(grid, word, row, col, dr, dc) {
  for (let i = 0; i < word.length; i++) {
    grid[row + dr * i][col + dc * i] = word[i];
  }
}

function fillGrid(grid) {
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (!grid[r][c]) {
        grid[r][c] = FILL_CHARS[Math.floor(Math.random() * FILL_CHARS.length)];
      }
    }
  }
}

/**
 * Attempt to generate a complete grid.
 * Returns { grid, placedWords } or null if too many words failed.
 */
function generateGrid(entries, targetCount, dirs) {
  // Try multiple times until we get a good layout
  for (let attempt = 0; attempt < 5; attempt++) {
    const pool   = shuffle(entries).slice(0, targetCount * 2); // extra candidates
    const words  = pool.map(e => ({ word: entryWord(e), entry: e }));
    const size   = calcGridSize(words.slice(0, targetCount).map(w => w.word));
    const grid   = buildGrid(size);
    const placed = [];

    for (const { word, entry } of words) {
      if (placed.length >= targetCount) break;

      let success = false;
      for (let t = 0; t < MAX_PLACE_ATTEMPTS; t++) {
        const dir = dirs[Math.floor(Math.random() * dirs.length)];
        const [dr, dc] = dir;
        const row = Math.floor(Math.random() * size);
        const col = Math.floor(Math.random() * size);

        if (canPlace(grid, word, row, col, dr, dc)) {
          placeWord(grid, word, row, col, dr, dc);
          placed.push({ word, entry, row, col, dr, dc, colorIdx: placed.length % 10, found: false });
          success = true;
          break;
        }
      }
      // If word failed to place, skip it and try next candidate
    }

    if (placed.length >= targetCount) {
      fillGrid(grid);
      return { grid, placedWords: placed.slice(0, targetCount), size };
    }
  }
  return null; // couldn't place enough words
}

// ── RENDER GRID ───────────────────────────────────────────────
function cellId(r, c) { return `cell-${r}-${c}`; }

function renderGrid(grid, size) {
  // Cell size: fit screen with min 28px, max 40px
  const maxW    = Math.min(window.innerWidth - 48, 560);
  const rawCell = Math.floor(maxW / size);
  const cellPx  = Math.max(28, Math.min(40, rawCell));
  const fontPx  = Math.max(11, Math.min(15, cellPx - 8));

  elGrid.style.setProperty('--cell-size', `${cellPx}px`);
  elGrid.style.setProperty('--cell-font', `${fontPx}px`);
  elGrid.style.gridTemplateColumns = `repeat(${size}, ${cellPx}px)`;
  elGrid.innerHTML = '';

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const cell = document.createElement('div');
      cell.className   = 'ws-cell';
      cell.id          = cellId(r, c);
      cell.textContent = grid[r][c];
      cell.dataset.row = r;
      cell.dataset.col = c;
      cell.addEventListener('click', onCellClick);
      elGrid.appendChild(cell);
    }
  }
}

// ── RENDER CLUES ──────────────────────────────────────────────
function renderClues(placedWords, mode) {
  elCluesTitle.textContent = mode === 'word'
    ? `Words to find (${placedWords.length})`
    : `Definitions to match (${placedWords.length})`;

  elCluesList.innerHTML = '';

  placedWords.forEach(({ word, entry }, idx) => {
    const li = document.createElement('li');
    li.className    = 'clue-item';
    li.dataset.idx  = idx;

    const tick = document.createElement('div');
    tick.className  = 'clue-tick';
    tick.textContent = '✓';

    const body = document.createElement('div');
    body.className = 'clue-body';

    if (mode === 'word') {
      // Show the word — student just has to find it
      const wordEl = document.createElement('span');
      wordEl.className   = 'clue-word';
      wordEl.textContent = word;
      body.appendChild(wordEl);
    } else {
      // Show the definition — word hidden until found
      const defEl = document.createElement('span');
      defEl.className   = 'clue-def';
      defEl.textContent = entry.def;
      body.appendChild(defEl);
    }

    li.appendChild(tick);
    li.appendChild(body);
    elCluesList.appendChild(li);
  });
}

// ── CELL INTERACTION ──────────────────────────────────────────
function onCellClick(e) {
  const r = parseInt(e.currentTarget.dataset.row);
  const c = parseInt(e.currentTarget.dataset.col);

  if (!gameState.selectStart) {
    // First tap — set start
    gameState.selectStart = { row: r, col: c };
    highlightCell(r, c, 'selecting');
  } else {
    // Second tap — check if it forms a valid word
    const { row: sr, col: sc } = gameState.selectStart;

    if (sr === r && sc === c) {
      // Tapped same cell — deselect
      clearSelection();
      return;
    }

    checkSelection(sr, sc, r, c);
  }
}

function highlightCell(r, c, cls) {
  const cell = document.getElementById(cellId(r, c));
  if (cell) cell.classList.add(cls);
}

function clearSelection() {
  elGrid.querySelectorAll('.selecting, .in-path').forEach(c => {
    c.classList.remove('selecting', 'in-path');
  });
  gameState.selectStart = null;
}

/**
 * Check if start→end matches any placed word in any direction.
 * If yes: mark found. If no: flash red.
 */
function checkSelection(sr, sc, er, ec) {
  const dr = Math.sign(er - sr);
  const dc = Math.sign(ec - sc);
  const steps = Math.max(Math.abs(er - sr), Math.abs(ec - sc));

  // Build the selected string
  let selected = '';
  const cells  = [];
  for (let i = 0; i <= steps; i++) {
    const r = sr + dr * i;
    const c = sc + dc * i;
    const cell = document.getElementById(cellId(r, c));
    if (!cell) { clearSelection(); return; }
    selected += cell.textContent.toUpperCase();
    cells.push({ r, c, cell });
  }

  // Try to match against placed words
  const match = gameState.words.find(w => {
    if (w.found) return false;
    // Check forward match
    if (w.word === selected &&
        w.row === sr && w.col === sc && w.dr === dr && w.dc === dc) return true;
    // Check reverse match
    const rev = selected.split('').reverse().join('');
    if (w.word === rev &&
        w.row === er && w.col === ec && w.dr === -dr && w.dc === -dc) return true;
    return false;
  });

  clearSelection();

  if (match) {
    foundWord(match, cells);
  } else {
    // Flash wrong
    cells.forEach(({ cell }) => {
      cell.classList.add('wrong-flash');
      setTimeout(() => cell.classList.remove('wrong-flash'), 500);
    });
  }
}

function foundWord(wordObj, cells) {
  wordObj.found = true;
  gameState.foundCount++;

  // Highlight cells permanently
  cells.forEach(({ r, c }) => {
    const cell = document.getElementById(cellId(r, c));
    if (cell) {
      cell.classList.add('found', `ws-found-${wordObj.colorIdx}`);
    }
  });

  // Tick the clue
  const idx  = gameState.words.indexOf(wordObj);
  const item = elCluesList.querySelector(`.clue-item[data-idx="${idx}"]`);
  if (item) {
    item.classList.add('found-clue');

    // In definition mode: reveal the word beside the definition
    if (gameState.clueMode === 'definition') {
      const revealed = document.createElement('span');
      revealed.className   = 'clue-revealed-word';
      revealed.textContent = wordObj.word;
      item.querySelector('.clue-body').appendChild(revealed);
    }
  }

  // Update found counter
  elFoundCount.textContent = gameState.foundCount;

  // Check completion
  if (gameState.foundCount === gameState.words.length) {
    setTimeout(showCompletion, 600);
  }
}

// ── TIMER ─────────────────────────────────────────────────────
function startTimer() {
  gameState.elapsed = 0;
  gameState.timerInterval = setInterval(() => {
    gameState.elapsed++;
    const m = Math.floor(gameState.elapsed / 60);
    const s = gameState.elapsed % 60;
    elTimer.textContent = `${m}:${s.toString().padStart(2, '0')}`;
  }, 1000);
}

function stopTimer() {
  clearInterval(gameState.timerInterval);
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
      <strong>${gameState.words.length}</strong>words found
    </div>
    <div class="completion-stat">
      <strong>${formatTime(gameState.elapsed)}</strong>time taken
    </div>
  `;

  // All words with their definitions — full revision summary
  const titleEl = document.createElement('h3');
  titleEl.className   = 'completion-words-title';
  titleEl.textContent = 'Words & Definitions — Revision Summary';

  const listEl = document.createElement('div');
  listEl.className = 'completion-word-list';

  gameState.words.forEach(({ word, entry }) => {
    const card = document.createElement('div');
    card.className = 'completion-word-card';

    const hasAbbr = entry.abbr && !entry.abbr.includes('/');
    card.innerHTML = `
      <div class="completion-word-term">${word}</div>
      ${hasAbbr ? `<div class="completion-word-full">${entry.term}</div>` : ''}
      <div class="completion-word-def">${entry.def}</div>
    `;
    listEl.appendChild(card);
  });

  elCompWords.innerHTML = '';
  elCompWords.appendChild(titleEl);
  elCompWords.appendChild(listEl);
}

// ── START GAME ────────────────────────────────────────────────
function startGame() {
  const eligible = getEligibleEntries();
  if (eligible.length < wordCount) return;

  const dirs   = dirMode === 'simple' ? DIR_SIMPLE : DIR_COMPLEX;
  const result = generateGrid(eligible, wordCount, dirs);

  if (!result) {
    alert('Could not generate a grid with this selection. Try fewer words or a different category.');
    return;
  }

  const { grid, placedWords, size } = result;

  gameState = {
    words:         placedWords,
    grid,
    gridSize:      size,
    clueMode,
    dirMode,
    selectStart:   null,
    timerInterval: null,
    elapsed:       0,
    foundCount:    0,
  };

  elSetup.classList.add('hidden');
  elCompletion.classList.add('hidden');
  elGame.classList.remove('hidden');

  elFoundCount.textContent = 0;
  elTotalCount.textContent = placedWords.length;
  elTimer.textContent      = '0:00';

  renderGrid(grid, size);
  renderClues(placedWords, clueMode);
  startTimer();
}

function backToSetup() {
  stopTimer();
  elGame.classList.add('hidden');
  elCompletion.classList.add('hidden');
  elSetup.classList.remove('hidden');
  updateSetupCount();
}

// ── INIT ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {

  buildCategorySelect();
  updateSetupCount();

  // Category change
  elCatSelect.addEventListener('change', updateSetupCount);

  // Word count buttons
  document.querySelectorAll('.count-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.count-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      wordCount = parseInt(btn.dataset.count);
      updateSetupCount();
    });
  });

  // Clue mode toggle
  document.querySelectorAll('[data-clue]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-clue]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      clueMode = btn.dataset.clue;
    });
  });

  // Direction mode toggle
  document.querySelectorAll('[data-dir]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-dir]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      dirMode = btn.dataset.dir;
    });
  });

  // Start
  elBtnStart.addEventListener('click', startGame);

  // New game (same settings)
  elBtnNewGame.addEventListener('click', () => {
    stopTimer();
    startGame();
  });

  // Completion actions
  elBtnAgain.addEventListener('click', () => {
    elCompletion.classList.add('hidden');
    startGame();
  });

  elBtnChange.addEventListener('click', backToSetup);
});
