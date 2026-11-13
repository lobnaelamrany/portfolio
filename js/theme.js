/* ============================================
   THEME — light / dark toggle + persistence
   ============================================ */

(function () {
  'use strict';

  const STORAGE_KEY = 'theme';
  const root = document.documentElement;

  /**
   * Get the initial theme:
   * 1. localStorage value
   * 2. OS preference
   * 3. fallback: light
   */
  function getInitialTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;

    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);

    // Update toggle button state for screen readers
    const toggle = document.getElementById('themeToggle');
    if (toggle) {
      const isDark = theme === 'dark';
      toggle.setAttribute(
        'aria-label',
        isDark ? 'Switch to light mode' : 'Switch to dark mode'
      );
    }
  }

  function toggleTheme() {
    const current = root.getAttribute('data-theme') || 'light';
    applyTheme(current === 'light' ? 'dark' : 'light');
  }

  // Apply immediately (avoid FOUC — inline script in <head> already set it,
  // but this ensures consistency if state was changed externally)
  applyTheme(getInitialTheme());

  // Wire up the toggle button
  document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.getElementById('themeToggle');
    if (toggle) {
      toggle.addEventListener('click', toggleTheme);
    }
  });

  // Listen to OS theme changes (only if user hasn't explicitly chosen)
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  media.addEventListener('change', function (e) {
    if (!localStorage.getItem(STORAGE_KEY)) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
})();