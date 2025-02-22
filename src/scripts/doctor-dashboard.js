document.addEventListener('DOMContentLoaded', () => {
    // Инициализация
    generatePatients();
    setupNavigation();
    setupLogout();

    // Генерация тестовых данных
    function generatePatients() {
        const patients = [
            { name: "Иванов Пётр", age: 45, diagnosis: "Гипертония", lastData: "130/85" },
            { name: "Смирнова Ольга", age: 34, diagnosis: "Сахарный диабет", lastData: "Глюкоза 6.8" },
            { name: "Петров Алексей", age: 58, diagnosis: "Аритмия", lastData: "Пульс 95" },
            { name: "Козлова Анна", age: 29, diagnosis: "Беременность", lastData: "Срок 32 нед." }
        ];

        const grid = document.querySelector('.patient-grid');
        patients.forEach(patient => {
            grid.innerHTML += `
                <div class="patient-card">
                    <h3>${patient.name}</h3>
                    <p>Возраст: ${patient.age}</p>
                    <p>Диагноз: ${patient.diagnosis}</p>
                    <p>Последние данные: ${patient.lastData}</p>
                    <button class="details-btn">Подробнее <i class="fas fa-arrow-right"></i></button>
                </div>
            `;
        });
    }

    // Настройка навигации
    function setupNavigation() {
        document.querySelectorAll('.sidebar nav a').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Удаление активного класса
                document.querySelectorAll('.sidebar nav a').forEach(a => a.classList.remove('active'));
                document.querySelectorAll('section').forEach(section => section.classList.remove('active'));
                
                // Активация выбранного раздела
                this.classList.add('active');
                const target = document.querySelector(this.getAttribute('href'));
                target.classList.add('active');
            });
        });
    }

    // Выход из системы
    function setupLogout() {
        document.getElementById('logout').addEventListener('click', () => {
            localStorage.removeItem('token');
            window.location.href = 'https://emptyyyyyyy.github.io/IAS/src/html/doctor.html';
        });
    }

    // Демо-чат
    document.querySelector('.chat-input button').addEventListener('click', () => {
        const input = document.querySelector('.chat-input textarea');
        if (input.value.trim()) {
            const messages = document.querySelector('.chat-messages');
            messages.innerHTML += `
                <div class="message doctor">
                    <p>${input.value}</p>
                    <span class="time">${new Date().toLocaleTimeString()}</span>
                </div>
            `;
            input.value = '';
            messages.scrollTop = messages.scrollHeight;
        }
    });
});