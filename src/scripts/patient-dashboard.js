// Данные для графиков
const pressureData = {
    labels: ['01.10', '02.10', '03.10', '04.10', '05.10'],
    datasets: [{
      label: 'Давление',
      data: [120, 125, 130, 128, 122],
      borderColor: '#4F46E5',
      fill: false,
    }]
  };
  
  const pulseData = {
    labels: ['01.10', '02.10', '03.10', '04.10', '05.10'],
    datasets: [{
      label: 'Пульс',
      data: [70, 72, 75, 74, 73],
      borderColor: '#10B981',
      fill: false,
    }]
  };
  
  // Настройки графиков
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'История измерений',
      },
    },
  };
  
  // Инициализация графиков
  document.addEventListener('DOMContentLoaded', () => {
    const pressureCtx = document.getElementById('pressureChart').getContext('2d');
    new Chart(pressureCtx, {
      type: 'line',
      data: pressureData,
      options: chartOptions,
    });
  
    const pulseCtx = document.getElementById('pulseChart').getContext('2d');
    new Chart(pulseCtx, {
      type: 'line',
      data: pulseData,
      options: chartOptions,
    });
  });