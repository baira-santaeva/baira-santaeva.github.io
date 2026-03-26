/* =========================================
   COOKING PORTAL — script.js
   ========================================= */

// --- Navbar scroll shadow ----------------
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 10);
});

// --- Mobile hamburger menu ---------------
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// --- Typed hero tagline ------------------
const phrases = [
  'Fresh recipes every day.',
  'Cook something amazing tonight.',
  'Simple ingredients, big flavours.',
  'Explore cuisines from around the world.',
];
let phraseIdx = 0, charIdx = 0, deleting = false;
const typedEl = document.getElementById('typed-text');

function typeLoop() {
  const current = phrases[phraseIdx];
  if (!deleting) {
    typedEl.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
    }
  }
  setTimeout(typeLoop, deleting ? 45 : 75);
}
typeLoop();

// --- Newsletter form ---------------------
const nlForm   = document.getElementById('nl-form');
const nlStatus = document.getElementById('nl-status');

nlForm.addEventListener('submit', e => {
  e.preventDefault();
  const email = nlForm.querySelector('input[type="email"]').value.trim();
  if (!email) return;
  nlStatus.textContent = '🎉 Thanks for subscribing! Check your inbox soon.';
  nlForm.reset();
  setTimeout(() => { nlStatus.textContent = ''; }, 5000);
});

// --- Scroll-reveal animation -------------
const revealEls = document.querySelectorAll(
  '.recipe-card, .cat-card, .tip-card, .stat'
);

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeUp .5s ease forwards';
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

// Inject keyframe once
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);

revealEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.animationDelay = `${i * 60}ms`;
  observer.observe(el);
});
