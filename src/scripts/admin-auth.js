document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('admin-login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                // Отправляем данные на бэкенд
                const response = await fetch('http://localhost:5000/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: email, // Используем email как username
                        password: password,
                    }),
                });

                const data = await response.json();

                if (response.ok) {
                    // Сохраняем токен в localStorage
                    localStorage.setItem('token', data.token);
                    alert('Авторизация успешна!');
                    window.location.href = 'https://emptyyyyyyy.github.io/IAS/src/html/admin-dashboard.html'; // Переход в кабинет администратора
                } else {
                    alert(data.error || 'Ошибка авторизации');
                }
            } catch (error) {
                console.error('Ошибка:', error);
                alert('Произошла ошибка при авторизации');
            }
        });
    }
});