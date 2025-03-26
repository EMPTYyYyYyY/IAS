document.querySelector('.login-form form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
        // Первый запрос - авторизация
        const loginResponse = await fetch('https://media-grapper.ru.tuna.am/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include', // На всякий случай оставляем
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        
        // Второй запрос - получение профиля с явной передачей кук
        const profileResponse = await fetch('https://media-grapper.ru.tuna.am/api/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include' // Дублируем для надежности
        });
        
        if (!profileResponse.ok) {
            throw new Error('Ошибка при получении профиля');
        }
        
        const profileData = await profileResponse.json();
        
        // Перенаправление
        switch(profileData.userType) {
            case 'Doctor':
                window.location.href = 'doctor-dashboard.html';
                break;
            case 'Admin':
                window.location.href = 'admin-dashboard.html';
                break;
            case 'Patient':
                window.location.href = 'patient-dashboard.html';
                break;
            default:
                throw new Error('Неизвестный тип пользователя');
        }
        
    } catch (error) {
        alert(error.message || 'Произошла ошибка при авторизации');
        console.error('Ошибка:', error);
    }
});