/**
 * vteam.js
 * ─────────────────────────────────────────────────────────────
 * LCA ICT — V-Team Competition Game
 *
 * Setup
 *   2–6 teams with custom names.
 *   Grid sizes: 16 (4×4), 25 (5×5), 36 (6×6).
 *
 * Square types
 *   QUESTION — shows a number (1…N). Teacher clicks, overlay
 *              opens showing term/abbr. "Show Hint & Answer"
 *              reveals hint + definition simultaneously.
 *              Teacher marks Correct (+5 or +10) or Incorrect (0).
 *   BONUS    — immediate +10 to +25 pts for current team. No question.
 *   PENALTY  — immediate -10 to -25 pts for current team. No question.
 *
 *   Ratio: ~15% bonus, ~15% penalty (min 2 each), rest questions.
 *   Point values and bonus/penalty amounts assigned randomly.
 *
 * Turn order
 *   Strict rotation: Team 1 → 2 → 3 → … → back to 1.
 *   Advances only after a square is fully resolved.
 *
 * Scoring
 *   Questions: correct = card's point value (5 or 10). Wrong = 0.
 *   Bonus/Penalty: applied immediately, no question asked.
 *   Scores cannot go below 0.
 *
 * Depends on: glossary-data.js (GLOSSARY, CATEGORIES), shared.js
 * ─────────────────────────────────────────────────────────────
 */

// ── TEAM COLOURS ──────────────────────────────────────────────
const TEAM_COLORS = [
  'var(--t1)', // green
  'var(--t2)', // blue
  'var(--t3)', // orange
  'var(--t4)', // red
  'var(--t5)', // purple
  'var(--t6)', // cyan
];

const TEAM_COLOR_HEX = [
  '#4fffb0',
  '#6b8cff',
  '#ff9f6b',
  '#ff6b6b',
  '#c084fc',
  '#38bdf8',
];

// ── STATE ─────────────────────────────────────────────────────
let teams       = [];   // [{ name, score, colorIdx }]
let squares     = [];   // [{ type, points, entry, used }]
let turnIdx     = 0;    // index into teams array
let gridSize    = 25;
let activeSquare = null; // index of currently open square

// ── ELEMENTS ──────────────────────────────────────────────────
const el = id => document.getElementById(id);

const elSetup        = el('vt-setup');
const elGame         = el('vt-game');
const elEnd          = el('vt-end');
const elTeamsGrid    = el('teams-grid');
const elBtnAddTeam   = el('btn-add-team');
const elBtnRemTeam   = el('btn-remove-team');
const elBtnStart     = el('btn-start');
const elScoreboard   = el('scoreboard');
const elTurnTeam     = el('turn-team');
const elVtGrid       = el('vt-grid');
const elOverlay      = el('card-overlay');
const elOvCard       = el('ov-card');
const elOvSpecial    = el('ov-special');
const elOvSquareNum  = el('ov-square-num');
const elOvTypeBadge  = el('ov-type-badge');
const elOvFront      = el('ov-front');
const elOvTerm       = el('ov-term');
const elOvRevealed   = el('ov-revealed');
const elOvHint       = el('ov-hint');
const elOvDef        = el('ov-def');
const elOvActions    = el('ov-actions');
const elBtnReveal    = el('btn-reveal');
const elBtnCorrect   = el('btn-correct-ans');
const elBtnWrong     = el('btn-wrong-ans');
const elBtnClose     = el('btn-close-overlay');
const elOvSpIcon     = el('ov-special-icon');
const elOvSpTitle    = el('ov-special-title');
const elOvSpPoints   = el('ov-special-points');
const elOvSpTeam     = el('ov-special-team');
const elBtnEndGame   = el('btn-end-game');
const elEndTitle     = el('end-title');
const elEndPodium    = el('end-podium');
const elBtnAgain     = el('btn-play-again');
const elBtnNewSetup  = el('btn-new-setup');

// ── HELPERS ───────────────────────────────────────────────────
const shuffle = arr => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const randBetween = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const isAcronym = entry => Boolean(entry.abbr);

const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

// ── SETUP — TEAM INPUTS ───────────────────────────────────────
let teamCount = 4;

