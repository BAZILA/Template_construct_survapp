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
    { name: "web-server-01", ip: "192.168.1.10", service: "HTTP,SSH", disque: "80%", etat: "Up", cpu: "15%" },
    { name: "db-server-01", ip: "192.168.1.20", service: "MySQL", disque: "N/A", etat: "Down", cpu: "0%" },
    { name: "file-server-01", ip: "192.168.1.30", service: "FTP", disque: "60%", etat: "Up", cpu: "22%" },
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
document.addEventListener('DOMContentLoaded', function () {
    // Filtrage des services
    function filterServices() {
        const status = document.getElementById('filterStatus').value;
        const server = document.getElementById('filterServer').value;

        document.querySelectorAll('.service-card').forEach(card => {
            const cardStatus = card.querySelector('.badge').className.includes('bg-success') ? 'ok' :
                card.querySelector('.badge').className.includes('bg-warning') ? 'warning' :
                    card.querySelector('.badge').className.includes('bg-danger') ? 'error' : 'maintenance';

            const cardServer = card.querySelector('.text-muted').textContent;

            const statusMatch = !status || cardStatus === status;
            const serverMatch = !server || cardServer === server;

            card.parentElement.style.display = statusMatch && serverMatch ? 'block' : 'none';
        });
    }

    // Réinitialisation des filtres
    document.getElementById('resetFilters').addEventListener('click', function () {
        document.getElementById('filterStatus').value = '';
        document.getElementById('filterServer').value = '';
        filterServices();
    });

    // Écouteurs d'événements pour les filtres
    document.getElementById('filterStatus').addEventListener('change', filterServices);
    document.getElementById('filterServer').addEventListener('change', filterServices);

    // Simulation d'actualisation
    document.querySelector('.btn-refresh').addEventListener('click', function () {
        const btn = this;
        btn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Actualisation...';

        setTimeout(() => {
            btn.innerHTML = '<i class="bi bi-arrow-clockwise"></i> Actualiser';
            // Ici vous pourriez ajouter une requête AJAX pour actualiser les données
        }, 1500);
    });

    // Initialisation
    filterServices();
});
/* =============Js pour mes logs  =======================*/


