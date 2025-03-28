document.addEventListener('DOMContentLoaded', () => {
    // Инициализация
    generatePatients();
    setupNavigation();
    setupLogout();
    setupPatientForm();

    // Генерация тестовых данных
    function generatePatients() {
        const patients = [
            { name: "Иванов Пётр", age: 45, diagnosis: "Гипертония", lastData: "130/85" },
            { name: "Смирнова Ольга", age: 34, diagnosis: "Сахарный диабет", lastData: "Глюкоза 6.8" },
            { name: "Петров Алексей", age: 58, diagnosis: "Аритмия", lastData: "Пульс 95" },
            { name: "Козлова Анна", age: 29, diagnosis: "Беременность", lastData: "Срок 32 нед." },
            { name: "Федоров Николай", age: 47, diagnosis: "Ожирение", lastData: "Вес 98 кг" },
            { name: "Михайлова Елена", age: 52, diagnosis: "Астма", lastData: "Сатурация 96%" }
        ];

        const grid = document.querySelector('.patient-grid');
        if (grid) {
            patients.forEach(patient => {
                const card = document.createElement('div');
                card.classList.add('patient-card');

                card.innerHTML = `
                    <h3><i class="fas fa-user"></i> ${patient.name}</h3>
                    <p><i class="fas fa-birthday-cake"></i> Возраст: ${patient.age}</p>
                    <p><i class="fas fa-stethoscope"></i> Диагноз: ${patient.diagnosis}</p>
                    <p><i class="fas fa-heartbeat"></i> Последние данные: ${patient.lastData}</p>
                    <button class="details-btn">Подробнее <i class="fas fa-arrow-right"></i></button>
                `;

                grid.appendChild(card);
            });
        } else {
            console.error('Элемент .patient-grid не найден.');
        }
    }

    // Настройка навигации
    function setupNavigation() {
        const navLinks = document.querySelectorAll('.sidebar nav a');
        if (navLinks.length > 0) {
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Удаление активного класса
                    document.querySelectorAll('.sidebar nav a').forEach(a => a.classList.remove('active'));
                    document.querySelectorAll('section').forEach(section => section.classList.remove('active'));
                    
                    // Активация выбранного раздела
                    this.classList.add('active');
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.classList.add('active');
                    } else {
                        console.error(`Элемент ${this.getAttribute('href')} не найден.`);
                    }
                });
            });
        } else {
            console.error('Навигационные ссылки не найдены.');
        }
    }

    // Выход из системы
    function setupLogout() {
        const logoutButton = document.getElementById('logout');
        if (logoutButton) {
            logoutButton.addEventListener('click', () => {
                localStorage.removeItem('token');
                window.location.href = 'index.html';
            });
        } else {
            console.error('Кнопка выхода не найдена.');
        }
    }

    // Обработка формы добавления пациента
    // Обработка формы добавления пациента
function setupPatientForm() {
    const form = document.getElementById('patient-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Получаем данные из формы
            const formData = {
                lastName: document.getElementById('last-name').value,
                firstName: document.getElementById('first-name').value,
                middleName: document.getElementById('middle-name').value,
                birthDate: document.getElementById('birth-date').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
                address: document.getElementById('address').value,
                snils: document.getElementById('snils').value
            };
            
            // Здесь можно добавить логику отправки данных на сервер
            console.log('Данные пациента:', formData);
            
            // Очищаем форму
            form.reset();
            
            // Показываем уведомление
            alert('Пациент успешно добавлен!');
            
            // Переключаемся на вкладку пациентов
            document.querySelector('.sidebar nav a[href="#patients"]').click();
        });

        // Маска для телефона
        const phoneInput = document.getElementById('phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', function(e) {
                let x = e.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
                e.target.value = !x[2] ? x[1] : '+7 (' + x[2] + (x[3] ? ') ' + x[3] : '') + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : '');
            });
        }

        // Маска для СНИЛС
        const snilsInput = document.getElementById('snils');
        if (snilsInput) {
            snilsInput.addEventListener('input', function(e) {
                let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/);
                e.target.value = !x[2] ? x[1] : x[1] + '-' + x[2] + (x[3] ? '-' + x[3] : '') + (x[4] ? ' ' + x[4] : '');
            });
        }
    }
}

    // Демо-чат
    const chatButton = document.querySelector('.chat-input button');
    if (chatButton) {
        chatButton.addEventListener('click', () => {
            const input = document.querySelector('.chat-input textarea');
            if (input && input.value.trim()) {
                const messages = document.querySelector('.chat-messages');
                if (messages) {
                    messages.innerHTML += `
                        <div class="message doctor">
                            <p>${input.value}</p>
                            <span class="time">${new Date().toLocaleTimeString()}</span>
                        </div>
                    `;
                    input.value = '';
                    messages.scrollTop = messages.scrollHeight;
                } else {
                    console.error('Контейнер для сообщений не найден.');
                }
            }
        });
    } else {
        console.error('Кнопка отправки сообщения не найдена.');
    }
});