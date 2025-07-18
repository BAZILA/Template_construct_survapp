document.addEventListener('DOMContentLoaded', () => {
  // ======= Chart 1 : Réseau (Line) =======
  const networkCtx = document.getElementById('networkChart');
  if (networkCtx) {
    const networkChart = new Chart(networkCtx.getContext('2d'), {
      type: 'line',
      data: {
        labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00'],
        datasets: [
          {
            label: 'Entrée (Mbps)',
            data: [10, 20, 15, 25, 20, 30],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.3,
            fill: true
          },
          {
            label: 'Sortie (Mbps)',
            data: [5, 15, 10, 20, 15, 25],
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            tension: 0.3,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: { display: false }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }

  // ======= Chart 2 : Historique (Bar) =======
  const historiqueCtx = document.getElementById('historiqueChart');
  if (historiqueCtx) {
    const historiqueChart = new Chart(historiqueCtx.getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
        datasets: [{
          label: 'Nombre d’incidents',
          data: [4, 2, 7, 1, 3, 5, 6],
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          borderRadius: 4,
          barThickness: 30
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: { stepSize: 1 }
          }
        },
        plugins: {
          legend: { display: true },
          tooltip: { mode: 'index', intersect: false }
        }
      }
    });
  }
});
