(() => {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const supportsObserver = 'IntersectionObserver' in window;
  const blocks = [...document.querySelectorAll('[data-reveal]')];

  if (supportsObserver && !reducedMotion) {
    document.documentElement.classList.add('js');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -35px 0px', threshold: 0.04 });
    blocks.forEach(el => observer.observe(el));
  } else {
    blocks.forEach(el => el.classList.add('is-visible'));
  }

  const hero = document.querySelector('.hero');
  const footer = document.querySelector('.join');
  const updateMobileCTA = () => {
    if (!hero || !footer) return;
    const pastHero = hero.getBoundingClientRect().bottom < 0;
    const atFinalRegistration = footer.getBoundingClientRect().top < innerHeight * .85;
    document.body.classList.toggle('show-floating-cta', pastHero && !atFinalRegistration);
  };
  addEventListener('scroll', updateMobileCTA, { passive: true });
  addEventListener('resize', updateMobileCTA, { passive: true });
  updateMobileCTA();

  // No fictitious scarcity timer, registration form, or analytics is inserted.
  // Registration uses the existing approved external destination.
})();
