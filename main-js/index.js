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

    
document.addEventListener('DOMContentLoaded', function() {
    // Données de démonstration
    const logData = {
        "log-001": {
            "date": "04/04/2024 13:55:12",
            "type": "Info",
            "user": {
                "name": "Jean Dupont",
                "email": "jean.dupont@example.com",
                "initials": "JD"
            },
            "source": "API",
            "message": "Connexion API réussie - Token généré\n\nDétails supplémentaires:\n- Méthode: POST /api/auth/login\n- IP: 192.168.1.45\n- User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36\n- Durée: 142ms",
            "tags": ["authentification", "api", "succès"],
            "metrics": {
                "httpStatus": 200,
                "responseTime": 142,
                "serverLoad": 72
            },
            "stackTrace": null
        },
        "log-002": {
            "date": "04/04/2024 13:50:34",
            "type": "Warning",
            "user": {
                "name": "Marie Martin",
                "email": "marie.martin@example.com",
                "initials": "MM"
            },
            "source": "Backend",
            "message": "Utilisation mémoire élevée (92%) - Serveur backend-01\n\nDétails:\n- Mémoire totale: 16GB\n- Mémoire utilisée: 14.7GB\n- Processus principal: node (3.2GB)\n- Recommandation: Vérifier les fuites mémoire ou augmenter la capacité",
            "tags": ["performance", "mémoire", "warning"],
            "metrics": {
                "httpStatus": null,
                "responseTime": null,
                "serverLoad": 92
            },
            "stackTrace": "Warning: mémoire insuffisante détectée\n    at MemoryMonitor.checkUsage (/app/src/utils/monitoring.js:45:15)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)"
        },
        "log-003": {
            "date": "04/04/2024 13:45:56",
            "type": "Error",
            "user": {
                "name": "Jean Dupont",
                "email": "jean.dupont@example.com",
                "initials": "JD"
            },
            "source": "Database",
            "message": "Échec sauvegarde base de données - Espace disque insuffisant\n\nDétails de l'erreur:\n- Base de données: mysql_prod\n- Taille requise: 12GB\n- Espace disponible: 120MB\n- Script: /scripts/backup_db.sh\n\nAction requise: Libérer de l'espace disque ou étendre le volume",
            "tags": ["base-de-données", "sauvegarde", "erreur"],
            "metrics": {
                "httpStatus": 500,
                "responseTime": null,
                "serverLoad": 68
            },
            "stackTrace": "Error: Espace disque insuffisant\n    at DatabaseBackup.execute (/app/src/services/db/backup.js:127:23)\n    at async main (/scripts/backup_db.js:15:20)"
        },
        "log-004": {
            "date": "03/04/2024 22:15:42",
            "type": "Critical",
            "user": {
                "name": "System",
                "email": null,
                "initials": "S"
            },
            "source": "Backend",
            "message": "Crash application - Exception non gérée dans le module payment\n\nImpact:\n- Service payment indisponible\n- 42 transactions interrompues\n- Temps d'indisponibilité: 8 minutes\n\nCause racine: Référence null dans PaymentProcessor.validateCard()",
            "tags": ["crash", "payment", "critique"],
            "metrics": {
                "httpStatus": null,
                "responseTime": null,
                "serverLoad": null
            },
            "stackTrace": "CriticalError: Cannot read properties of null (reading 'cardNumber')\n    at PaymentProcessor.validateCard (/app/src/services/payment/processor.js:215:32)\n    at PaymentController.process (/app/src/controllers/payment.js:89:28)\n    at async Router.execute (/app/src/router.js:156:20)\n    at async Server.handleRequest (/app/src/server.js:45:17)"
        }
    };

    // Filtrage avancé des logs
    function applyFilters() {
        const type = document.getElementById('filterType').value;
        const user = document.getElementById('filterUser').value;
        const dateStart = document.getElementById('filterDateStart').value;
        const dateEnd = document.getElementById('filterDateEnd').value;
        const source = document.getElementById('filterSource').value;

        document.querySelectorAll('#logsTable tbody tr').forEach(tr => {
            const trType = tr.getAttribute('data-type');
            const trUser = tr.getAttribute('data-user');
            const trDate = tr.getAttribute('data-date');
            const trSource = tr.getAttribute('data-source');

            const typeMatch = !type || trType === type;
            const userMatch = !user || trUser === user;
            const dateMatch = (!dateStart || trDate >= dateStart) && (!dateEnd || trDate <= dateEnd);
            const sourceMatch = !source || trSource === source;

            tr.style.display = typeMatch && userMatch && dateMatch && sourceMatch ? '' : 'none';
        });
    }

    // Réinitialisation des filtres
    document.getElementById('resetFilters').addEventListener('click', function() {
        document.getElementById('filterType').value = '';
        document.getElementById('filterUser').value = '';
        document.getElementById('filterDateStart').value = '';
        document.getElementById('filterDateEnd').value = '';
        document.getElementById('filterSource').value = '';
        applyFilters();
    });

    // Écouteurs d'événements pour les filtres
    document.querySelectorAll('#filterType, #filterUser, #filterDateStart, #filterDateEnd, #filterSource').forEach(el => {
        el.addEventListener('change', applyFilters);
    });

    // Gestion du modal de détails
    const logModal = document.getElementById('logModal');
    if (logModal) {
        logModal.addEventListener('show.bs.modal', function(event) {
            const button = event.relatedTarget;
            const logId = button.getAttribute('data-log-id');
            const log = logData[logId];

            if (!log) return;

            // Mise à jour des informations de base
            document.getElementById('logModalType').textContent = log.type;
            document.getElementById('logModalType').className = `badge fs-6 ${
                log.type === 'Info' ? 'bg-log-info text-info' : 
                log.type === 'Warning' ? 'bg-log-warning text-warning' : 
                log.type === 'Error' ? 'bg-log-error text-danger' : 'bg-log-critical text-white'
            }`;
            
            document.getElementById('logModalDate').textContent = log.date;
            document.getElementById('logModalSource').textContent = `Source: ${log.source}`;
            
            // Mise à jour des informations utilisateur
            const userElement = document.getElementById('logModalUser');
            userElement.innerHTML = `
                <div class="avatar me-3">
                    <div class="avatar-title ${!log.user.email ? 'bg-secondary' : 'bg-primary'} rounded-circle">
                        ${log.user.initials}
                    </div>
                </div>
                <div>
                    <div>${log.user.name}</div>
                    ${log.user.email ? `<small class="text-muted">${log.user.email}</small>` : ''}
                </div>
            `;
            
            // Mise à jour des tags
            const tagsContainer = document.getElementById('logModalTags');
            tagsContainer.innerHTML = log.tags.map(tag => 
                `<span class="badge bg-secondary me-1 mb-1">${tag}</span>`
            ).join('');
            
            // Mise à jour du message
            document.getElementById('logModalMessage').textContent = log.message;
            
            // Mise à jour de la stack trace
            const stackTraceElement = document.getElementById('logModalStackTrace');
            stackTraceElement.innerHTML = log.stackTrace ? 
                `<code class="language-plaintext">${log.stackTrace}</code>` : 
                '<em class="text-muted">Aucune stack trace disponible</em>';
            
            // Mise à jour des métriques (simulée)
            // Dans une vraie application, vous utiliseriez les données réelles de log.metrics
        });
    }

    // Simulation d'actualisation
    document.querySelector('.btn-refresh').addEventListener('click', function() {
        const btn = this;
        btn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Actualisation...';
        
        setTimeout(() => {
            btn.innerHTML = '<i class="bi bi-arrow-clockwise"></i> Actualiser';
            document.getElementById('lastUpdateTime').textContent = new Date().toLocaleTimeString();
            
            // Ici vous pourriez ajouter une requête AJAX pour actualiser les données
            // Pour cette démo, nous simulons juste un changement visuel
            const randomLogs = Math.floor(Math.random() * 50) + 200;
            document.getElementById('totalLogs').textContent = randomLogs;
        }, 1500);
    });

    // Initialisation
    applyFilters();
    document.getElementById('lastUpdateTime').textContent = new Date().toLocaleTimeString();
});