document.addEventListener('DOMContentLoaded', function () {
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
    document.getElementById('resetFilters').addEventListener('click', function () {
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
        logModal.addEventListener('show.bs.modal', function (event) {
            const button = event.relatedTarget;
            const logId = button.getAttribute('data-log-id');
            const log = logData[logId];

            if (!log) return;

            // Mise à jour des informations de base
            document.getElementById('logModalType').textContent = log.type;
            document.getElementById('logModalType').className = `badge fs-6 ${log.type === 'Info' ? 'bg-log-info text-info' :
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
    document.querySelector('.btn-refresh').addEventListener('click', function () {
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

// Fonctions JavaScript pour les fonctionnalités
function filterTable() {
    // Implémentation du filtrage
}

function acquitter(btn) {
    const row = btn.closest('tr');
    row.querySelector('.badge.bg-warning').className = 'badge bg-success';
    row.querySelector('.badge.bg-warning').textContent = 'Acquittée';
    btn.disabled = true;
    btn.className = 'btn btn-sm btn-secondary me-1';
    // Ajouter une notification
    showToast('Alerte acquittée avec succès', 'success');
}

function showDetails(btn) {
    // Afficher les détails de l'alerte
    const row = btn.closest('tr');
    const type = row.cells[0].textContent;
    const severity = row.cells[1].textContent;
    const time = row.cells[2].textContent;
    const desc = row.cells[3].textContent;

    // Afficher dans un modal
    alert(`Détails de l'alerte:\n\nType: ${type}\nGravité: ${severity}\nHeure: ${time}\nDescription: ${desc}`);
}

function refreshAlerts() {
    // Simuler un rafraîchissement
    showToast('Alertes actualisées', 'info');
}

function clearFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('severityFilter').value = '';
    document.getElementById('typeFilter').value = '';
    document.getElementById('dateFilter').value = '';
    filterTable();
}

function showToast(message, type) {
    // Implémenter un système de toast (notification)
    console.log(`${type.toUpperCase()}: ${message}`);
}

// Gestion du modal de rapport
document.getElementById('rapportModal').addEventListener('show.bs.modal', function (event) {
    const button = event.relatedTarget;
    const title = button.getAttribute('data-title');
    document.getElementById('reportPreviewTitle').textContent = title;
});



/* =============Js pour mes carte reaux  =======================*/

const hosts = [
    { name: 'web-server-01', x: 100, y: 100, status: 'up', ip: '192.168.1.10', os: 'Linux' },
    { name: 'db-server-01', x: 500, y: 100, status: 'down', ip: '192.168.1.20', os: 'Windows' },
    { name: 'backup-server', x: 300, y: 250, status: 'unreachable', ip: '192.168.1.30', os: 'Linux' }
];
const links = [
    { from: 0, to: 1 },
    { from: 0, to: 2 },
    { from: 1, to: 2 }
];
const statusColor = { up: '#2ecc71', down: '#e74c3c', unreachable: '#f1c40f' };
// Dessin du schéma
const svg = document.getElementById('topoSvg');
// Lignes (liens)
links.forEach(link => {
    const h1 = hosts[link.from];
    const h2 = hosts[link.to];
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', h1.x);
    line.setAttribute('y1', h1.y);
    line.setAttribute('x2', h2.x);
    line.setAttribute('y2', h2.y);
    line.setAttribute('stroke', '#bfc9db');
    line.setAttribute('stroke-width', '3');
    svg.appendChild(line);
});
// Nœuds (hôtes)
hosts.forEach((host, i) => {
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    group.classList.add('topo-node');
    group.setAttribute('data-host', host.name);
    // Cercle
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', host.x);
    circle.setAttribute('cy', host.y);
    circle.setAttribute('r', 32);
    circle.setAttribute('fill', statusColor[host.status]);
    circle.setAttribute('stroke', '#23232e');
    circle.setAttribute('stroke-width', '4');
    group.appendChild(circle);
    // Label
    const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    label.setAttribute('x', host.x);
    label.setAttribute('y', host.y + 50);
    label.setAttribute('class', 'topo-label');
    label.textContent = host.name;
    svg.appendChild(group);
    svg.appendChild(label);
    // Clic sur le nœud
    group.addEventListener('click', function () {
        document.getElementById('hostDetailBody').innerHTML = `
          <p><strong>Nom :</strong> ${host.name}</p>
          <p><strong>Adresse IP :</strong> ${host.ip}</p>
          <p><strong>OS :</strong> ${host.os}</p>
          <p><strong>Statut :</strong> <span style='color:${statusColor[host.status]};font-weight:bold;'>${host.status.toUpperCase()}</span></p>
        `;
        document.getElementById('hostModalLabel').textContent = `Détail de ${host.name}`;
        var modal = new bootstrap.Modal(document.getElementById('hostModal'));
        modal.show();
    });
});

/* =============Js pour mes configuration  =======================*/
// Scripts améliorés
document.addEventListener('DOMContentLoaded', function () {
    // Configuration Form Validation
    const configForm = document.getElementById('configForm');
    if (configForm) {
        configForm.addEventListener('submit', function (e) {
            e.preventDefault();

            let isValid = true;

            // Validate CPU Threshold
            const cpuThreshold = document.getElementById('cpuThreshold');
            if (cpuThreshold.value < 1 || cpuThreshold.value > 100) {
                cpuThreshold.classList.add('is-invalid');
                isValid = false;
            } else {
                cpuThreshold.classList.remove('is-invalid');
            }

            // Validate RAM Threshold
            const ramThreshold = document.getElementById('ramThreshold');
            if (ramThreshold.value < 1 || ramThreshold.value > 100) {
                ramThreshold.classList.add('is-invalid');
                isValid = false;
            } else {
                ramThreshold.classList.remove('is-invalid');
            }

            // Validate Email
            const emailNotif = document.getElementById('emailNotif');
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailNotif.value)) {
                emailNotif.classList.add('is-invalid');
                isValid = false;
            } else {
                emailNotif.classList.remove('is-invalid');
            }

            // Validate Slack Webhook
            const slackWebhook = document.getElementById('slackWebhook');
            if (!slackWebhook.value.startsWith('https://')) {
                slackWebhook.classList.add('is-invalid');
                isValid = false;
            } else {
                slackWebhook.classList.remove('is-invalid');
            }

            if (isValid) {
                // Simulate save action
                document.getElementById('notifResult').innerHTML = `
                    <div class="alert alert-success">
                        <i class="bi bi-check-circle me-2"></i> Configuration enregistrée avec succès
                    </div>
                `;

                // Hide after 3 seconds
                setTimeout(() => {
                    document.getElementById('notifResult').innerHTML = '';
                }, 3000);
            }
        });

        // Test Notification Button
        document.getElementById('testNotifBtn').addEventListener('click', function () {
            document.getElementById('notifResult').innerHTML = `
                <div class="alert alert-info">
                    <i class="bi bi-envelope-check me-2"></i> Notification test envoyée à ${document.getElementById('emailNotif').value}
                </div>
            `;

            // Hide after 3 seconds
            setTimeout(() => {
                document.getElementById('notifResult').innerHTML = '';
            }, 3000);
        });
    }

    // Network Topology
    if (document.getElementById('topoSvg')) {
        initNetworkTopology();
    }

    // Logs Table
    if (document.getElementById('logsTable')) {
        initLogsTable();
        setupLogsFilters();
    }
});

// Network Topology Functions
function initNetworkTopology() {
    const svg = d3.select("#topoSvg");
    const width = 800;
    const height = 500;

    // Sample network data
    const nodes = [
        { id: "firewall", name: "Firewall", type: "router", x: 100, y: 250, status: "up" },
        { id: "core-switch", name: "Core Switch", type: "switch", x: 300, y: 250, status: "up" },
        { id: "web1", name: "Web Server 1", type: "server", x: 500, y: 150, status: "up" },
        { id: "web2", name: "Web Server 2", type: "server", x: 500, y: 250, status: "up" },
        { id: "db1", name: "Database 1", type: "server", x: 500, y: 350, status: "down" },
        { id: "backup", name: "Backup", type: "server", x: 700, y: 250, status: "up" }
    ];

    const links = [
        { source: "firewall", target: "core-switch" },
        { source: "core-switch", target: "web1" },
        { source: "core-switch", target: "web2" },
        { source: "core-switch", target: "db1" },
        { source: "core-switch", target: "backup" }
    ];

    // Draw links
    svg.selectAll(".link")
        .data(links)
        .enter()
        .append("line")
        .attr("class", "link")
        .attr("x1", d => nodes.find(n => n.id === d.source).x)
        .attr("y1", d => nodes.find(n => n.id === d.source).y)
        .attr("x2", d => nodes.find(n => n.id === d.target).x)
        .attr("y2", d => nodes.find(n => n.id === d.target).y);

    // Draw nodes
    const nodeGroups = svg.selectAll(".node")
        .data(nodes)
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", d => `translate(${d.x},${d.y})`)
        .on("click", function (event, d) {
            showHostDetails(d);
        });

    // Add circles for nodes
    nodeGroups.append("circle")
        .attr("r", 20)
        .attr("fill", d => {
            if (d.status === "down") return "#7f7f7f";
            return d.type === "server" ? "#4e79a7" :
                d.type === "switch" ? "#f28e2b" : "#e15759";
        });

    // Add text labels
    nodeGroups.append("text")
        .attr("dy", 35)
        .text(d => d.name);

    // Zoom functionality
    let zoomLevel = 1;
    document.getElementById('zoomInBtn').addEventListener('click', function () {
        zoomLevel += 0.1;
        document.getElementById('topoSvg').style.transform = `scale(${zoomLevel})`;
    });

    document.getElementById('zoomOutBtn').addEventListener('click', function () {
        if (zoomLevel > 0.5) {
            zoomLevel -= 0.1;
            document.getElementById('topoSvg').style.transform = `scale(${zoomLevel})`;
        }
    });

    document.getElementById('resetZoomBtn').addEventListener('click', function () {
        zoomLevel = 1;
        document.getElementById('topoSvg').style.transform = `scale(${zoomLevel})`;
    });

    // Search functionality
    document.getElementById('topoSearch').addEventListener('input', function (e) {
        const searchTerm = e.target.value.toLowerCase();
        svg.selectAll(".node")
            .each(function (d) {
                const node = d3.select(this);
                if (d.name.toLowerCase().includes(searchTerm)) {
                    node.style("opacity", 1);
                    node.select("circle").attr("r", 25); // Highlight
                } else {
                    node.style("opacity", 0.3);
                    node.select("circle").attr("r", 20);
                }
            });
    });
}

function showHostDetails(host) {
    document.getElementById('host-name').textContent = host.name;
    document.getElementById('host-ip').textContent = "192.168.1." + Math.floor(Math.random() * 100);
    document.getElementById('host-type').textContent = host.type === "server" ? "Serveur" :
        host.type === "switch" ? "Switch" : "Routeur";
    document.getElementById('host-status').innerHTML = host.status === "up" ?
        '<span class="badge bg-success">En ligne</span>' :
        '<span class="badge bg-danger">Hors ligne</span>';

    // Generate random services
    const services = [
        { name: "Apache", status: "running" },
        { name: "MySQL", status: Math.random() > 0.3 ? "running" : "stopped" },
        { name: "SSH", status: "running" },
        { name: "Nginx", status: Math.random() > 0.7 ? "running" : "stopped" },
        { name: "Docker", status: "running" }
    ];

    const servicesHtml = services.map(service => `
        <div class="service-item ${service.status}">
            <i class="bi bi-${service.status === 'running' ? 'check-circle' : 'x-circle'} me-2"></i>
            ${service.name}
        </div>
    `).join('');

    document.getElementById('host-services').innerHTML = servicesHtml;

    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('hostModal'));
    modal.show();
}

// Logs Table Functions
function initLogsTable() {
    const logsData = [
        {
            id: 1,
            datetime: "04/04/2024 13:55:12",
            type: "Info",
            user: "Jean Dupont",
            message: "Connexion réussie depuis l'adresse IP 192.168.1.45",
            details: "Connexion réussie depuis l'adresse IP 192.168.1.45 avec le navigateur Chrome sur Windows 10",
            tags: ["authentification", "succès"]
        },
        {
            id: 2,
            datetime: "04/04/2024 13:50:34",
            type: "Warning",
            user: "Marie Martin",
            message: "Utilisation RAM élevée sur le serveur web-01 (92%)",
            details: "Utilisation mémoire anormalement élevée sur le serveur web-01. Détails: RAM totale: 16GB, Utilisée: 14.7GB, Processus principal: apache2 (3.2GB)",
            tags: ["performance", "alerte"]
        },
        {
            id: 3,
            datetime: "04/04/2024 13:45:56",
            type: "Erreur",
            user: "Jean Dupont",
            message: "Échec de la sauvegarde automatique de la base de données",
            details: "Échec de la sauvegarde MySQL sur db-01. Erreur: 'Disk full'. Espace disponible: 120MB sur 50GB. Le script de sauvegarde a été interrompu.",
            tags: ["sauvegarde", "erreur"]
        },
        {
            id: 4,
            datetime: "03/04/2024 09:22:18",
            type: "Info",
            user: "Paul Durand",
            message: "Mise à jour de la configuration du pare-feu appliquée",
            details: "Nouvelle règle de pare-feu ajoutée: BLOCK 192.168.1.100/32 sur les ports 22,80,443. Appliqué par Paul Durand à 09:22:18.",
            tags: ["sécurité", "pare-feu"]
        },
        {
            id: 5,
            datetime: "02/04/2024 16:30:45",
            type: "Warning",
            user: "Marie Martin",
            message: "Latence élevée sur le lien WAN principal",
            details: "Latence moyenne de 450ms détectée sur le lien WAN vers le datacenter. Seuil normal: <100ms.",
            tags: ["réseau", "performance"]
        },
        {
            id: 6,
            datetime: "02/04/2024 10:15:22",
            type: "Erreur",
            user: "Jean Dupont",
            message: "Échec de connexion SSH depuis 192.168.1.100",
            details: "5 tentatives de connexion SSH infructueuses depuis 192.168.1.100 (user: root). Adresse IP bloquée dans le pare-feu.",
            tags: ["sécurité", "ssh"]
        }
    ];

    // Store logs in localStorage for demo purposes
    localStorage.setItem('logsData', JSON.stringify(logsData));

    // Render logs
    renderLogs(logsData);

    // Setup pagination
    setupPagination(logsData, 1, 5);
}

function renderLogs(logs) {
    const tbody = document.getElementById('logsTableBody');
    tbody.innerHTML = '';

    logs.forEach(log => {
        const badgeClass = log.type === "Info" ? "bg-info" :
            log.type === "Warning" ? "bg-warning" : "bg-danger";

        const row = document.createElement('tr');
        row.setAttribute('data-type', log.type);
        row.setAttribute('data-user', log.user);
        row.setAttribute('data-date', log.datetime.split(' ')[0]);

        row.innerHTML = `
            <td>${log.datetime}</td>
            <td><span class="badge ${badgeClass} text-light">${log.type}</span></td>
            <td>${log.user}</td>
            <td>${log.message}</td>
            <td>
                <button class="btn btn-sm btn-outline-light btn-log-details" 
                        data-bs-toggle="modal" 
                        data-bs-target="#logModal"
                        data-id="${log.id}">
                    <i class="bi bi-eye"></i> Détails
                </button>
            </td>
        `;

        tbody.appendChild(row);
    });

    // Add event listeners to detail buttons
    document.querySelectorAll('.btn-log-details').forEach(btn => {
        btn.addEventListener('click', function () {
            const logId = parseInt(this.getAttribute('data-id'));
            showLogDetails(logId);
        });
    });
}

function showLogDetails(logId) {
    const logsData = JSON.parse(localStorage.getItem('logsData'));
    const log = logsData.find(l => l.id === logId);

    if (!log) return;

    // Update modal content
    document.getElementById('logModalLabel').textContent = `Détails de l'événement #${log.id}`;
    document.getElementById('logModalType').textContent = log.type;
    document.getElementById('logModalType').className = `badge ${log.type === "Info" ? "bg-info" :
        log.type === "Warning" ? "bg-warning" : "bg-danger"} fs-6`;
    document.getElementById('logModalDate').textContent = log.datetime;
    document.getElementById('logModalUser').textContent = log.user;
    document.getElementById('logModalMessage').textContent = log.details;

    // Update tags
    const tagsHtml = log.tags.map(tag => `<span class="badge bg-secondary me-1">${tag}</span>`).join('');
    document.getElementById('logModalTags').innerHTML = tagsHtml;

    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('logModal'));
    modal.show();
}

