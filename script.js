/* =====================================================
   PlayZone — Landing Page Scripts
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Navbar: solid background on scroll ---------- */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('is-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.classList.toggle('is-active', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close mobile menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.classList.remove('is-active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- Highlight active nav link based on section in view ---------- */
  const sections = ['home', 'fields', 'about', 'contact']
    .map(id => document.getElementById(id))
    .filter(Boolean);

  const navAnchors = Array.from(navLinks.querySelectorAll('.nav-link'));

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navAnchors.forEach(a => {
          a.classList.toggle('active-link', a.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-45% 0px -45% 0px' });

  sections.forEach(sec => sectionObserver.observe(sec));

  /* ---------- Scroll reveal animations ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // slight stagger for elements revealed together
        setTimeout(() => entry.target.classList.add('is-visible'), i * 40);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- Contact form validation ---------- */
  const form = document.getElementById('contactForm');
  const successMsg = document.getElementById('formSuccess');

  const fields = {
    name: { el: document.getElementById('name'), errorEl: document.getElementById('nameError') },
    email: { el: document.getElementById('email'), errorEl: document.getElementById('emailError') },
    message: { el: document.getElementById('message'), errorEl: document.getElementById('messageError') },
  };

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setError(field, message) {
    field.el.closest('.form-group').classList.add('has-error');
    field.errorEl.textContent = message;
  }

  function clearError(field) {
    field.el.closest('.form-group').classList.remove('has-error');
    field.errorEl.textContent = '';
  }

  function validate() {
    let isValid = true;

    if (fields.name.el.value.trim().length < 2) {
      setError(fields.name, 'Please enter your name.');
      isValid = false;
    } else {
      clearError(fields.name);
    }

    if (!emailPattern.test(fields.email.el.value.trim())) {
      setError(fields.email, 'Please enter a valid email.');
      isValid = false;
    } else {
      clearError(fields.email);
    }

    if (fields.message.el.value.trim().length < 5) {
      setError(fields.message, 'Message is too short.');
      isValid = false;
    } else {
      clearError(fields.message);
    }

    return isValid;
  }

  // Clear individual field errors as the user types
  Object.values(fields).forEach(field => {
    field.el.addEventListener('input', () => clearError(field));
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    successMsg.classList.remove('is-visible');

    if (validate()) {
      successMsg.classList.add('is-visible');
      form.reset();
      setTimeout(() => successMsg.classList.remove('is-visible'), 5000);
    }
  });

  /* ---------- Footer year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

});