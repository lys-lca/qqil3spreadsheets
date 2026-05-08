/**
 * quiz.js
 * ─────────────────────────────────────────────────────────────
 * LCA ICT — Fill in the Blank Quiz
 *
 * Question generation
 * ───────────────────
 *   10 random questions drawn from the full GLOSSARY each run.
 *   The definition is always shown in full — the blank is always
 *   the term or abbreviation, placed at the start or end of the
 *   sentence (chosen randomly so questions feel varied):
 *
 *   Concept, end blank:
 *     "A network connecting computers in one building — this is called _____."
 *   Concept, start blank:
 *     "_____ — A network connecting computers in one building."
 *   Acronym, end blank:
 *     "[definition]. The abbreviation for this is _____."
 *   Acronym, start blank:
 *     "_____ stands for: [definition]."
 *
 * Interaction
 * ───────────
 *   Click bank word  → select it (highlighted)
 *   Click blank      → place selected word into blank
 *   Click filled blank → return word to bank
 *   Click different bank word while one selected → switch selection
 *   Check Answers button only appears once all 10 blanks are filled.
 *
 * Results
 * ───────
 *   Correct = green, wrong = red + correct answer shown inline.
 *   Full revision summary with all terms and definitions below.
 *
 * Depends on: glossary-data.js (GLOSSARY, CATEGORIES), shared.js
 * ─────────────────────────────────────────────────────────────
 */

const QUESTION_COUNT = 10;

// ── STATE ─────────────────────────────────────────────────────
let questions    = [];  // [{ entry, word, sentence, blankIdx }]
let placements   = {};  // { questionIdx: word | null }
let selectedWord = null; // currently selected bank word string
let checked      = false;

// ── ELEMENTS ──────────────────────────────────────────────────
const el = id => document.getElementById(id);

const elSetup      = el('setup-panel');
const elQuiz       = el('quiz-area');
const elResults    = el('results-panel');
const elBtnStart   = el('btn-start');
const elWordBank   = el('word-bank');
const elQList      = el('questions-list');
const elFilled     = el('filled-count');
const elTotalQ     = el('total-q');
const elBtnCheck   = el('btn-check');
const elBtnNew     = el('btn-new-quiz');
const elResStats   = el('results-stats');
const elResSummary = el('results-summary');
const elBtnRetry   = el('btn-try-again');
const elBtnNewRes  = el('btn-new-quiz-results');

// ── HELPERS ───────────────────────────────────────────────────
const shuffle = arr => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const isAcronym = entry => Boolean(entry.abbr);

/**
 * Return the display word shown in the word bank for this entry.
 * Acronym entries show the abbreviation; concept entries show the term.
 * Always uppercased so bank chips are consistent.
 */
function blankWord(entry) {
  return isAcronym(entry)
    ? entry.abbr.replace(/[^A-Za-z0-9/.\- ]/g, '').toUpperCase()
    : entry.term.toUpperCase();
}

/**
 * Build the question sentence from the definition.
 * The definition is always shown in full — the blank is always the
 * term or abbreviation, placed either at the start or end of the
 * sentence depending on a coin flip. This keeps questions varied
 * while staying completely unambiguous.
 *
 *   Start blank (50%):  "_____ is a network connecting computers in one building."
 *   End blank   (50%):  "A network connecting computers in one building is called _____."
 *
 * For acronym entries the end-blank variant uses "stands for" phrasing:
 *   Start: "_____ stands for: Local Area Network…"
 *   End:   "Local Area Network… — the abbreviation for this is _____."
 *
 * Returns { before, after } strings that wrap the <blank> element.
 */
