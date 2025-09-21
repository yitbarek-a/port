// main.js — menu, scroll reveal, youtube lazy-load, parallax
document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      const expanded = mobileBtn.getAttribute('aria-expanded') === 'true';
      mobileBtn.setAttribute('aria-expanded', String(!expanded));
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Scroll reveal using IntersectionObserver
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach((el, idx) => {
    const d = el.dataset.revealDelay || (idx * 60);
    el.style.setProperty('--delay', `${d}ms`);
    io.observe(el);
  });

  // Lazy-load YouTube on click
  const ytPlaceholders = document.querySelectorAll('.yt-placeholder');
  ytPlaceholders.forEach(ph => {
    const id = ph.dataset.videoId;
    if (!id) return;
    const load = () => {
      const iframe = document.createElement('iframe');
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
      iframe.setAttribute('allowfullscreen', '');
      iframe.src = `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&showinfo=0&autoplay=1`;
      ph.innerHTML = '';
      ph.appendChild(iframe);
    };
    ph.addEventListener('click', load);
    ph.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); load(); } });
  });

  // subtle parallax for profile image (desktop only)
  const hero = document.querySelector('.hero');
  const profileImg = document.querySelector('.profile-img');
  if (hero && profileImg && window.innerWidth >= 768) {
    hero.addEventListener('mousemove', (e) => {
      const r = hero.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      profileImg.style.transform = `translate(${x * 10}px, ${y * 8}px) rotate(${x * 3}deg)`;
    });
    hero.addEventListener('mouseleave', () => profileImg.style.transform = 'translate(0,0) rotate(0)');
  }
});
