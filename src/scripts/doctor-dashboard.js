const BASE_URL = "__BASE_URL__";
function setupPatientForm() {
    const form = document.getElementById('patient-form');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Получаем данные из формы
            const genderValue = document.querySelector('input[name="gender"]:checked').value;
            const phoneValue = document.getElementById('phone').value;
            const addressValue = document.getElementById('address').value;
            
            // Формируем объект для запроса
            const requestData = {
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
                userInfo: {
                    firstName: document.getElementById('first-name').value,
                    lastName: document.getElementById('last-name').value,
                    middleName: document.getElementById('middle-name').value || null,
                    sex: genderValue === 'male' ? 'Male' : 'Female',
                    birthday: document.getElementById('birth-date').value
                },
                snils: document.getElementById('snils').value.replace(/\D/g, '')
            };
            
            // Добавляем телефон, если он заполнен
            if (phoneValue && phoneValue.trim() !== '') {
                requestData.userInfo.phoneNumber = phoneValue.replace(/\D/g, '');
            }
            
            // Добавляем адрес, если он заполнен
            if (addressValue && addressValue.trim() !== '') {
                requestData.address = addressValue;
            }
            
            try {
                // Отправляем запрос на сервер
                const response = await fetch(BASE_URL + '/api/patients', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestData)
                });
                
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Ошибка при создании пациента');
                }
                
                const data = await response.json();
                console.log('Пациент создан:', data);
                
                // Очищаем форму
                form.reset();
                
                // Показываем уведомление
                alert('Пациент успешно добавлен!');
                
                // Переключаемся на вкладку пациентов
                document.querySelector('.sidebar nav a[href="#patients"]').click();
                
                // Обновляем список пациентов
                generatePatients();
                
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