function buildSentence(entry) {
  const def      = entry.def;
  const acronym  = isAcronym(entry);

  // Coin flip: 0 = blank at start, 1 = blank at end
  const endBlank = Math.random() < 0.5;

  if (acronym) {
    if (endBlank) {
      return {
        before: `${def} The abbreviation for this is `,
        after:  `.`
      };
    } else {
      return {
        before: ``,
        after:  ` stands for: ${def}`
      };
    }
  } else {
    if (endBlank) {
      // Strip trailing full stop if present so sentence reads cleanly
      const defClean = def.replace(/\.$/, '');
      return {
        before: `${defClean} — this is called `,
        after:  `.`
      };
    } else {
      return {
        before: ``,
        after:  ` — ${def}`
      };
    }
  }
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ── QUESTION GENERATION ───────────────────────────────────────
function generateQuestions() {
  const pool     = shuffle([...GLOSSARY]).slice(0, QUESTION_COUNT);
  const result   = [];

  pool.forEach((entry, idx) => {
    const { before, after } = buildSentence(entry);
    result.push({
      entry,
      word:   blankWord(entry),  // uppercased answer
      before,
      after,
      idx,
    });
  });

  return result;
}

// ── RENDER WORD BANK ──────────────────────────────────────────
function renderWordBank(qs) {
  elWordBank.innerHTML = '';
  const words = shuffle(qs.map(q => q.word));

  words.forEach(word => {
    const chip = document.createElement('button');
    chip.className       = 'bank-word';
    chip.dataset.word    = word;
    chip.textContent     = word;
    chip.addEventListener('click', () => onBankWordClick(word));
    elWordBank.appendChild(chip);
  });
}

// ── RENDER QUESTIONS ──────────────────────────────────────────
function renderQuestions(qs) {
  elQList.innerHTML = '';

  qs.forEach((q, idx) => {
    const li = document.createElement('li');
    li.className    = 'question-item';
    li.dataset.idx  = idx;

    // Build sentence with inline blank
    const sentence = document.createElement('p');
    sentence.className = 'question-sentence';

    if (q.before) {
      sentence.appendChild(document.createTextNode(q.before));
    }

    // The blank element
    const blank = document.createElement('span');
    blank.className   = 'blank';
    blank.dataset.idx = idx;
    blank.addEventListener('click', () => onBlankClick(idx));
    sentence.appendChild(blank);

    if (q.after) {
      sentence.appendChild(document.createTextNode(q.after));
    }

    li.appendChild(sentence);
    elQList.appendChild(li);
  });
}

// ── BANK WORD CLICK ───────────────────────────────────────────
function onBankWordClick(word) {
  if (checked) return;

  const chip = elWordBank.querySelector(`[data-word="${word}"]`);
  if (!chip || chip.classList.contains('placed')) return;

  if (selectedWord === word) {
    // Deselect
    chip.classList.remove('selected');
    selectedWord = null;
    clearDropHighlights();
  } else {
    // Select this word
    clearSelection();
    chip.classList.add('selected');
    selectedWord = word;
    showDropHighlights();
  }
}

// ── BLANK CLICK ───────────────────────────────────────────────
function onBlankClick(idx) {
  if (checked) return;

  const blank = document.querySelector(`.blank[data-idx="${idx}"]`);
  if (!blank) return;

  if (blank.classList.contains('filled')) {
    // Return word to bank
    const word = placements[idx];
    placements[idx] = null;

    // Restore bank chip
    const chip = elWordBank.querySelector(`[data-word="${word}"]`);
    if (chip) {
      chip.classList.remove('placed');
      // If this was the selected word, re-select it
      if (selectedWord === word) {
        chip.classList.add('selected');
        showDropHighlights();
      }
    }

    // Clear blank
    blank.classList.remove('filled');
    blank.innerHTML = '';

    updateProgress();
  } else if (selectedWord) {
    // Place selected word into blank
    placeWord(idx, selectedWord);
  }
}

function placeWord(idx, word) {
  // If blank already had something, return it first
  if (placements[idx]) {
    const old = placements[idx];
    const oldChip = elWordBank.querySelector(`[data-word="${old}"]`);
    if (oldChip) oldChip.classList.remove('placed');
  }

  placements[idx] = word;

  // Fill the blank
  const blank = document.querySelector(`.blank[data-idx="${idx}"]`);
  blank.classList.add('filled');
  blank.innerHTML = `<span class="blank-word">${word}</span>`;

  // Remove from bank
  const chip = elWordBank.querySelector(`[data-word="${word}"]`);
  if (chip) {
    chip.classList.remove('selected');
    chip.classList.add('placed');
  }

  selectedWord = null;
  clearDropHighlights();
  updateProgress();
}

// ── SELECTION HELPERS ─────────────────────────────────────────
function clearSelection() {
  elWordBank.querySelectorAll('.bank-word.selected')
    .forEach(c => c.classList.remove('selected'));
  selectedWord = null;
  clearDropHighlights();
}

function showDropHighlights() {
  // Highlight blanks and question items as drop targets
  document.querySelectorAll('.blank:not(.filled)').forEach(b => {
    b.classList.add('can-drop');
  });
  document.querySelectorAll('.question-item').forEach(item => {
    const idx = parseInt(item.dataset.idx);
    if (!placements[idx]) item.classList.add('can-drop');
  });
}

function clearDropHighlights() {
  document.querySelectorAll('.blank.can-drop')
    .forEach(b => b.classList.remove('can-drop'));
  document.querySelectorAll('.question-item.can-drop')
    .forEach(i => i.classList.remove('can-drop'));
}

// ── PROGRESS ──────────────────────────────────────────────────
function updateProgress() {
  const filled = Object.values(placements).filter(Boolean).length;
  elFilled.textContent = filled;

  if (filled === QUESTION_COUNT) {
    elBtnCheck.classList.remove('hidden');
  } else {
    elBtnCheck.classList.add('hidden');
  }
}

// ── CHECK ANSWERS ─────────────────────────────────────────────
function checkAnswers() {
  checked = true;
  clearSelection();

  let correct = 0;
  let wrong   = 0;

  questions.forEach((q, idx) => {
    const placed  = placements[idx];
    const isRight = placed === q.word;

    const blank = document.querySelector(`.blank[data-idx="${idx}"]`);
    const item  = document.querySelector(`.question-item[data-idx="${idx}"]`);

    blank.classList.remove('filled');
    blank.classList.add(isRight ? 'result-correct' : 'result-wrong');

    if (item) item.classList.add(isRight ? 'correct' : 'wrong');

    if (isRight) {
      blank.innerHTML = `<span class="blank-word">${placed}</span>`;
      correct++;
    } else {
      // Show what they placed (struck through) + correct answer
      blank.innerHTML = `
        <span class="blank-word">${placed || '?'}</span>
        <span class="correct-answer">${q.word}</span>
      `;
      wrong++;
    }
  });

  // Hide check button, hide word bank
  elBtnCheck.classList.add('hidden');
  document.querySelector('.word-bank-wrap').style.display = 'none';

  // Show results after short delay
  setTimeout(() => showResults(correct, wrong), 800);
}

// ── RESULTS ───────────────────────────────────────────────────
function showResults(correct, wrong) {
  elQuiz.classList.add('hidden');
  elResults.classList.remove('hidden');

  const pct = Math.round((correct / QUESTION_COUNT) * 100);

  elResStats.innerHTML = `
    <div class="stat-item stat-correct"><strong>${correct}</strong>Correct</div>
    <div class="stat-item stat-wrong"><strong>${wrong}</strong>Incorrect</div>
    <div class="stat-item stat-pct"><strong>${pct}%</strong>Score</div>
  `;

  // Revision summary
  const titleEl = document.createElement('h3');
  titleEl.className   = 'summary-title';
  titleEl.textContent = 'Answers — Revision Summary';

  const listEl = document.createElement('div');
  listEl.className = 'summary-list';

  questions.forEach((q, idx) => {
    const wasCorrect = placements[idx] === q.word;
    const card = document.createElement('div');
    card.className = `summary-card ${wasCorrect ? 'was-correct' : 'was-wrong'}`;

    const hasFullTerm = isAcronym(q.entry) && q.entry.term;
    card.innerHTML = `
      <div class="summary-word">${q.word}</div>
      ${hasFullTerm ? `<div class="summary-full">${q.entry.term}</div>` : ''}
      <div class="summary-def">${q.entry.def}</div>
    `;
    listEl.appendChild(card);
  });

  elResSummary.innerHTML = '';
  elResSummary.appendChild(titleEl);
  elResSummary.appendChild(listEl);
}

// ── START / RESET ─────────────────────────────────────────────
function startQuiz() {
  checked      = false;
  selectedWord = null;
  placements   = {};

  questions = generateQuestions();
  questions.forEach((_, i) => { placements[i] = null; });

  elTotalQ.textContent  = QUESTION_COUNT;
  elFilled.textContent  = 0;

  elBtnCheck.classList.add('hidden');

  // Restore word bank visibility if hidden
  const bankWrap = document.querySelector('.word-bank-wrap');
  if (bankWrap) bankWrap.style.display = '';

  renderWordBank(questions);
  renderQuestions(questions);

  elSetup.classList.add('hidden');
  elResults.classList.add('hidden');
  elQuiz.classList.remove('hidden');
}

function backToSetup() {
  elQuiz.classList.add('hidden');
  elResults.classList.add('hidden');
  elSetup.classList.remove('hidden');
}

// ── INIT ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {

  elBtnStart.addEventListener('click', startQuiz);
  elBtnCheck.addEventListener('click', checkAnswers);
  elBtnNew.addEventListener('click',   startQuiz);
  elBtnRetry.addEventListener('click', startQuiz);
  elBtnNewRes.addEventListener('click', startQuiz);
});
