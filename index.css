/**
 * image-utils.js
 * ─────────────────────────────────────────────────────────────
 * LCA ICT — Shared image utility.
 *
 * Derives an image filename from a glossary entry and attempts
 * to load it. If the file exists the supplied callback receives
 * the URL; if not, nothing happens — no placeholder, no error.
 *
 * Convention (images/ folder):
 *   abbr present, no slash  → strip non-alphanumeric → e.g. "CPU.png"
 *   abbr present, has slash → fall back to term-based name (e.g. "B/I/U" → "Bold_Italic_Underline.png")
 *   no abbr                 → spaces→underscores, punctuation stripped → e.g. "Hard_Disk_Drive.png"
 *
 * Supported extensions checked in order: .png .jpg .jpeg .gif .svg .webp
 *
 * Usage:
 *   loadCardImage(card, url => { imgEl.src = url; imgEl.classList.remove('hidden'); });
 * ─────────────────────────────────────────────────────────────
 */

const IMAGE_DIR  = 'images/';
const IMAGE_EXTS = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'];

/**
 * Derive the base filename (no extension) for a glossary entry.
 * @param {Object} card  — a GLOSSARY entry
 * @returns {string}     — e.g. "CPU" or "Hard_Disk_Drive"
 */
function cardImageBasename(card) {
  const abbr = card.abbr;
  const term = card.term;

  if (abbr && !abbr.includes('/')) {
    // Clean abbreviation: keep only alphanumeric characters
    return abbr.replace(/[^A-Za-z0-9]/g, '');
  }

  // Fall back to term: spaces → underscores, strip non-alphanumeric (except underscore)
  return term
    .replace(/[^A-Za-z0-9\s]/g, '')   // strip punctuation
    .trim()
    .replace(/\s+/g, '_');             // spaces → underscores
}

/**
 * Attempt to load an image for a card. Tries each supported extension
 * in turn. Calls onFound(url) with the first URL that loads successfully.
 * Silent if no image exists.
 *
 * @param {Object}   card     — a GLOSSARY entry
 * @param {Function} onFound  — called with the resolved image URL
 */
function loadCardImage(card, onFound) {
  const base = cardImageBasename(card);
  tryExtension(base, 0, onFound);
}

function tryExtension(base, idx, onFound) {
  if (idx >= IMAGE_EXTS.length) return; // all extensions exhausted

  const url = IMAGE_DIR + base + IMAGE_EXTS[idx];
  const img = new Image();

  img.onload  = () => onFound(url);
  img.onerror = () => tryExtension(base, idx + 1, onFound);
  img.src     = url;
}

/**
 * Inject a card image into a container element.
 * Creates an <img> inside containerEl if image loads; does nothing if not.
 * Adds class 'card-image-wrap' to the container when image is found.
 *
 * @param {Object}      card        — GLOSSARY entry
 * @param {HTMLElement} containerEl — element to inject img into
 * @param {string}      [cls]       — optional extra CSS class on the <img>
 */
function injectCardImage(card, containerEl, cls) {
  loadCardImage(card, url => {
    const img    = document.createElement('img');
    img.src      = url;
    img.alt      = card.abbr || card.term;
    img.className = ['card-img', cls].filter(Boolean).join(' ');
    containerEl.classList.add('card-image-wrap');
    containerEl.appendChild(img);
  });
}
