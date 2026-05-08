/*
 * image-utils.css
 * ─────────────────────────────────────────────────────────────
 * LCA ICT — Shared image styles.
 * Loaded by any page that displays card images (glossary, flashcards).
 * ─────────────────────────────────────────────────────────────
 */

/* ── GLOSSARY CARD IMAGE ─────────────────────────────────── */
/*
 * When a glossary .card gains .card-image-wrap (injected by
 * injectCardImage), the image appears below the definition.
 */
.card.card-image-wrap {
  /* a little extra bottom padding to breathe */
  padding-bottom: 0.85rem;
}

.card .card-img {
  display:       block;
  max-width:     100%;
  max-height:    140px;
  width:         auto;
  height:        auto;
  margin-top:    0.85rem;
  border-radius: 5px;
  border:        1px solid var(--border);
  background:    var(--surface2);
  object-fit:    contain;
  /* subtle fade-in */
  animation:     imgFadeIn 0.3s ease;
}

/* ── FLASHCARD BACK IMAGE ────────────────────────────────── */
/*
 * On the flashcard back face, the image sits between the
 * term expansion (for acronym cards) and the definition.
 */
.fc-back.card-image-wrap {
  /* back face already has padding — just reserve space */
  gap: 0.5rem;
}

.fc-back .card-img {
  display:       block;
  max-width:     100%;
  max-height:    110px;
  width:         auto;
  height:        auto;
  border-radius: 5px;
  border:        1px solid var(--border);
  background:    var(--surface);
  object-fit:    contain;
  flex-shrink:   0;
  animation:     imgFadeIn 0.3s ease;
}

/* ── LIGHT MODE ADJUSTMENTS ──────────────────────────────── */
[data-theme="light"] .card .card-img,
[data-theme="light"] .fc-back .card-img {
  border-color: var(--border);
  background:   var(--surface2);
}

/* ── ANIMATION ───────────────────────────────────────────── */
@keyframes imgFadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to   { opacity: 1; transform: translateY(0); }
}
