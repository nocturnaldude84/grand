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

const furnitureCarousel = document.getElementById('furniture-carousel');

if (furnitureCarousel && typeof Splide !== 'undefined') {
  const total = furnitureCarousel.querySelectorAll('.splide__slide').length;
  const totalEl = furnitureCarousel.querySelector('.furniture-total');
  const currentEl = furnitureCarousel.querySelector('.furniture-current');
  const prev = furnitureCarousel.querySelector('.furniture-prev');
  const next = furnitureCarousel.querySelector('.furniture-next');

  totalEl.textContent = String(total).padStart(2, '0');

  const splide = new Splide(furnitureCarousel, {
    type: 'slide',
    perPage: 1,
    perMove: 1,
    gap: '24px',
    padding: { left: '10%', right: '10%' },
    arrows: false,
    pagination: false,
    drag: true,
    speed: 750,
    easing: 'cubic-bezier(.22,.61,.36,1)',
    breakpoints: {
      800: { padding: { left: '0', right: '0' }, gap: '14px' }
    }
  });

  const updateCount = () => {
    currentEl.textContent = String(splide.index + 1).padStart(2, '0');
  };

  prev?.addEventListener('click', () => splide.go('<'));
  next?.addEventListener('click', () => splide.go('>'));
  splide.on('mounted move', updateCount);
  splide.mount();
}

const whatsappNumber = '919946594360';
const whatsappMessage = encodeURIComponent('Hi, I saw your furniture collection and would like to know more.');

document.querySelectorAll('[data-whatsapp]').forEach(link => {
  link.href = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
});

document.getElementById('year').textContent = new Date().getFullYear();