const DEFAULT_NAMES = ['Team 1','Team 2','Team 3','Team 4','Team 5','Team 6'];

function renderTeamInputs() {
  elTeamsGrid.innerHTML = '';
  for (let i = 0; i < teamCount; i++) {
    const wrap = document.createElement('div');
    wrap.className = 'team-input-wrap';

    const dot = document.createElement('div');
    dot.className = 'team-color-dot';
    dot.style.background = TEAM_COLOR_HEX[i];

    const input = document.createElement('input');
    input.type        = 'text';
    input.className   = 'team-name-input';
    input.placeholder = DEFAULT_NAMES[i];
    input.value       = DEFAULT_NAMES[i];
    input.maxLength   = 20;
    input.dataset.idx = i;

    wrap.appendChild(dot);
    wrap.appendChild(input);
    elTeamsGrid.appendChild(wrap);
  }

  elBtnAddTeam.disabled = teamCount >= 6;
  elBtnRemTeam.disabled = teamCount <= 2;
}

function addTeam() {
  if (teamCount >= 6) return;
  teamCount++;
  renderTeamInputs();
}

function removeTeam() {
  if (teamCount <= 2) return;
  teamCount--;
  renderTeamInputs();
}

// ── SQUARE GENERATION ─────────────────────────────────────────
function buildSquares(n) {
  // Calculate bonus/penalty counts (~15% each, min 2)
  const specialCount = Math.max(4, Math.floor(n * 0.3));
  const bonusCount   = Math.ceil(specialCount / 2);
  const penaltyCount = Math.floor(specialCount / 2);
  const qCount       = n - bonusCount - penaltyCount;

  // Pick random entries for questions
  const entries = shuffle([...GLOSSARY]).slice(0, qCount);

  const list = [];

  // Question squares
  entries.forEach(entry => {
    list.push({
      type:   'question',
      points: Math.random() < 0.5 ? 5 : 10,
      entry,
      used:   false,
    });
  });

  // Bonus squares
  for (let i = 0; i < bonusCount; i++) {
    list.push({
      type:   'bonus',
      points: randBetween(10, 25),
      entry:  null,
      used:   false,
    });
  }

  // Penalty squares
  for (let i = 0; i < penaltyCount; i++) {
    list.push({
      type:   'penalty',
      points: randBetween(10, 25),
      entry:  null,
      used:   false,
    });
  }

  return shuffle(list);
}

// ── RENDER GRID ───────────────────────────────────────────────
function renderGrid() {
  const cols = Math.sqrt(gridSize);
  elVtGrid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

  // Size squares to fill the available space nicely
  const maxW   = window.innerWidth - 260; // sidebar width
  const maxH   = window.innerHeight - 80;
  const cellPx = Math.floor(Math.min(maxW, maxH) / cols) - 8;
  elVtGrid.style.width  = `${cellPx * cols + 8 * (cols - 1)}px`;

  elVtGrid.innerHTML = '';

  squares.forEach((sq, idx) => {
    const div = document.createElement('div');
    div.className    = `vt-square type-${sq.type}`;
    div.dataset.idx  = idx;
    div.style.width  = `${cellPx}px`;
    div.style.height = `${cellPx}px`;

    const num = document.createElement('div');
    num.className   = 'sq-number';
    num.textContent = idx + 1;

    div.appendChild(num);
    div.addEventListener('click', () => onSquareClick(idx));
    elVtGrid.appendChild(div);
  });
}

// ── SCOREBOARD ────────────────────────────────────────────────
function renderScoreboard() {
  const maxScore = Math.max(...teams.map(t => t.score));

  elScoreboard.innerHTML = '';
  teams.forEach((team, idx) => {
    const row = document.createElement('div');
    row.className = 'score-row';
    row.id        = `score-row-${idx}`;
    row.style.setProperty('--team-color', TEAM_COLORS[team.colorIdx]);

    if (idx === turnIdx) row.classList.add('active-turn');
    if (team.score === maxScore && maxScore > 0) row.classList.add('leading');

    row.innerHTML = `
      <div class="score-dot"></div>
      <div class="score-name">${team.name}</div>
      <div class="score-val" id="score-val-${idx}">${team.score}</div>
    `;
    elScoreboard.appendChild(row);
  });

  // Update turn indicator
  const current = teams[turnIdx];
  elTurnTeam.textContent  = current.name;
  elTurnTeam.style.color  = TEAM_COLOR_HEX[current.colorIdx];
}

