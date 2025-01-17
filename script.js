document.addEventListener('DOMContentLoaded', () => {
  // Improved error handling for server status checking
  const checkServerStatus = async () => {
    const statusIndicator = document.querySelector('.status-indicator');
    const statusText = document.querySelector('.status-text');
    const playerCount = document.querySelector('.player-count');
    
    if (!statusIndicator || !statusText || !playerCount) {
      console.warn('Status elements not found in DOM');
      return;
    }
    
    try {
      const response = await fetch('https://mcapi.us/server/status?ip=greencastle.es&port=25552');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      if (data.online) {
        statusIndicator.classList.remove('offline');
        statusIndicator.classList.add('online');
        statusText.textContent = 'Servidor Online';
        playerCount.textContent = `${data.players?.now || 0}/${data.players?.max || 0} jugadores`;
      } else {
        throw new Error('Server offline');
      }
    } catch (error) {
      console.error('Server status check failed:', error);
      statusIndicator.classList.remove('online');
      statusIndicator.classList.add('offline');
      statusText.textContent = 'Servidor Offline';
      playerCount.textContent = '0/0 jugadores';
    }
  };

  // Safe initialization of CountUp
  const initCountUp = () => {
    if (typeof CountUp === 'undefined') {
      console.warn('CountUp.js not loaded');
      return;
    }

    try {
      const counters = {
        totalPlayers: new CountUp('totalPlayers', 0, 1500, 0, 2.5, { separator: ',' }),
        uptime: new CountUp('uptime', 0, 30, 0, 2.5),
        gamemodes: new CountUp('gamemodes', 0, 12, 0, 2.5)
      };

      Object.values(counters).forEach(counter => {
        if (!counter.error) {
          counter.start();
        } else {
          console.error('CountUp error:', counter.error);
        }
      });
    } catch (error) {
      console.error('Error initializing counters:', error);
    }
  };

  // Safe initialization of Chart.js
  const initChart = () => {
    if (typeof Chart === 'undefined') {
      console.warn('Chart.js not loaded');
      return;
    }

    const ctx = document.getElementById('playerChart')?.getContext('2d');
    if (!ctx) {
      console.warn('Chart canvas not found');
      return;
    }

    try {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
          datasets: [{
            label: 'Jugadores Activos',
            data: [50, 150, 300, 450, 800, 1500],
            borderColor: '#2ac148',
            backgroundColor: 'rgba(42, 193, 72, 0.1)',
            tension: 0.4,
            fill: true
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: { color: 'rgba(255, 255, 255, 0.1)' },
              ticks: { color: '#ffffff' }
            },
            x: {
              grid: { color: 'rgba(255, 255, 255, 0.1)' },
              ticks: { color: '#ffffff' }
            }
          }
        }
      });
    } catch (error) {
      console.error('Error initializing chart:', error);
    }
  };

  // Safe initialization of Particles.js
  const initParticles = () => {
    if (typeof particlesJS === 'undefined') {
      console.warn('Particles.js not loaded');
      return;
    }

    try {
      particlesJS('particles-js', {
        particles: {
          number: { value: 50, density: { enable: true, value_area: 800 } },
          color: { value: "#2ac148" },
          shape: { type: "circle" },
          opacity: { value: 0.5, random: false },
          size: { value: 3, random: true },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#2ac148",
            opacity: 0.4,
            width: 1
          },
          move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: true, mode: "grab" },
            onclick: { enable: true, mode: "push" },
            resize: true
          }
        }
      });
    } catch (error) {
      console.error('Error initializing particles:', error);
    }
  };

  // Initialize all components
  checkServerStatus();
  setInterval(checkServerStatus, 30000);
  initCountUp();
  initChart();
  initParticles();

  // Gamemode carousel with error handling
  const initCarousel = () => {
    const slides = document.querySelectorAll('.gamemode-slide');
    if (slides.length === 0) return;

    let currentSlide = 0;
    const totalSlides = slides.length;

    const showSlide = (index) => {
      slides.forEach(slide => slide.classList.remove('active'));
      currentSlide = ((index % totalSlides) + totalSlides) % totalSlides;
      slides[currentSlide].classList.add('active');
    };

    // Event listeners for carousel controls
    document.querySelector('.next-btn')?.addEventListener('click', () => showSlide(currentSlide + 1));
    document.querySelector('.prev-btn')?.addEventListener('click', () => showSlide(currentSlide - 1));

    // Auto-advance carousel
    setInterval(() => showSlide(currentSlide + 1), 5000);
  };

  initCarousel();

  // Mobile navigation
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const body = document.body;
  const navLinks = document.querySelectorAll('nav ul li a');

  if (hamburgerMenu) {
    hamburgerMenu.addEventListener('click', () => {
      body.classList.toggle('mobile-nav-open');
    });
  }

  // Mobile menu functionality
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      body.classList.remove('mobile-nav-open');
    });
  });

  // Smooth scrolling with error handling
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

  // Intersection Observer for animations
  const initIntersectionObserver = () => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    document.querySelectorAll('section, .feature-box, .timeline-item').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      observer.observe(el);
    });
  };

  initIntersectionObserver();

  // Close mobile menu when resizing window beyond mobile breakpoint
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      body.classList.remove('mobile-nav-open');
    }
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (body.classList.contains('mobile-nav-open') && 
        !e.target.closest('nav') && 
        !e.target.closest('.hamburger-menu')) {
      body.classList.remove('mobile-nav-open');
    }
  });
});