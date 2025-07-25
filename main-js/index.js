document.addEventListener('DOMContentLoaded', () => {
  // ======= Chart 1 : Réseau (Line) =======
  const networkCtx = document.getElementById('networkChart')
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
    })
  }

  // ======= Chart 2 : Historique (Bar) =======
  const historiqueCtx = document.getElementById('historiqueChart')
  if (historiqueCtx) {
    const historiqueChart = new Chart(historiqueCtx.getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
        datasets: [
          {
            label: 'Nombre d’incidents',
            data: [4, 2, 7, 1, 3, 5, 6],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            borderRadius: 4,
            barThickness: 30
          }
        ]
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
    })
  }
  /* =============gestion des onglets sur l'interface ... ça comme ici les gars =======================*/

  const links = document.querySelectorAll('.sidebar a[data-target]')
  const sections = document.querySelectorAll('.page-section')

  links.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault()
      const targetId = this.getAttribute('data-target')

      // ici on met juste cette classe  "active"  sur les liens
      links.forEach(l => l.classList.remove('active'))
      this.classList.add('active')

      // Masquer toutes les sections .... vosu même vous comprendrez 
      sections.forEach(section => section.classList.add('d-none'))

      // Afficher la bonne section....blablabla ...;
      const targetSection = document.getElementById(targetId)
      if (targetSection) {
        targetSection.classList.remove('d-none')
      }
    })
  })

  // Charger la section "accueil" par défaut plutot mieux pour éviter les problème 
  const defaultLink = document.querySelector(
    '.sidebar a[data-target="accueil"]'
  )
  if (defaultLink) defaultLink.click()
})


/* =============gestion de l'ajout d'un hôte... ça comme ici les gars vous comprendrez  =======================*/

const scanButton = document.getElementById('scanButton');
const hostList = document.getElementById('host-list');
const hostFormZone = document.getElementById('host-form-zone');
const hostNameInput = document.getElementById('hostName');
const hostIPInput = document.getElementById('hostIP');
const form = document.getElementById('host-form');

const fakeHosts = [
  { name: "web-server-01", ip: "192.168.1.10" },
  { name: "db-server-01", ip: "192.168.1.20" },
  { name: "file-server-01", ip: "192.168.1.30" },
];

scanButton.addEventListener('click', () => {
  hostList.innerHTML = "";
  fakeHosts.forEach(host => {
    const item = document.createElement('button');
    item.className = "list-group-item list-group-item-action";
    item.textContent = `${host.name} (${host.ip})`;
    item.addEventListener('click', () => {
      hostNameInput.value = host.name;
      hostIPInput.value = host.ip;
      hostFormZone.classList.remove('d-none');
    });
    hostList.appendChild(item);
  });
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    alert("Formulaire capturé les  gars comme on n'a pas de backend pour s'assurer la hahaha..rire ! ");

    const modal = bootstrap.Modal.getInstance(document.getElementById('addHostModal'));
    if (modal) modal.hide();
  });
});

/*<============================Graphique de performance===================================>*/
 const graph1=document.getElementById("diagram");
 graph1.addEventListener("click",()=>{
  console.log("Hello")
 })


