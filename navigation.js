// Navigation and UI controls
export const initNavigation = () => {
  // Mobile navigation
  const initMobileNav = () => {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const body = document.body;
    const navLinks = document.querySelectorAll('nav ul li a');

    if (hamburgerMenu) {
      hamburgerMenu.addEventListener('click', () => {
        body.classList.toggle('mobile-nav-open');
      });
    }

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        body.classList.remove('mobile-nav-open');
      });
    });
  };

  // Smooth scrolling
  const initSmoothScroll = () => {
    document.querySelectorAll('nav a').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href')?.substring(1);
        if (!targetId) return;

        const target = document.getElementById(targetId);
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 70,
            behavior: 'smooth'
          });
        }
      });
    });
  };

  // Window resize handler
  const initResizeHandler = () => {
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        document.body.classList.remove('mobile-nav-open');
      }
    });
  };

  return {
    initMobileNav,
    initSmoothScroll,
    initResizeHandler
  };
};