/**
 * shared.js
 * ─────────────────────────────────────────────────────────────
 * LCA ICT — Shared JS: theme toggle + nav hamburger.
 * Loaded on EVERY page. Theme key is 'lca-ict-theme'.
 * ─────────────────────────────────────────────────────────────
 */

const THEME_KEY = 'lca-ict-theme';

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

document.addEventListener('DOMContentLoaded', () => {
  // Theme button
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.addEventListener('click', toggleTheme);

  // Hamburger nav toggle (mobile)
  const burger = document.getElementById('nav-hamburger');
  const links  = document.querySelector('.nav-links');
  if (burger && links) {
    burger.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('.nav-link:not(.nav-disabled)')
      .forEach(l => l.addEventListener('click', () => links.classList.remove('open')));
  }
});
