<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LCA ICT — Glossary</title>
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@300;400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="shared.css">
  <link rel="stylesheet" href="glossary.css">
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
        <a href="glossary.html"    class="nav-link active">Glossary</a>
        <a href="flashcards.html"  class="nav-link">Flashcards</a>
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
    <div class="header-deco" aria-hidden="true"></div>
    <p class="page-label">Leaving Certificate Applied · ICT</p>
    <h1 class="page-title">ICT <span>Glossary</span></h1>
    <p class="page-sub">Key terms, abbreviations and concepts for the Information &amp; Communication Technology module.</p>
  </header>

  <!-- ── STATS BAR ── -->
  <div class="stats-bar" role="status" aria-live="polite">
    <div class="stat"><strong id="total-count">—</strong>terms</div>
    <div class="stat"><strong id="visible-count">—</strong>visible</div>
    <div class="stat"><strong id="cat-count">—</strong>categories</div>
  </div>

  <!-- ── CONTROLS ── -->
  <div class="controls">
    <div class="search-wrap">
      <span class="search-icon" aria-hidden="true">⌕</span>
      <input type="search" id="search" placeholder="Search terms or definitions…"
             autocomplete="off" aria-label="Search glossary">
    </div>
    <div class="filter-btns" id="filter-btns" role="group" aria-label="Filter by category">
      <button class="filter-btn active" data-filter="all">All</button>
    </div>
    <button class="sort-btn" id="sort-toggle" aria-label="Toggle sort order">A→Z ↕</button>
  </div>

  <!-- ── ALPHABET NAV ── -->
  <nav class="alpha-nav" id="alpha-nav" aria-label="Browse by letter"></nav>

  <!-- ── MAIN ── -->
  <main>
    <div id="glossary-container"></div>
    <div class="no-results" id="no-results" role="status" aria-live="polite">
      <div class="no-results-icon" aria-hidden="true">◌</div>
      <h3>No terms found</h3>
      <p>Try a different search or clear your filters.</p>
    </div>
  </main>

  <footer>LCA ICT Glossary · Ms N Cahillane · Last updated 2025</footer>

  <script src="glossary-data.js"></script>
  <script src="shared.js"></script>
  <script src="image-utils.js"></script>
  <script src="glossary-ui.js"></script>
</body>
</html>
