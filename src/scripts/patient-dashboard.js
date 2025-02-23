document.addEventListener('DOMContentLoaded', () => {
    let healthChart = null;

    // 1. Генерация медицинских показателей
    const generateMetrics = () => {
        const metrics = [
            { title: "Артериальное давление", value: "120/80", icon: "heartbeat" },
            { title: "Уровень глюкозы", value: "5.4 ммоль/л", icon: "tint" },
            { title: "Вес тела", value: "75 кг", icon: "weight" },
            { title: "Сатурация кислорода", value: "98%", icon: "lungs" }
        ];

        const grid = document.querySelector('.patient-grid');
        if (!grid) return;

        grid.innerHTML = metrics.map(metric => `
            <div class="patient-card">
                <h3><i class="fas fa-${metric.icon}"></i> ${metric.title}</h3>
                <p class="metric-value">${metric.value}</p>
                <p class="timestamp">${new Date().toLocaleDateString()}</p>
            </div>
        `).join('');
    };

    // 2. Генерация списка назначений
    const generatePrescriptions = () => {
        const prescriptions = [
            { 
                drug: "Аспирин Кардио", 
                dosage: "100 мг × 1/день", 
                doctor: "Иванова А.П.",
                date: "15.05.2023"
            },
            { 
                drug: "Метформин", 
                dosage: "500 мг × 2/день", 
                doctor: "Петров С.И.",
                date: "14.05.2023"
            }
        ];

        const container = document.querySelector('.prescriptions-list');
        if (!container) return;

        container.innerHTML = prescriptions.map(prescription => `
            <div class="prescription-card">
                <div class="prescription-header">
                    <i class="fas fa-pills"></i>
                    <h3>${prescription.drug}</h3>
                </div>
                <div class="prescription-body">
                    <p><i class="fas fa-syringe"></i> ${prescription.dosage}</p>
                    <p><i class="fas fa-user-md"></i> ${prescription.doctor}</p>
                    <p><i class="fas fa-calendar"></i> ${prescription.date}</p>
                </div>
            </div>
        `).join('');
    };

    // 3. Настройка навигации между вкладками
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

                // Активация выбранной вкладки
                this.classList.add('active');
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.classList.add('active');
                    targetSection.classList.remove('hidden');
                    
                    // Инициализация графика при первом открытии
                    if (targetId === 'graphs' && !healthChart) {
                        initChart();
                    }
                }
            });
        });
    };

    // 4. Инициализация графика
    const initChart = () => {
        const ctx = document.getElementById('healthChart');
        if (!ctx) return;

        // Уничтожаем предыдущий график
        if (healthChart) healthChart.destroy();

        healthChart = new Chart(ctx.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
                datasets: [{
                    label: 'Артериальное давление (верхнее)',
                    data: [120, 122, 119, 123, 121, 118, 120],
                    borderColor: '#3498db',
                    tension: 0.4,
                    borderWidth: 2,
                    fill: false
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
                        title: {
                            display: true,
                            text: 'мм рт. ст.'
                        }
                    }
                }
            }
        });
    };

    // 5. Настройка кнопки выхода
    const setupLogout = () => {
        const logoutBtn = document.getElementById('logout');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                window.location.href = '/logout';
            });
        }
    };

    // Инициализация всех компонентов
    generateMetrics();
    generatePrescriptions(); // Добавлен вызов генератора назначений
    setupNavigation();
    setupLogout();
    
    // Первоначальная инициализация графика
    if (document.getElementById('graphs').classList.contains('active')) {
        initChart();
    }
});