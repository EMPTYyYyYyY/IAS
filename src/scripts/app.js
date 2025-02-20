const API_URL = 'https://emptyyyyyyy.github.io'; // Замените на ваш URL

// Пример: Загрузка списка пациентов
async function loadPatients() {
    try {
        const response = await fetch(`${API_URL}/api/patients`);
        const patients = await response.json();
        
        const container = document.getElementById('patients-container');
        container.innerHTML = patients.map(patient => `
            <div class="patient-card" data-id="${patient.id}">
                <h3>${patient.name}</h3>
                <p>Возраст: ${patient.age}</p>
                <p>Пол: ${patient.gender === 'male' ? 'Мужской' : 'Женский'}</p>
            </div>
        `).join('');

        // Обработка клика по карточке
        document.querySelectorAll('.patient-card').forEach(card => {
            card.addEventListener('click', () => showPatientDetails(card.dataset.id));
        });
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

// Пример: Отображение графиков
function renderBloodPressureChart(measurements) {
    const ctx = document.getElementById('patient-chart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: measurements.map(m => new Date(m.timestamp).toLocaleDateString()),
            datasets: [{
                label: 'Систолическое давление',
                data: measurements.map(m => m.systolic),
                borderColor: '#e74c3c'
            }, {
                label: 'Диастолическое давление',
                data: measurements.map(m => m.diastolic),
                borderColor: '#3498db'
            }]
        }
    });
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    loadPatients();
});