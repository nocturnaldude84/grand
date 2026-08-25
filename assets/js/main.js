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

function setupCarousel(id, currentSelector, totalSelector, prevSelector, nextSelector) {
  const element = document.getElementById(id);
  if (!element || typeof Splide === 'undefined') return null;

  const slides = element.querySelectorAll('.splide__slide').length;
  const currentEl = element.querySelector(currentSelector);
  const totalEl = element.querySelector(totalSelector);
  const prev = element.querySelector(prevSelector);
  const next = element.querySelector(nextSelector);

  if (totalEl) totalEl.textContent = String(slides).padStart(2, '0');

  const splide = new Splide(element, {
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
    if (currentEl) currentEl.textContent = String(splide.index + 1).padStart(2, '0');
  };

  prev?.addEventListener('click', () => splide.go('<'));
  next?.addEventListener('click', () => splide.go('>'));
  splide.on('mounted move', updateCount);
  splide.mount();
  return splide;
}

setupCarousel('furniture-carousel', '.furniture-current', '.furniture-total', '.furniture-prev', '.furniture-next');
const videoSplide = setupCarousel('video-carousel', '.video-current', '.video-total', '.video-prev', '.video-next');

const videoSlides = [...document.querySelectorAll('#video-carousel .splide__slide')];

function updateVideoPlayback(activeIndex) {
  videoSlides.forEach((slide, index) => {
    const video = slide.querySelector('video');
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;

    if (index === activeIndex) {
      video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
    }
  });
}

if (videoSplide) {
  videoSplide.on('mounted', () => updateVideoPlayback(videoSplide.index));
  videoSplide.on('move', newIndex => updateVideoPlayback(newIndex));
}

document.querySelectorAll('#video-carousel video').forEach(video => {
  video.muted = true;
  video.defaultMuted = true;
  video.volume = 0;

  video.addEventListener('volumechange', () => {
    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;
  });

  video.addEventListener('click', event => {
    event.preventDefault();
    video.muted = true;
    video.volume = 0;
  });
});

const whatsappNumber = '919946594360';
const whatsappMessage = encodeURIComponent('Hi, I saw your furniture collection and would like to know more.');

document.querySelectorAll('[data-whatsapp]').forEach(link => {
  link.href = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
});

document.getElementById('year').textContent = new Date().getFullYear();
