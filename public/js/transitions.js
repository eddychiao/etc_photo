document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="/"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');

      // Normalise both paths (strip trailing slashes) to avoid false reloads
      const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
      const targetPath  = href.replace(/\/$/, '') || '/';
      if (targetPath === currentPath) return;

      e.preventDefault();

      // Fade only the page content — nav stays visible
      const targets = [
        document.querySelector('main'),
        document.querySelector('.landing-socials'),
      ].filter(Boolean);

      targets.forEach(el => {
        el.style.transition = 'opacity 0.18s ease';
        el.style.opacity = '0';
      });

      setTimeout(() => { window.location.href = href; }, 180);
    });
  });
});
