document.addEventListener('DOMContentLoaded', () => {
    // Инициализация данных
    generateMetrics();
    setupNavigation();
    setupLogout();

    function generateMetrics() {
        const metrics = [
            { title: "Давление", value: "120/80", icon: "heartbeat" },
            { title: "Глюкоза", value: "5.4 ммоль/л", icon: "tint" },
            { title: "Вес", value: "75 кг", icon: "weight" },
            { title: "Сатурация", value: "98%", icon: "lungs" }
        ];

        const grid = document.querySelector('.patient-grid');
        metrics.forEach(metric => {
            const card = document.createElement('div');
            card.classList.add('patient-card');
            card.innerHTML = `
                <h3><i class="fas fa-${metric.icon}"></i> ${metric.title}</h3>
                <p class="metric-value">${metric.value}</p>
                <p class="timestamp">Измерено: ${new Date().toLocaleDateString()}</p>
            `;
            grid.appendChild(card);
        });
    }

    function setupNavigation() {
        const navLinks = document.querySelectorAll('.sidebar nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelectorAll('.sidebar nav a').forEach(a => a.classList.remove('active'));
                document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
                this.classList.add('active');
                document.querySelector(this.getAttribute('href')).classList.add('active');
            });
        });
    }

    function setupLogout() {
        document.getElementById('logout').addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }

    // Инициализация графика
    const ctx = document.getElementById('healthChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
            datasets: [{
                label: 'Артериальное давление',
                data: [120, 122, 119, 123, 121, 118, 120],
                borderColor: '#3498db',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' }
            }
        }
    });
});