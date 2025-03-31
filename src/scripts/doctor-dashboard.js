const BASE_URL = "https://ias.ru.tuna.am";

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
            grid.innerHTML = '';
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
                    switchToSection(this.getAttribute('href'));
                });
            });
        } else {
            console.error('Навигационные ссылки не найдены.');
        }
    }

    // Функция переключения секций
    function switchToSection(sectionId) {
        document.querySelectorAll('.sidebar nav a').forEach(a => a.classList.remove('active'));
        document.querySelectorAll('section').forEach(section => section.classList.remove('active'));
        
        const navLink = document.querySelector(`.sidebar nav a[href="${sectionId}"]`);
        const targetSection = document.querySelector(sectionId);
        
        if (navLink) navLink.classList.add('active');
        if (targetSection) targetSection.classList.add('active');
        
        if (sectionId === '#patients') {
            generatePatients();
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
    function setupPatientForm() {
        const form = document.getElementById('patient-form');
        if (form) {
            form.addEventListener('submit', async function(e) {
                e.preventDefault();
                
                try {
                    // Получаем данные из формы
                    const genderValue = document.querySelector('input[name="gender"]:checked')?.value;
                    const phoneValue = document.getElementById('phone').value;
                    const addressValue = document.getElementById('address').value;
                    const birthDateValue = document.getElementById('birth-date').value;
                    
                    // Валидация обязательных полей
                    if (!genderValue) throw new Error('Не выбран пол пациента');
                    if (!birthDateValue) throw new Error('Не указана дата рождения');
                    
                    // Формируем объект для запроса
                    const requestData = {
                        email: document.getElementById('email').value,
                        password: document.getElementById('password').value,
                        userInfo: {
                            firstName: document.getElementById('first-name').value,
                            lastName: document.getElementById('last-name').value,
                            middleName: document.getElementById('middle-name').value || null,
                            sex: genderValue === 'male' ? 'Male' : 'Female',
                            birthday: birthDateValue
                        },
                        snils: document.getElementById('snils').value.replace(/\D/g, '')
                    };
                    
                    // Опциональные поля
                    if (phoneValue && phoneValue.trim() !== '') {
                        requestData.userInfo.phoneNumber = phoneValue.replace(/\D/g, '');
                    }
                    if (addressValue && addressValue.trim() !== '') {
                        requestData.address = addressValue;
                    }
                    
                    // Отправка запроса
                    const response = await fetch(BASE_URL + '/api/patients', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        credentials: 'include',
                        body: JSON.stringify(requestData)
                    });
                    
                    // Обработка ответа
                    const responseText = await response.text();
                    
                    if (!response.ok) {
                        let errorMessage = 'Ошибка сервера';
                        try {
                            const errorData = responseText ? JSON.parse(responseText) : {};
                            errorMessage = errorData.message || errorData.error || errorMessage;
                        } catch (e) {
                            errorMessage = responseText || errorMessage;
                        }
                        throw new Error(errorMessage);
                    }
                    
                    // Успешный ответ
                    let data = null;
                    if (responseText) {
                        try {
                            data = JSON.parse(responseText);
                            console.log('Успешный ответ:', data);
                        } catch (e) {
                            console.warn('Ответ не в JSON формате:', responseText);
                        }
                    }
                    
                    form.reset();
                    alert('Пациент успешно добавлен!');
                    switchToSection('#patients');
                    
                } catch (error) {
                    console.error('Ошибка:', error);
                    alert(`Ошибка при создании пациента: ${error.message}`);
                }
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
                }
            }
        });
    }
});