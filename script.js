// === Theme Toggle ===
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// === Scroll-based nav background ===
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.boxShadow = window.scrollY > 20
    ? '0 4px 20px rgba(0,0,0,0.3)'
    : 'none';
});

// === Fade-in on scroll ===
const observer = new IntersectionObserver(
  (entries) => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  }),
  { threshold: 0.15 }
);

document.querySelectorAll(
  '.stat-card, .skill-category, .project-card, .about-text, .contact-form, .resume-wrapper'
).forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// === Animated counters ===
function animateCount(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1200;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, 16);
}

const statObserver = new IntersectionObserver(
  (entries) => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.stat-number').forEach(animateCount);
      statObserver.unobserve(e.target);
    }
  }),
  { threshold: 0.3 }
);

document.querySelectorAll('.about-stats').forEach(el => statObserver.observe(el));

// === Matrix hero background ===
const matrixBg = document.getElementById('matrixBg');
if (matrixBg) {
  const chars = '∑∫∂∇∆πθλφψωαβγδεζηιμνξρστυχ01∞≈≤≥±×÷';
  let text = '';
  for (let i = 0; i < 800; i++) {
    text += chars[Math.floor(Math.random() * chars.length)] + ' ';
  }
  matrixBg.textContent = text;
}

// === Resume upload preview ===
const resumeUpload = document.getElementById('resumeUpload');
const resumeFrame = document.getElementById('resumeFrame');
const resumePlaceholder = document.getElementById('resumePlaceholder');

if (resumeUpload) {
  resumeUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    resumeFrame.src = url;
    resumeFrame.style.display = 'block';
    resumePlaceholder.style.display = 'none';
  });
}

// === Contact form ===
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();

    if (!name || !email || !message) {
      formStatus.textContent = 'Please fill in all required fields.';
      formStatus.style.color = '#f87171';
      return;
    }

    // Placeholder: replace with your form backend (Formspree, EmailJS, etc.)
    formStatus.textContent = `Thanks, ${name}! Your message has been received. I'll be in touch soon.`;
    formStatus.style.color = 'var(--accent2)';
    contactForm.reset();
  });
}

// === Active nav link on scroll ===
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(a => a.classList.remove('active'));
        const link = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
        if (link) link.classList.add('active');
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach(s => navObserver.observe(s));
