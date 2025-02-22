// Переключение между разделами
document.querySelectorAll('.sidebar nav ul li a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        // Убираем активный класс у всех ссылок
        document.querySelectorAll('.sidebar nav ul li a').forEach(a => {
            a.classList.remove('active');
        });

        // Добавляем активный класс к текущей ссылке
        link.classList.add('active');

        // Скрываем все разделы
        document.querySelectorAll('.content section').forEach(section => {
            section.classList.add('hidden');
        });

        // Показываем выбранный раздел
        const target = link.getAttribute('href');
        document.querySelector(target).classList.remove('hidden');
    });
});

// Выход из системы
document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('token'); // Удаляем токен
    window.location.href = '/doctor-login.html'; // Перенаправляем на страницу авторизации
});