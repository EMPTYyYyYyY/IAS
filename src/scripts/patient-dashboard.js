document.addEventListener('DOMContentLoaded', function() {
    // Инициализация графика (как у врача)
    const ctx = document.getElementById('healthChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
            datasets: [{
                label: 'Давление (верхнее)',
                data: [120, 122, 119, 123, 121, 118, 120],
                borderColor: '#4F46E5',
                tension: 0.4,
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
});