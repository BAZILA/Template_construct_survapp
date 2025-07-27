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
/* =============pour afficher et cacher le mot de passe et stimulation d'ajput plus gestion du modal  =======================*/
const showPasswordIcons = document.querySelectorAll('.password-toggle');
const addUserForm = document.getElementById('addUserForm');
const addUserModalEl = document.getElementById('addUserModal');
const addUserModal = bootstrap.Modal.getInstance(addUserModalEl) || new bootstrap.Modal(addUserModalEl);

// Gérer les yeux pour afficher/masquer les mots de passe bon vous même vous le savez déjà
showPasswordIcons.forEach(icon => {
  icon.addEventListener('click', function () {
    const target = document.querySelector(this.dataset.target);
    const isPassword = target.type === 'password';
    target.type = isPassword ? 'text' : 'password';
    this.classList.toggle('bi-eye');
    this.classList.toggle('bi-eye-slash');
  });
});

// Simulation de l’ajout essayer de voir
if (addUserForm) {
  addUserForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const prenom = document.getElementById('prenom').value;
    const nom = document.getElementById('nom').value;
    const email = document.getElementById('email').value;
    const role = document.getElementById('role').value;
    const etat = document.getElementById('etat').value;

    console.log("Utilisateur ajouté (simulation) :", {
      prenom, nom, email, role, etat
    });

    alert(`Utilisateur ${prenom} ${nom} a été simulé comme ajouté haha !`);

    addUserModal.hide();
    this.reset();
  });
}
/* =============pour stimuler l'ajout d'un role  =======================*/
document.getElementById('roleForm').addEventListener('submit', function (e) {
  e.preventDefault();
  alert("Rôle enregistré (simulation)");
  const modal = bootstrap.Modal.getInstance(document.getElementById('roleModal'));
  if (modal) modal.hide();
});

/* =============Js pour mes services   =======================*/
 // Données fictives de dépendances
    const serviceDeps = {
      'HTTP': ['web-server-01', 'web-server-02'],
      'FTP': ['web-server-01', 'backup-server'],
      'SSH': ['db-server-01', 'db-server-02']
    };
    // Données fictives d'historique d'incidents
    const serviceHistory = {
      'HTTP': { labels: Array.from({length: 12}, (_, i) => `${i+1}h`), data: [0,0,1,0,0,0,1,0,0,0,0,0] },
      'FTP': { labels: Array.from({length: 12}, (_, i) => `${i+1}h`), data: [0,1,0,0,0,1,0,0,0,0,0,0] },
      'SSH': { labels: Array.from({length: 12}, (_, i) => `${i+1}h`), data: [1,1,1,0,0,0,0,0,0,0,0,0] }
    };
    let serviceHistoryChart;
    // Dépendances
    window.showDepsModal = function(service) {
      const deps = serviceDeps[service] || [];
      let html = '<ul>';
      deps.forEach(dep => { html += `<li>${dep}</li>`; });
      html += '</ul>';
      document.getElementById('depsBody').innerHTML = html;
      document.getElementById('depsModalLabel').textContent = `Dépendances de ${service}`;
      var modal = new bootstrap.Modal(document.getElementById('depsModal'));
      modal.show();
    }
    // Historique incidents
    window.showHistoryModal = function(service) {
      const data = serviceHistory[service];
      setTimeout(() => {
        if(serviceHistoryChart) serviceHistoryChart.destroy();
        const ctx = document.getElementById('serviceHistoryChart').getContext('2d');
        serviceHistoryChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: data.labels,
            datasets: [{
              label: 'Incidents',
              data: data.data,
              backgroundColor: data.data.map(v => v > 0 ? '#e74c3c' : '#2ecc71'),
              borderRadius: 4
            }]
          },
          options: { plugins: { legend: { display: false } }, scales: { x: { display: true }, y: { beginAtZero: true, stepSize: 1 } } }
        });
      }, 200);
      document.getElementById('historyModalLabel').textContent = `Historique des incidents - ${service}`;
      var modal = new bootstrap.Modal(document.getElementById('historyModal'));
      modal.show();
    }
    // Actions rapides
    let currentAction = null;
    let currentService = null;
    window.showActionModal = function(action, service) {
      currentService = service;
      currentAction = action;
      document.getElementById('actionBody').innerHTML = `Confirmer l'action <b>${currentAction}</b> sur le service <b>${currentService}</b> ?`;
      var modal = new bootstrap.Modal(document.getElementById('actionModal'));
      modal.show();
    }
    document.getElementById('confirmActionBtn').addEventListener('click', function() {
      // Simule l'action (affiche un message de succès)
      document.getElementById('actionBody').innerHTML = `<span style='color:#2ecc71;'>Action ${currentAction} effectuée sur ${currentService} !</span>`;
      setTimeout(() => {
        var modal = bootstrap.Modal.getInstance(document.getElementById('actionModal'));
        modal.hide();
      }, 1200);
    });

    /* =============Js pour mes rapports  =======================*/

    document.querySelectorAll('.btn-action[data-bs-toggle="modal"]').forEach(btn => {
      btn.addEventListener('click', function() {
        const title = this.getAttribute('data-title');
        const content = this.getAttribute('data-content');
        document.getElementById('rapportModalLabel').textContent = title;
        document.getElementById('rapportPreviewBody').textContent = content;
      });
    });

    /* =============Js pour mes logs  =======================*/

    // Filtres
    function filterLogs() {
      const type = document.getElementById('filterType').value;
      const user = document.getElementById('filterUser').value;
      const date = document.getElementById('filterDate').value;
      document.querySelectorAll('#logsTable tbody tr').forEach(tr => {
        let show = true;
        if(type && tr.getAttribute('data-type') !== type) show = false;
        if(user && tr.getAttribute('data-user') !== user) show = false;
        if(date && tr.getAttribute('data-date') !== date) show = false;
        tr.style.display = show ? '' : 'none';
      });
    }
    document.getElementById('filterType').addEventListener('change', filterLogs);
    document.getElementById('filterUser').addEventListener('change', filterLogs);
    document.getElementById('filterDate').addEventListener('change', filterLogs);
    // Détail log
    document.querySelectorAll('.btn-log-details').forEach(btn => {
      btn.addEventListener('click', function() {
        const date = this.getAttribute('data-date');
        const type = this.getAttribute('data-type');
        const user = this.getAttribute('data-user');
        const message = this.getAttribute('data-message');
        document.getElementById('logDetailBody').innerHTML = `
          <p><strong>Date :</strong> ${date}</p>
          <p><strong>Type :</strong> ${type}</p>
          <p><strong>Utilisateur :</strong> ${user}</p>
          <p><strong>Message :</strong> ${message}</p>
        `;
      });
    });



    
  

