// Charts and statistics initialization
export const initCharts = () => {
  // CountUp initialization
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

  // Chart.js initialization
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

  return {
    initCountUp,
    initChart
  };
};