/* =============Js pour mes alerte =======================*/


     function acquitter(btn) {
        const row = btn.closest('tr');
        row.classList.add('table-success');
        setTimeout(() => row.remove(), 1000);
    }

    function filterTable() {
        const filter = document.getElementById('severityFilter').value.toLowerCase();
        const rows = document.querySelectorAll('#alertesTable tbody tr');
        rows.forEach(row => {
            const severity = row.cells[1].textContent.trim().toLowerCase();
            row.style.display = !filter || severity.includes(filter) ? '' : 'none';
        });
    }

    document.getElementById('searchInput').addEventListener('input', function () {
        const search = this.value.toLowerCase();
        document.querySelectorAll('#alertesTable tbody tr').forEach(row => {
            row.style.display = row.innerText.toLowerCase().includes(search) ? '' : 'none';
        });
    });

    function exportCSV() {
        let csv = "Type,Gravité,Heure,Description\n";
        document.querySelectorAll('#alertesTable tbody tr').forEach(row => {
            if (row.style.display !== 'none') {
                const cols = row.querySelectorAll('td');
                csv += `${cols[0].innerText},${cols[1].innerText},${cols[2].innerText},${cols[3].innerText}\n`;
            }
        });
        const blob = new Blob([csv], {type: "text/csv;charset=utf-8;"});
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "alertes.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // Données du graphique
    new Chart(document.getElementById('chart'), {
        type: 'bar',
        data: {
            labels: ['Critique', 'Majeure', 'Mineure'],
            datasets: [{
                label: 'Nombre d\'alertes',
                data: [1, 1, 1],
                backgroundColor: ['#dc3545', '#ffc107', '#0d6efd']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false },
                title: { display: true, text: 'Répartition des alertes' }
            }
        }
    });
  

