/* =============================================
   OGAKEN FITNESS – script.js
   ============================================= */

// ---------- Header scroll ----------
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  if (currentScroll > 60) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  lastScroll = currentScroll;
}, { passive: true });

// ---------- Mobile menu ----------
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuClose = document.getElementById('mobileMenuClose');
const overlay = document.getElementById('overlay');
const mLinks = document.querySelectorAll('.m-link');

function openMenu() {
  mobileMenu.classList.add('open');
  overlay.classList.add('active');
  hamburger.classList.add('active');
  mobileMenu.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  mobileMenu.classList.remove('open');
  overlay.classList.remove('active');
  hamburger.classList.remove('active');
  mobileMenu.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
});
mobileMenuClose.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);
mLinks.forEach(link => link.addEventListener('click', closeMenu));

// ---------- Smooth scroll for all anchor links ----------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 68; // header height
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ---------- Scroll animations (Intersection Observer) ----------
const animEls = document.querySelectorAll('.fade-in, .fade-up');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

animEls.forEach(el => observer.observe(el));

// Trigger hero animations on load
window.addEventListener('load', () => {
  document.querySelectorAll('.hero .fade-in').forEach(el => {
    el.classList.add('is-visible');
  });
});

// ---------- Floating CTA ----------
const floatCta = document.getElementById('floatCta');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    floatCta.classList.add('visible');
    floatCta.setAttribute('aria-hidden', 'false');
  } else {
    floatCta.classList.remove('visible');
    floatCta.setAttribute('aria-hidden', 'true');
  }
}, { passive: true });

// ---------- Contact form ----------
// FormSubmit.co handles submission and redirects to thanks.html
