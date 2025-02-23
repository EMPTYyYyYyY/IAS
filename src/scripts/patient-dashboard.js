document.addEventListener('DOMContentLoaded', () => {
    let healthChart = null;

    // 1. Функция генерации показателей
    const generateMetrics = () => {
        const metrics = [
            { title: "Давление", value: "120/80", icon: "heartbeat" },
            { title: "Глюкоза", value: "5.4 ммоль/л", icon: "tint" },
            { title: "Вес", value: "75 кг", icon: "weight" },
            { title: "Сатурация", value: "98%", icon: "lungs" }
        ];

        const grid = document.querySelector('.patient-grid');
        if (!grid) return;

        grid.innerHTML = metrics.map(metric => `
            <div class="patient-card">
                <h3><i class="fas fa-${metric.icon}"></i> ${metric.title}</h3>
                <p class="metric-value">${metric.value}</p>
                <p class="timestamp">Измерено: ${new Date().toLocaleDateString()}</p>
            </div>
        `).join('');
    };

    // 2. Настройка навигации
    const setupNavigation = () => {
        const navLinks = document.querySelectorAll('.sidebar nav a');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                
                // Сброс активных элементов
                document.querySelectorAll('.sidebar nav a, section').forEach(el => {
                    el.classList.remove('active');
                    if (el.tagName === 'SECTION') el.classList.add('hidden');
                });

                // Активация выбранного
                this.classList.add('active');
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.classList.add('active');
                    targetSection.classList.remove('hidden');
                    
                    // Обновление графика при необходимости
                    if (targetId === 'graphs') {
                        initChart();
                    }
                }
            });
        });
    };

    // 3. Инициализация графика
    const initChart = () => {
        const ctx = document.getElementById('healthChart');
        if (!ctx) return;

        if (healthChart) healthChart.destroy();

        healthChart = new Chart(ctx.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
                datasets: [{
                    label: 'Артериальное давление',
                    data: [120, 122, 119, 123, 121, 118, 120],
                    borderColor: '#3498db',
                    tension: 0.4,
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'top' } }
            }
        });
    };

    // 4. Выход из системы
    const setupLogout = () => {
        const logoutBtn = document.getElementById('logout');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                window.location.href = '/login';
            });
        }
    };

    // Инициализация
    generateMetrics();
    setupNavigation();
    setupLogout();
    initChart();
});