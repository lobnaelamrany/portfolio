/* ============================================
   I18N — language switching (EN / DE)
   ============================================ */

(function () {
  'use strict';

  const STORAGE_KEY = 'lang';
  const SUPPORTED = ['en', 'de'];
  const root = document.documentElement;

  /**
   * Determine initial language:
   * 1. localStorage
   * 2. navigator.language (de-* → de)
   * 3. fallback: en
   */
  function getInitialLang() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED.includes(saved)) return saved;

    const browserLang = (navigator.language || 'en').slice(0, 2).toLowerCase();
    return browserLang === 'de' ? 'de' : 'en';
  }

  /**
   * Translate all elements with data-i18n attributes.
   * - data-i18n="key"           → sets textContent
   * - data-i18n-attr="attr:key" → sets attribute (e.g. aria-label, placeholder)
   */
  function translate(lang) {
    const dict = (window.translations && window.translations[lang]) || {};

    // Text content
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      const key = el.getAttribute('data-i18n');
      const value = dict[key];
      if (value !== undefined) {
        el.textContent = value;
      }
    });

    // Attribute translations (comma-separated: "attr:key,attr2:key2")
    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      const spec = el.getAttribute('data-i18n-attr');
      spec.split(',').forEach(function (pair) {
        const [attr, key] = pair.split(':').map(function (s) { return s.trim(); });
        const value = dict[key];
        if (attr && value !== undefined) {
          el.setAttribute(attr, value);
        }
      });
    });

    // Update <html lang>
    root.setAttribute('lang', lang);

    // Update <title> and meta description
    if (dict['meta.title']) {
      document.title = dict['meta.title'];
    }
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && dict['meta.description']) {
      metaDesc.setAttribute('content', dict['meta.description']);
    }

    // Update language switcher visual state
    document.querySelectorAll('[data-lang]').forEach(function (el) {
      el.classList.toggle('lang-active', el.getAttribute('data-lang') === lang);
    });

    // Persist
    localStorage.setItem(STORAGE_KEY, lang);
  }

  function setLang(lang) {
    if (!SUPPORTED.includes(lang)) return;
    translate(lang);
  }

  // Initialize on load
  document.addEventListener('DOMContentLoaded', function () {
    const initial = getInitialLang();
    translate(initial);

    const switchBtn = document.getElementById('langSwitch');
    if (switchBtn) {
      switchBtn.addEventListener('click', function () {
        const current = root.getAttribute('lang') || 'en';
        setLang(current === 'en' ? 'de' : 'en');
      });
    }
  });

  // Expose for other scripts if needed
  window.setLanguage = setLang;
})();