document.addEventListener('DOMContentLoaded', () => {
    // Инициализация графиков
    const ctx = document.getElementById('healthChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
            datasets: [{
                label: 'Артериальное давление (верхнее)',
                data: [120, 122, 119, 123, 121, 118, 120],
                borderColor: '#3498db',
                tension: 0.4,
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                }
            }
        }
    });

    // Обработчик кнопки выхода
    document.getElementById('logout').addEventListener('click', () => {
        window.location.href = '/logout';
    });
});