function updateScore(teamIdx, delta) {
  teams[teamIdx].score = clamp(teams[teamIdx].score + delta, 0, 9999);

  const valEl = el(`score-val-${teamIdx}`);
  if (valEl) {
    valEl.textContent = teams[teamIdx].score;
    valEl.classList.remove('score-bump');
    void valEl.offsetWidth;
    valEl.classList.add('score-bump');
  }

  // Refresh leading badge
  renderScoreboard();
}

// ── SQUARE CLICK ──────────────────────────────────────────────
function onSquareClick(idx) {
  const sq = squares[idx];
  if (!sq || sq.used) return;

  activeSquare = idx;

  if (sq.type === 'question') {
    openQuestionOverlay(sq, idx);
  } else {
    openSpecialOverlay(sq, idx);
  }
}

// ── QUESTION OVERLAY ──────────────────────────────────────────
function openQuestionOverlay(sq, idx) {
  const entry   = sq.entry;
  const acronym = isAcronym(entry);

  elOvCard.classList.remove('hidden');
  elOvSpecial.classList.add('hidden');
  elOvSquareNum.textContent  = `Square ${idx + 1} · ${sq.points} pts`;
  elOvTypeBadge.textContent  = acronym ? 'Acronym' : 'Term';
  elOvTypeBadge.className    = `ov-type-badge ${acronym ? 'type-acronym' : 'type-concept'}`;

  // Show the term/abbreviation on the front
  elOvTerm.textContent = acronym ? entry.abbr : entry.term;

  // Reset revealed section
  elOvFront.classList.remove('hidden');
  elOvRevealed.classList.add('hidden');
  elOvActions.classList.add('hidden');

  // Hint: acronym cards show full term, concept cards show hint text
  elOvHint.textContent = acronym ? entry.term : (entry.hint || '');
  elOvDef.textContent  = entry.def;

  // Correct button label shows the points on offer
  elBtnCorrect.textContent = `✓ Correct +${sq.points} pts`;

  openOverlay();
}

// ── SPECIAL OVERLAY (bonus / penalty) ─────────────────────────
function openSpecialOverlay(sq, idx) {
  const team    = teams[turnIdx];
  const isBonus = sq.type === 'bonus';

  elOvCard.classList.add('hidden');
  elOvSpecial.classList.remove('hidden');
  elOvActions.classList.add('hidden');

  elOvSpIcon.textContent   = isBonus ? '⭐' : '💀';
  elOvSpTitle.textContent  = isBonus ? 'Bonus!' : 'Penalty!';
  elOvSpTitle.className    = `ov-special-title ${isBonus ? 'bonus' : 'penalty'}`;
  elOvSpPoints.textContent = isBonus ? `+${sq.points}` : `-${sq.points}`;
  elOvSpPoints.className   = `ov-special-points ${isBonus ? 'bonus' : 'penalty'}`;
  elOvSpTeam.textContent   = `${team.name} ${isBonus ? 'gains' : 'loses'} ${sq.points} points`;

  // Apply immediately
  updateScore(turnIdx, isBonus ? sq.points : -sq.points);

  // Show a dismiss button after a beat
  setTimeout(() => {
    elOvActions.classList.remove('hidden');
    elOvActions.style.gridTemplateColumns = '1fr';
    elBtnWrong.classList.add('hidden');
    elBtnCorrect.textContent = 'Continue →';
    elBtnCorrect.style.gridColumn = '1 / -1';

    // One-time handler
    const handler = () => {
      resolveSquare(activeSquare);
      elBtnCorrect.removeEventListener('click', handler);
      elBtnWrong.classList.remove('hidden');
      elOvActions.style.gridTemplateColumns = '';
      elBtnCorrect.style.gridColumn = '';
    };
    elBtnCorrect.addEventListener('click', handler);
  }, 800);

  openOverlay();
}

function openOverlay() {
  elOverlay.classList.remove('hidden');
}

function closeOverlay() {
  elOverlay.classList.add('hidden');
  activeSquare = null;
}

