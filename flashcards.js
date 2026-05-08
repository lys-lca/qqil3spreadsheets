<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LCA ICT — Flashcards</title>
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@300;400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="shared.css">
  <link rel="stylesheet" href="flashcards.css">
  <link rel="stylesheet" href="image-utils.css">
  <script>
    (function(){
      const t = localStorage.getItem('lca-ict-theme');
      const d = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-theme', t ?? (d ? 'dark' : 'light'));
    })();
  </script>
</head>
<body>

  <!-- ── NAV ── -->
  <nav class="site-nav" id="site-nav">
    <div class="nav-inner">
      <a class="nav-brand" href="index.html"><span class="nav-brand-ict">LCA</span> ICT</a>
      <div class="nav-links" id="nav-links">
        <a href="glossary.html"    class="nav-link">Glossary</a>
        <a href="flashcards.html"  class="nav-link active">Flashcards</a>
        <a href="wordsearch.html"  class="nav-link">Wordsearch</a>
        <a href="memory.html"      class="nav-link">Memory</a>
        <a href="quiz.html"        class="nav-link">Quiz</a>
        <a href="vteam.html"       class="nav-link">V-Team</a>
      </div>
      <button class="theme-toggle" id="theme-toggle" aria-label="Toggle dark/light mode">
        <span class="icon-dark">☀</span>
        <span class="icon-light">☾</span>
      </button>
      <button class="nav-hamburger" id="nav-hamburger" aria-label="Toggle menu">☰</button>
    </div>
  </nav>

  <!-- ── PAGE HEADER ── -->
  <header class="page-header">
    <p class="page-label">Leaving Certificate Applied · ICT</p>
    <h1 class="page-title">Flash<span>cards</span></h1>
    <p class="page-sub">Reveal the answer, then mark yourself correct or incorrect.</p>
  </header>

  <!-- ── SETUP PANEL ── -->
  <section class="setup-panel" id="setup-panel">
    <div class="setup-row">
      <div class="setup-group">
        <label class="setup-label" for="cat-select">Category</label>
        <div class="select-wrap">
          <select id="cat-select">
            <option value="all">All Categories</option>
          </select>
        </div>
      </div>
      <div class="setup-group">
        <label class="setup-label">Mode</label>
        <div class="mode-btns">
          <button class="mode-btn active" data-mode="all">All Cards</button>
          <button class="mode-btn" data-mode="10">10 Random</button>
        </div>
      </div>
    </div>
    <div class="setup-row setup-row-count">
      <span class="setup-count" id="setup-count">— cards in selection</span>
      <button class="btn-start" id="btn-start">Start →</button>
    </div>
  </section>

  <!-- ── GAME AREA ── -->
  <section class="game-area hidden" id="game-area">

    <!-- Progress bar -->
    <div class="progress-wrap">
      <div class="progress-bar" id="progress-bar"></div>
    </div>

    <!-- Counter + scores -->
    <div class="status-row">
      <span class="status-counter" id="status-counter">1 / 10</span>
      <div class="status-scores">
        <span class="score score-correct">✓ <strong id="score-correct">0</strong></span>
        <span class="score score-wrong">✗ <strong id="score-wrong">0</strong></span>
        <span class="score score-hint" title="Hints used">💡 <strong id="score-hints">0</strong></span>
      </div>
    </div>

    <!-- ── HINT ROW — wide tap target above the card ── -->
    <div class="hint-row" id="hint-row">
      <button class="btn-hint" id="btn-hint">💡 Show hint</button>
      <div class="fc-hint-text hidden" id="fc-hint-text"></div>
    </div>

    <!-- ── CARD — purely visual, no tap/click/swipe ── -->
    <div class="card-stage">
      <div class="fc-card" id="fc-card">
        <div class="fc-inner" id="fc-inner">

          <!-- FRONT -->
          <div class="fc-face fc-front">
            <div class="fc-category-tag" id="fc-cat-tag"></div>
            <div class="fc-type-badge"   id="fc-type-badge"></div>
            <div class="fc-term"         id="fc-term"></div>
            <div class="fc-hint-dot hidden" id="fc-hint-dot">💡 hint used</div>
          </div>

          <!-- BACK -->
          <div class="fc-face fc-back">
            <div class="fc-back-term hidden" id="fc-back-term"></div>
            <div class="fc-def"             id="fc-def"></div>
          </div>

        </div>
      </div>
    </div>

    <!-- ── FLIP BUTTON — large, clearly labelled ── -->
    <div class="flip-row">
      <button class="btn-flip" id="btn-flip">Reveal answer ↓</button>
    </div>

    <!-- ── MARK + NAV BUTTONS ── -->
    <div class="action-row">
      <button class="btn-action btn-wrong"   id="btn-wrong"   disabled>✗ Incorrect</button>
      <div class="nav-btns">
        <button class="btn-nav" id="btn-prev" title="Previous card">←</button>
        <button class="btn-nav" id="btn-next" title="Next card">→</button>
      </div>
      <button class="btn-action btn-correct" id="btn-correct" disabled>✓ Correct</button>
    </div>

    <!-- Session controls -->
    <div class="session-controls">
      <button class="btn-ghost" id="btn-reset">↺ Reset scores</button>
      <button class="btn-ghost" id="btn-new-session">⊞ New session</button>
    </div>

  </section>

  <!-- ── REVIEW PANEL ── -->
  <section class="review-panel hidden" id="review-panel">

    <div class="review-header">
      <h2 class="review-title">Session Complete</h2>
      <div class="review-stats" id="review-stats"></div>
    </div>

    <div class="review-incorrect-wrap" id="review-incorrect-wrap"></div>

    <div class="review-actions">
      <button class="btn-start" id="btn-retry-wrong">↺ Retry Incorrect</button>
      <button class="btn-ghost" id="btn-new-session-review">⊞ New Session</button>
      <button class="btn-print" id="btn-print">⎙ Print Incorrect</button>
    </div>

  </section>

  <!-- ── PRINT AREA ── -->
  <div id="print-area" class="print-area"></div>

  <script src="glossary-data.js"></script>
  <script src="shared.js"></script>
  <script src="image-utils.js"></script>
  <script src="flashcards.js"></script>
</body>
</html>
