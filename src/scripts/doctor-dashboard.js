// Переключение между разделами
document.querySelectorAll('.sidebar nav ul li a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Отменяем стандартное поведение ссылки

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

// Генерация списка пациентов
function generatePatients() {
    const patients = [
        { name: "Иван Иванов", age: 45, lastMeasurement: "120/80, Пульс: 70" },
        { name: "Мария Петрова", age: 34, lastMeasurement: "130/85, Пульс: 75" },
        { name: "Алексей Сидоров", age: 50, lastMeasurement: "140/90, Пульс: 80" },
        { name: "Елена Кузнецова", age: 29, lastMeasurement: "110/70, Пульс: 65" },
        { name: "Дмитрий Васильев", age: 60, lastMeasurement: "150/95, Пульс: 85" },
        { name: "Ольга Смирнова", age: 42, lastMeasurement: "125/80, Пульс: 72" },
        { name: "Сергей Павлов", age: 38, lastMeasurement: "135/85, Пульс: 78" },
        { name: "Анна Михайлова", age: 55, lastMeasurement: "145/90, Пульс: 82" },
        { name: "Николай Федоров", age: 47, lastMeasurement: "115/75, Пульс: 68" },
        { name: "Татьяна Николаева", age: 31, lastMeasurement: "128/82, Пульс: 74" },
    ];

    const patientList = document.querySelector('.patient-list');

    patients.forEach(patient => {
        const patientCard = document.createElement('div');
        patientCard.classList.add('patient-card');

        patientCard.innerHTML = `
            <h3>${patient.name}</h3>
            <p>Возраст: ${patient.age}</p>
            <p>Последнее измерение: ${patient.lastMeasurement}</p>
            <button class="view-details">Подробнее</button>
        `;

        patientList.appendChild(patientCard);
    });
}

// Вызов функции при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    generatePatients();
});