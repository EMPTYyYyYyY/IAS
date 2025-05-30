document.addEventListener('DOMContentLoaded', () => {
    let doctorsChart = null;
    let patientsChart = null;

    // Инициализация данных
    generateDoctors();
    generatePatients();
    setupNavigation(); // Настройка навигации
    setupLogout();
    initCharts();

    // Генерация списка врачей
    function generateDoctors() {
        const doctors = [
            { name: "Иванова А.П.", specialization: "Кардиолог", license: "LIC123456" },
            { name: "Петров С.И.", specialization: "Терапевт", license: "LIC654321" }
        ];

        const container = document.querySelector('.doctors-list');
        if (!container) return;

        container.innerHTML = doctors.map(doctor => `
            <div class="doctor-card">
                <h3><i class="fas fa-user-md"></i> ${doctor.name}</h3>
                <p>Специализация: ${doctor.specialization}</p>
                <p>Лицензия: ${doctor.license}</p>
            </div>
        `).join('');
    }

    // Генерация списка пациентов
    function generatePatients() {
        const patients = [
            { name: "Иван Иванов", doctor: "Иванова А.П.", lastVisit: "15.05.2023" },
            { name: "Ольга Смирнова", doctor: "Петров С.И.", lastVisit: "14.05.2023" }
        ];

        const container = document.querySelector('.patients-list');
        if (!container) return;

        container.innerHTML = patients.map(patient => `
            <div class="patient-card">
                <h3><i class="fas fa-user"></i> ${patient.name}</h3>
                <p>Лечащий врач: ${patient.doctor}</p>
                <p>Последний визит: ${patient.lastVisit}</p>
            </div>
        `).join('');
    }

    // Инициализация графиков
    function initCharts() {
        const doctorsCtx = document.getElementById('doctorsChart');
        const patientsCtx = document.getElementById('patientsChart');

        if (doctorsCtx) {
            doctorsChart = new Chart(doctorsCtx, {
                type: 'bar',
                data: {
                    labels: ['Иванова А.П.', 'Петров С.И.'],
                    datasets: [{
                        label: 'Количество пациентов',
                        data: [15, 10],
                        backgroundColor: ['#3498db', '#2ecc71']
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { position: 'top' }
                    }
                }
            });
        }

        if (patientsCtx) {
            patientsChart = new Chart(patientsCtx, {
                type: 'line',
                data: {
                    labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
                    datasets: [{
                        label: 'Активные пациенты',
                        data: [120, 130, 115, 140, 125, 135, 110],
                        borderColor: '#e74c3c',
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
        }
    }

    // Настройка навигации (ИСПРАВЛЕНО)
    function setupNavigation() {
        const navLinks = document.querySelectorAll('.sidebar nav a');
        const sections = document.querySelectorAll('section');

        // Функция для переключения вкладок
        const switchTab = (targetId) => {
            // Скрываем все секции
            sections.forEach(section => {
                section.classList.remove('active');
                section.classList.add('hidden');
            });

            // Показываем выбранную секцию
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.remove('hidden');
                targetSection.classList.add('active');
            }

            // Убираем активный класс у всех ссылок
            navLinks.forEach(link => link.classList.remove('active'));

            // Добавляем активный класс к выбранной ссылке
            const activeLink = document.querySelector(`.sidebar nav a[href="#${targetId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        };

        // Обработчик кликов по ссылкам
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                switchTab(targetId);
            });
        });

        // По умолчанию открываем первую вкладку
        switchTab('doctors');
    }

    // Выход из системы
    function setupLogout() {
        const logoutBtn = document.getElementById('logout');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                window.location.href = 'index.html';
            });
        }
    }
});