// ── REVEAL ────────────────────────────────────────────────────
function revealAnswer() {
  elOvFront.classList.add('hidden');
  elOvRevealed.classList.remove('hidden');
  elOvActions.classList.remove('hidden');
}

// ── RESOLVE SQUARE ────────────────────────────────────────────
function resolveSquare(idx, correct) {
  const sq = squares[idx];
  sq.used  = true;

  // Mark square as used in DOM
  const sqEl = elVtGrid.querySelector(`[data-idx="${idx}"]`);
  if (sqEl) sqEl.classList.add('used');

  // Award points for question squares
  if (sq.type === 'question' && correct) {
    updateScore(turnIdx, sq.points);
  }

  // Advance turn
  turnIdx = (turnIdx + 1) % teams.length;
  renderScoreboard();

  closeOverlay();

  // Check if all squares are done
  if (squares.every(s => s.used)) {
    setTimeout(showEndScreen, 400);
  }
}

// ── END SCREEN ────────────────────────────────────────────────
function showEndScreen() {
  elGame.classList.add('hidden');
  elEnd.classList.remove('hidden');

  // Sort teams by score descending
  const ranked = [...teams]
    .map((t, i) => ({ ...t, origIdx: i }))
    .sort((a, b) => b.score - a.score);

  const winner = ranked[0];
  elEndTitle.textContent = `${winner.name} wins! 🎉`;

  elEndPodium.innerHTML = '';
  ranked.forEach((team, rank) => {
    const card = document.createElement('div');
    card.className = `podium-card rank-${rank + 1}`;
    card.innerHTML = `
      <div class="podium-rank">${rank === 0 ? '🥇 1st' : rank === 1 ? '🥈 2nd' : rank === 2 ? '🥉 3rd' : `${rank + 1}th`}</div>
      <div class="podium-name">${team.name}</div>
      <div class="podium-score" style="color:${TEAM_COLOR_HEX[team.colorIdx]}">${team.score}</div>
    `;
    elEndPodium.appendChild(card);
  });
}

// ── START GAME ────────────────────────────────────────────────
function startGame() {
  // Collect team names from inputs
  const inputs = elTeamsGrid.querySelectorAll('.team-name-input');
  teams = Array.from(inputs).map((inp, i) => ({
    name:     inp.value.trim() || DEFAULT_NAMES[i],
    score:    0,
    colorIdx: i,
  }));

  squares  = buildSquares(gridSize);
  turnIdx  = 0;

  elSetup.classList.add('hidden');
  elEnd.classList.add('hidden');
  elGame.classList.remove('hidden');

  renderGrid();
  renderScoreboard();
}

// ── BACK TO SETUP ─────────────────────────────────────────────
function backToSetup() {
  elGame.classList.add('hidden');
  elEnd.classList.add('hidden');
  elOverlay.classList.add('hidden');
  elSetup.classList.remove('hidden');
}

// ── INIT ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {

  renderTeamInputs();

  // Add/remove team buttons
  elBtnAddTeam.addEventListener('click', addTeam);
  elBtnRemTeam.addEventListener('click', removeTeam);

  // Grid size buttons
  document.querySelectorAll('.grid-size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.grid-size-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      gridSize = parseInt(btn.dataset.size);
    });
  });

  // Start game
  elBtnStart.addEventListener('click', startGame);

  // Reveal answer
  elBtnReveal.addEventListener('click', revealAnswer);

  // Correct answer
  elBtnCorrect.addEventListener('click', () => {
    if (activeSquare !== null && squares[activeSquare]?.type === 'question') {
      resolveSquare(activeSquare, true);
    }
  });

  // Wrong answer
  elBtnWrong.addEventListener('click', () => {
    if (activeSquare !== null && squares[activeSquare]?.type === 'question') {
      resolveSquare(activeSquare, false);
    }
  });

  // Close overlay without resolving (teacher changed mind)
  elBtnClose.addEventListener('click', closeOverlay);

  // End game early
  elBtnEndGame.addEventListener('click', () => {
    closeOverlay();
    showEndScreen();
  });

  // End screen
  elBtnAgain.addEventListener('click', startGame);
  elBtnNewSetup.addEventListener('click', backToSetup);
});