function setupLogsFilters() {
    document.getElementById('logTypeFilter').addEventListener('change', filterLogs);
    document.getElementById('logUserFilter').addEventListener('change', filterLogs);
    document.getElementById('logDateFilter').addEventListener('change', filterLogs);
    document.getElementById('logSearchBtn').addEventListener('click', filterLogs);

    // Also filter when pressing Enter in search field
    document.getElementById('logSearch').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            filterLogs();
        }
    });
}

function filterLogs() {
    const typeFilter = document.getElementById('logTypeFilter').value;
    const userFilter = document.getElementById('logUserFilter').value;
    const dateFilter = document.getElementById('logDateFilter').value;
    const searchFilter = document.getElementById('logSearch').value.toLowerCase();

    const logsData = JSON.parse(localStorage.getItem('logsData'));

    const filteredLogs = logsData.filter(log => {
        // Type filter
        if (typeFilter && log.type !== typeFilter) return false;

        // User filter
        if (userFilter && log.user !== userFilter) return false;

        // Date filter
        if (dateFilter) {
            const logDate = log.datetime.split(' ')[0].split('/').reverse().join('-');
            if (logDate !== dateFilter) return false;
        }

        // Search filter
        if (searchFilter) {
            const searchText = `${log.type} ${log.user} ${log.message} ${log.details}`.toLowerCase();
            if (!searchText.includes(searchFilter)) return false;
        }

        return true;
    });

    renderLogs(filteredLogs);
    setupPagination(filteredLogs, 1, 5);
}

