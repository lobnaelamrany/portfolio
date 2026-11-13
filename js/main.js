(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    /* ---------- MOBILE MENU ---------- */
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');

    if (menuToggle && mainNav) {
      menuToggle.addEventListener('click', function () {
        const isOpen = mainNav.classList.toggle('is-open');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
        document.body.style.overflow = isOpen ? 'hidden' : '';
      });

      // إغلاق القائمة فوراً عند النقر على أي رابط
      mainNav.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          mainNav.classList.remove('is-open');
          menuToggle.setAttribute('aria-expanded', 'false');
          menuToggle.setAttribute('aria-label', 'Open menu');
          document.body.style.overflow = '';
        });
      });
    }

    /* ---------- ACCORDION ---------- */
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(function (card) {
      card.addEventListener('toggle', function () {
        if (card.open) {
          projectCards.forEach(function (other) {
            if (other !== card && other.open) {
              other.open = false;
            }
          });
        }
      });
    });

    /* ---------- SCROLLSPY ---------- */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');

    if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              const id = entry.target.getAttribute('id');
              navLinks.forEach(function (link) {
                link.classList.toggle(
                  'is-active',
                  link.getAttribute('href') === '#' + id
                );
              });
            }
          });
        },
        {
          rootMargin: '-40% 0px -55% 0px',
          threshold: 0
        }
      );
      sections.forEach(function (section) {
        observer.observe(section);
      });
    }

    /* ---------- FOOTER YEAR ---------- */
    const yearEl = document.getElementById('year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  });
})();
