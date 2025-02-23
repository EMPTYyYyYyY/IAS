document.addEventListener('DOMContentLoaded', () => {
    let healthChart = null; // Будем хранить ссылку на график
    
    // Инициализация данных
    generateMetrics();
    setupNavigation();
    setupLogout();
    initChart(); // Первоначальная инициализация графика

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
                const targetId = this.getAttribute('href').substring(1);
                
                // Убираем активные классы
                document.querySelectorAll('.sidebar nav a').forEach(a => a.classList.remove('active'));
                document.querySelectorAll('section').forEach(s => {
                    s.classList.remove('active');
                    s.classList.add('hidden');
                });

                // Активируем выбранную секцию
                this.classList.add('active');
                const targetSection = document.getElementById(targetId);
                if(targetSection) {
                    targetSection.classList.add('active');
                    targetSection.classList.remove('hidden');
                    
                    // Если это вкладка с графиком - перерисовываем
                    if(targetId === 'graphs' && healthChart) {
                        healthChart.update();
                    }
                }
            });
        });
    }

    function initChart() {
        const ctx = document.getElementById('healthChart').getContext('2d');
        
        // Уничтожаем предыдущий график если существует
        if(healthChart) {
            healthChart.destroy();
        }
        
        healthChart = new Chart(ctx, {
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
                plugins: {
                    legend: { 
                        position: 'top',
                        labels: {
                            font: {
                                size: 14
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        ticks: {
                            font: {
                                size: 12
                            }
                        }
                    },
                    x: {
                        ticks: {
                            font: {
                                size: 12
                            }
                        }
                    }
                }
            }
        });
    }

    function setupLogout() {
        document.getElementById('logout').addEventListener('click', () => {
            window.location.href = '/logout';
        });
    }
});