function setupPagination(logs, currentPage, itemsPerPage) {
    const pagination = document.getElementById('logsPagination');
    pagination.innerHTML = '';

    const pageCount = Math.ceil(logs.length / itemsPerPage);

    if (pageCount <= 1) return;

    // Previous button
    const prevLi = document.createElement('li');
    prevLi.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
    prevLi.innerHTML = `<a class="page-link" href="#">Précédent</a>`;
    prevLi.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage > 1) {
            paginateLogs(logs, currentPage - 1, itemsPerPage);
        }
    });
    pagination.appendChild(prevLi);

    // Page numbers
    for (let i = 1; i <= pageCount; i++) {
        const pageLi = document.createElement('li');
        pageLi.className = `page-item ${i === currentPage ? 'active' : ''}`;
        pageLi.innerHTML = `<a class="page-link" href="#">${i}</a>`;
        pageLi.addEventListener('click', (e) => {
            e.preventDefault();
            paginateLogs(logs, i, itemsPerPage);
        });
        pagination.appendChild(pageLi);
    }

    // Next button
    const nextLi = document.createElement('li');
    nextLi.className = `page-item ${currentPage === pageCount ? 'disabled' : ''}`;
    nextLi.innerHTML = `<a class="page-link" href="#">Suivant</a>`;
    nextLi.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage < pageCount) {
            paginateLogs(logs, currentPage + 1, itemsPerPage);
        }
    });
    pagination.appendChild(nextLi);

    // Paginate initial view
    paginateLogs(logs, currentPage, itemsPerPage);
}

