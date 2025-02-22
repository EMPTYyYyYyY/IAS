document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('healthChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['01.10', '02.10', '03.10', '04.10', '05.10'],
            datasets: [{
                label: 'Артериальное давление (верхнее)',
                data: [120, 125, 130, 128, 122],
                borderColor: '#4a5568',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Динамика показателей'
                }
            }
        }
    });
});