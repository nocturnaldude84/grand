const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');

menuToggle?.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  mobileNav.setAttribute('aria-hidden', String(!open));
});

document.querySelectorAll('.mobile-nav a').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    mobileNav?.setAttribute('aria-hidden', 'true');
  });
});

document.querySelectorAll('[data-controls]').forEach(control => {
  const name = control.dataset.controls;
  const carousel = document.querySelector(`[data-carousel="${name}"]`);
  const prev = control.querySelector('[data-prev]');
  const next = control.querySelector('[data-next]');
  if (!carousel) return;

  const move = direction => {
    const amount = carousel.clientWidth * 0.72;
    carousel.scrollBy({ left: direction * amount, behavior: 'smooth' });
  };

  prev?.addEventListener('click', () => move(-1));
  next?.addEventListener('click', () => move(1));
});

const whatsappNumber = '919999999999';
const whatsappMessage = encodeURIComponent('Hi, I saw your furniture collection and would like to know more.');

document.querySelectorAll('[data-whatsapp]').forEach(link => {
  link.href = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
});

document.getElementById('year').textContent = new Date().getFullYear();