function paginateLogs(logs, page, itemsPerPage) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedLogs = logs.slice(start, end);

    renderLogs(paginatedLogs);
    setupPagination(logs, page, itemsPerPage);
}


/* =============Js 2 pour mes configuration   =======================*/
document.addEventListener('DOMContentLoaded', function () {
    // Gestion de la visibilité des heures personnalisées
    const workingHoursSelect = document.getElementById('workingHours');
    const customHoursContainer = document.getElementById('customHoursContainer');

    workingHoursSelect.addEventListener('change', function () {
        customHoursContainer.style.display = this.value === 'custom' ? 'block' : 'none';
    });

    // Validation du formulaire
    const configForm = document.getElementById('configForm');

    configForm.addEventListener('submit', function (e) {
        e.preventDefault();

        let isValid = true;

        // Validation des champs
        const validateField = (field, condition, errorMsg) => {
            if (!condition) {
                field.classList.add('is-invalid');
                isValid = false;
            } else {
                field.classList.remove('is-invalid');
            }
        };

        // Validation des seuils
        validateField(
            document.getElementById('cpuThreshold'),
            document.getElementById('cpuThreshold').value >= 1 &&
            document.getElementById('cpuThreshold').value <= 100,
            'Doit être entre 1 et 100'
        );

        validateField(
            document.getElementById('ramThreshold'),
            document.getElementById('ramThreshold').value >= 1 &&
            document.getElementById('ramThreshold').value <= 100,
            'Doit être entre 1 et 100'
        );

        validateField(
            document.getElementById('diskThreshold'),
            document.getElementById('diskThreshold').value >= 1 &&
            document.getElementById('diskThreshold').value <= 100,
            'Doit être entre 1 et 100'
        );

        // Validation email
        validateField(
            document.getElementById('emailNotif'),
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(document.getElementById('emailNotif').value),
            'Adresse email invalide'
        );

        // Validation Slack webhook
        validateField(
            document.getElementById('slackWebhook'),
            document.getElementById('slackWebhook').value.startsWith('https://'),
            'URL doit commencer par https://'
        );

        // Si tout est valide, afficher un message de succès
        if (isValid) {
            showNotification('success', '<i class="bi bi-check-circle-fill"></i> Configuration enregistrée avec succès');

            // Simuler un enregistrement (remplacer par un appel API réel)
            setTimeout(() => {
                // Réinitialiser les états de validation
                configForm.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
            }, 3000);
        }
    });

    // Boutons de test
    document.getElementById('testEmailBtn').addEventListener('click', function () {
        const email = document.getElementById('emailNotif').value;
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showNotification('info', `<i class="bi bi-envelope-check"></i> Email test envoyé à ${email}`);
        } else {
            showNotification('danger', '<i class="bi bi-exclamation-triangle"></i> Adresse email invalide');
            document.getElementById('emailNotif').classList.add('is-invalid');
        }
    });

    document.getElementById('testSlackBtn').addEventListener('click', function () {
        const webhook = document.getElementById('slackWebhook').value;
        if (webhook.startsWith('https://')) {
            showNotification('info', '<i class="bi bi-slack"></i> Notification test envoyée sur Slack');
        } else {
            showNotification('danger', '<i class="bi bi-exclamation-triangle"></i> URL Slack invalide');
            document.getElementById('slackWebhook').classList.add('is-invalid');
        }
    });

    // Fonction pour afficher les notifications
    function showNotification(type, message) {
        const notifResult = document.getElementById('notifResult');
        const alertClass = type === 'success' ? 'alert-success' :
            type === 'info' ? 'alert-info' : 'alert-danger';

        notifResult.innerHTML = `
            <div class="alert ${alertClass} alert-dismissible fade show">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;

        // Fermer automatiquement après 5 secondes
        setTimeout(() => {
            const alert = notifResult.querySelector('.alert');
            if (alert) {
                const bsAlert = new bootstrap.Alert(alert);
                bsAlert.close();
            }
        }, 5000);
    }
});
/*<============================Graphique de performance===================================>*/

const graphe1Ctx = document.getElementById('graphe1')
if (graphe1Ctx) {
    const historiqueChart = new Chart(graphe1Ctx.getContext('2d'), {
        type: 'line',
        data: {
            labels: ['T-4', 'T-3', 'T-2', 'T-1'],
            datasets: [
                {
                    label: 'CPU(%)',
                    data: [0, 25, 50, 100],
                    backgroundColor: 'drak',
                    borderColor: 'blue',
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


const graphe2Ctx = document.getElementById('graphe2')
if (graphe1Ctx) {
    const historiqueChart = new Chart(graphe2Ctx.getContext('2d'), {
        type: 'line',
        data: {
            labels: ['T-4', 'T-3', 'T-2', 'T-1'],
            datasets: [
                {
                    label: 'Disque(%)',
                    data: [20, 50, 20, 50],
                    backgroundColor: 'drak',
                    borderColor: 'green',
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


const graphe3Ctx = document.getElementById('graphe3')
if (graphe3Ctx) {
    const historiqueChart = new Chart(graphe3Ctx.getContext('2d'), {
        type: 'line',
        data: {
            labels: ['T-4', 'T-3', 'T-2', 'T-1'],
            datasets: [
                {
                    label: 'CPU(%)',
                    data: [0, 10, 5, 50],
                    backgroundColor: '',
                    borderColor: 'yellow',
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
