/* ============================================
   MAIN — nav, smooth scroll, accordion, scrollspy
   ============================================ */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    /* ---------- MOBILE MENU ---------- */
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
      menuToggle.addEventListener('click', function () {
        const isOpen = mainNav.classList.toggle('is-open');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        menuToggle.setAttribute(
          'aria-label',
          isOpen ? 'Close menu' : 'Open menu'
        );
        // Prevent body scroll when menu is open
        document.body.style.overflow = isOpen ? 'hidden' : '';
      });

      // Close menu when clicking a nav link
      mainNav.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          mainNav.classList.remove('is-open');
          menuToggle.setAttribute('aria-expanded', 'false');
          menuToggle.setAttribute('aria-label', 'Open menu');
          document.body.style.overflow = '';
        });
      });

      // Close menu on Escape
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && mainNav.classList.contains('is-open')) {
          mainNav.classList.remove('is-open');
          menuToggle.setAttribute('aria-expanded', 'false');
          menuToggle.setAttribute('aria-label', 'Open menu');
          document.body.style.overflow = '';
          menuToggle.focus();
        }
      });
    }

    /* ---------- ACCORDION — close others when one opens ---------- */
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

    /* ---------- SCROLLSPY — highlight active nav link ---------- */
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

    /* ---------- SCROLL REVEAL (subtle fade-up) ---------- */
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReduced && 'IntersectionObserver' in window) {
      const revealTargets = document.querySelectorAll(
        '.section-header, .prose, .goal-card, .skill-group, ' +
        '.language-list li, .project-card, .timeline-item, ' +
        '.experience-card, .contact-list li'
      );

      revealTargets.forEach(function (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(12px)';
        el.style.transition = 'opacity 400ms cubic-bezier(0.16, 1, 0.3, 1), transform 400ms cubic-bezier(0.16, 1, 0.3, 1)';
      });

      const revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
      );

      revealTargets.forEach(function (el) {
        revealObserver.observe(el);
      });
    }

    /* ---------- FOOTER YEAR ---------- */
    const yearEl = document.getElementById('year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }

  });
})();