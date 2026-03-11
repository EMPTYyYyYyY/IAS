document.addEventListener("DOMContentLoaded", () => {
  let metricChart = null;
  let userData = {
    name: "Иван Иванов",
    email: "ivan@example.com",
    phone: "+7 (999) 000-00-00",
    birthdate: "1985-05-15",
    gender: "male",
  };

  // Данные записей к врачу
  let appointments = [
    {
      id: 1,
      doctor: "Терапевт",
      doctorName: "Иванова Анна Петровна",
      date: "2025-02-20",
      time: "10:00",
      reason: "Плановый осмотр",
      status: "upcoming",
    },
    {
      id: 2,
      doctor: "Кардиолог",
      doctorName: "Петров Сергей Иванович",
      date: "2025-02-25",
      time: "14:00",
      reason: "Консультация по результатам ЭКГ",
      status: "upcoming",
    },
    {
      id: 3,
      doctor: "Терапевт",
      doctorName: "Иванова Анна Петровна",
      date: "2025-01-15",
      time: "11:00",
      reason: "Первичный прием",
      status: "past",
    },
  ];

  // ===== ИСПРАВЛЕНО: Единая структура данных для всех показателей =====
  const metricsData = {
    bp: {
      id: "bp",
      title: "Артериальное давление",
      currentValue: "120/80",
      unit: "мм рт. ст.",
      icon: "heartbeat",
      color: "#e74c3c",
      data: {
        day: {
          labels: [
            "08:00",
            "10:00",
            "12:00",
            "14:00",
            "16:00",
            "18:00",
            "20:00",
          ],
          systolic: [118, 120, 122, 119, 121, 118, 120],
          diastolic: [78, 80, 82, 79, 81, 78, 80],
        },
        week: {
          labels: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
          systolic: [120, 122, 119, 123, 121, 118, 120],
          diastolic: [80, 82, 79, 83, 81, 78, 80],
        },
        month: {
          labels: [
            "1 янв",
            "8 янв",
            "15 янв",
            "22 янв",
            "1 фев",
            "8 фев",
            "15 фев",
          ],
          systolic: [125, 122, 120, 119, 121, 118, 120],
          diastolic: [85, 82, 80, 79, 81, 78, 80],
        },
      },
    },
    glucose: {
      id: "glucose",
      title: "Уровень глюкозы",
      currentValue: "5.4",
      unit: "ммоль/л",
      icon: "tint",
      color: "#f1c40f",
      data: {
        day: {
          labels: [
            "08:00",
            "10:00",
            "12:00",
            "14:00",
            "16:00",
            "18:00",
            "20:00",
          ],
          values: [5.2, 5.4, 5.6, 5.3, 5.5, 5.4, 5.3],
        },
        week: {
          labels: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
          values: [5.2, 5.4, 5.3, 5.5, 5.4, 5.2, 5.3],
        },
        month: {
          labels: [
            "1 янв",
            "8 янв",
            "15 янв",
            "22 янв",
            "1 фев",
            "8 фев",
            "15 фев",
          ],
          values: [5.8, 5.5, 5.4, 5.3, 5.4, 5.2, 5.3],
        },
      },
    },
    weight: {
      id: "weight",
      title: "Вес тела",
      currentValue: "75",
      unit: "кг",
      icon: "weight",
      color: "#2ecc71",
      data: {
        day: {
          labels: ["08:00", "12:00", "16:00", "20:00"],
          values: [75.0, 75.2, 75.1, 75.0],
        },
        week: {
          labels: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
          values: [75.5, 75.4, 75.3, 75.2, 75.1, 75.0, 75.0],
        },
        month: {
          labels: [
            "1 янв",
            "8 янв",
            "15 янв",
            "22 янв",
            "1 фев",
            "8 фев",
            "15 фев",
          ],
          values: [78, 77.5, 77, 76.5, 76, 75.5, 75],
        },
      },
    },
    pulse: {
      id: "pulse",
      title: "Пульс",
      currentValue: "72",
      unit: "уд/мин",
      icon: "heart",
      color: "#e74c3c",
      data: {
        day: {
          labels: [
            "08:00",
            "10:00",
            "12:00",
            "14:00",
            "16:00",
            "18:00",
            "20:00",
          ],
          values: [68, 72, 75, 70, 73, 71, 72],
        },
        week: {
          labels: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
          values: [70, 72, 71, 73, 72, 69, 72],
        },
        month: {
          labels: [
            "1 янв",
            "8 янв",
            "15 янв",
            "22 янв",
            "1 фев",
            "8 фев",
            "15 фев",
          ],
          values: [75, 73, 72, 71, 72, 70, 72],
        },
      },
    },
    saturation: {
      id: "saturation",
      title: "Сатурация",
      currentValue: "98",
      unit: "%",
      icon: "lungs",
      color: "#3498db",
      data: {
        day: {
          labels: [
            "08:00",
            "10:00",
            "12:00",
            "14:00",
            "16:00",
            "18:00",
            "20:00",
          ],
          values: [98, 98, 97, 98, 98, 99, 98],
        },
        week: {
          labels: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
          values: [98, 97, 98, 98, 99, 98, 98],
        },
        month: {
          labels: [
            "1 янв",
            "8 янв",
            "15 янв",
            "22 янв",
            "1 фев",
            "8 фев",
            "15 фев",
          ],
          values: [97, 98, 98, 98, 98, 99, 98],
        },
      },
    },
    temperature: {
      id: "temperature",
      title: "Температура",
      currentValue: "36.6",
      unit: "°C",
      icon: "thermometer-half",
      color: "#e67e22",
      data: {
        day: {
          labels: [
            "08:00",
            "10:00",
            "12:00",
            "14:00",
            "16:00",
            "18:00",
            "20:00",
          ],
          values: [36.5, 36.6, 36.7, 36.6, 36.5, 36.6, 36.5],
        },
        week: {
          labels: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
          values: [36.6, 36.5, 36.7, 36.6, 36.5, 36.6, 36.6],
        },
        month: {
          labels: [
            "1 янв",
            "8 янв",
            "15 янв",
            "22 янв",
            "1 фев",
            "8 фев",
            "15 фев",
          ],
          values: [36.8, 36.7, 36.6, 36.5, 36.6, 36.6, 36.6],
        },
      },
    },
  };

  // ===== 1. Генерация медицинских показателей =====
  const generateMetrics = () => {
    const grid = document.querySelector(".patient-grid");
    if (!grid) return;

    // ИСПРАВЛЕНО: Используем metric.id вместо metric.icon
    grid.innerHTML = Object.values(metricsData)
      .map(
        (metric) => `
            <div class="patient-card" data-metric-id="${metric.id}" onclick="openMetricDetail('${metric.id}')">
                <i class="fas fa-${metric.icon}" style="color: ${metric.color}"></i>
                <h3>${metric.title}</h3>
                <p class="metric-value">${metric.currentValue}</p>
                <p class="timestamp">${new Date().toLocaleDateString()}</p>
                <p class="click-hint"><i class="fas fa-chart-line"></i> Подробнее</p>
            </div>
        `,
      )
      .join("");
  };

  // ===== 2. Открытие детального просмотра показателя =====
  window.openMetricDetail = (metricId) => {
    const metric = metricsData[metricId];
    if (!metric) return;

    const modal = document.getElementById("metricDetailModal");
    const title = document.getElementById("metricDetailTitle");
    const currentValue = document.getElementById("metricCurrentValue");
    const currentUnit = document.getElementById("metricCurrentUnit");

    title.innerHTML = `<i class="fas fa-${metric.icon}"></i> ${metric.title}`;
    currentValue.textContent = metric.currentValue;
    currentUnit.textContent = metric.unit;

    modal.classList.add("show");
    renderMetricChart(metric, "day");
    setupPeriodSelectors(metric);
  };

  // ===== 3. Рендеринг графика показателя =====
  const renderMetricChart = (metric, period) => {
    const ctx = document.getElementById("metricDetailChart");
    if (!ctx) return;

    if (metricChart) {
      metricChart.destroy();
    }

    const periodData = metric.data[period];
    const isBloodPressure = metric.id === "bp";

    const datasets = isBloodPressure
      ? [
          {
            label: "Верхнее (систолическое)",
            data: periodData.systolic,
            borderColor: "#e74c3c",
            backgroundColor: "rgba(231, 76, 60, 0.1)",
            tension: 0.4,
            fill: true,
            borderWidth: 2,
          },
          {
            label: "Нижнее (диастолическое)",
            data: periodData.diastolic,
            borderColor: "#3498db",
            backgroundColor: "rgba(52, 152, 219, 0.1)",
            tension: 0.4,
            fill: true,
            borderWidth: 2,
          },
        ]
      : [
          {
            label: metric.title,
            data: periodData.values,
            borderColor: metric.color,
            backgroundColor: metric.color + "20",
            tension: 0.4,
            fill: true,
            borderWidth: 2,
          },
        ];

    updateStatistics(metric, period, isBloodPressure);

    metricChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: periodData.labels,
        datasets: datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
            labels: {
              font: { size: 12, family: "'Segoe UI', sans-serif" },
              color: "#7f8c8d",
            },
          },
          tooltip: {
            mode: "index",
            intersect: false,
            backgroundColor: "rgba(44, 62, 80, 0.9)",
            titleColor: "#ecf0f1",
            bodyColor: "#ecf0f1",
            borderColor: "#3498db",
            borderWidth: 1,
          },
        },
        scales: {
          y: {
            beginAtZero: false,
            grid: {
              color: "#ecf0f1",
              drawBorder: false,
            },
            ticks: {
              color: "#95a5a6",
              font: { size: 11 },
            },
            title: {
              display: true,
              text: metric.unit,
              color: "#7f8c8d",
              font: { size: 12 },
            },
          },
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: "#95a5a6",
              font: { size: 11 },
            },
          },
        },
        interaction: {
          mode: "nearest",
          axis: "x",
          intersect: false,
        },
      },
    });
  };

  // ===== 4. Обновление статистики =====
  const updateStatistics = (metric, period, isBloodPressure) => {
    const periodData = metric.data[period];
    const values = isBloodPressure ? periodData.systolic : periodData.values;

    const max = Math.max(...values);
    const min = Math.min(...values);
    const avg = (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1);

    if (isBloodPressure) {
      const maxDiastolic = Math.max(...periodData.diastolic);
      const minDiastolic = Math.min(...periodData.diastolic);
      const avgDiastolic = (
        periodData.diastolic.reduce((a, b) => a + b, 0) /
        periodData.diastolic.length
      ).toFixed(1);
      document.getElementById("statMax").textContent = `${max}/${maxDiastolic}`;
      document.getElementById("statMin").textContent = `${min}/${minDiastolic}`;
      document.getElementById("statAvg").textContent = `${avg}/${avgDiastolic}`;
    } else {
      document.getElementById("statMax").textContent = max;
      document.getElementById("statMin").textContent = min;
      document.getElementById("statAvg").textContent = avg;
    }

    const normalRanges = {
      bp: { min: 110, max: 140 },
      glucose: { min: 3.3, max: 5.5 },
      weight: { min: 60, max: 90 },
      pulse: { min: 60, max: 100 },
      saturation: { min: 95, max: 100 },
      temperature: { min: 36.4, max: 37.0 },
    };

    const range = normalRanges[metric.id];
    const isNormal = avg >= range.min && avg <= range.max;
    const normalElement = document.getElementById("statNormal");
    normalElement.textContent = isNormal ? "В пределах" : "Требует внимания";
    normalElement.style.color = isNormal ? "#2ecc71" : "#e74c3c";
  };

  // ===== 5. Настройка переключателей периода =====
  const setupPeriodSelectors = (metric) => {
    const periodBtns = document.querySelectorAll(".period-btn");
    periodBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        periodBtns.forEach((b) => b.classList.remove("active"));
        this.classList.add("active");
        const period = this.getAttribute("data-period");
        renderMetricChart(metric, period);
      });
    });
  };

  // ===== 6. Генерация списка лекарств =====
  const generatePrescriptions = () => {
    const prescriptions = [
      {
        drug: "Аспирин Кардио",
        dosage: "100 мг × 1/день",
        doctor: "Иванова А.П.",
        date: "15.05.2023",
        status: "active",
      },
      {
        drug: "Метформин",
        dosage: "500 мг × 2/день",
        doctor: "Петров С.И.",
        date: "14.05.2023",
        status: "active",
      },
      {
        drug: "Витамин D3",
        dosage: "2000 МЕ × 1/день",
        doctor: "Иванова А.П.",
        date: "10.05.2023",
        status: "completed",
      },
    ];

    const container = document.querySelector(".prescriptions-list");
    if (!container) return;

    container.innerHTML = prescriptions
      .map(
        (prescription) => `
            <div class="prescription-card" style="border-left-color: ${prescription.status === "active" ? "#3498db" : "#95a5a6"}">
                <div class="prescription-header">
                    <i class="fas fa-pills"></i>
                    <div>
                        <h3>${prescription.drug}</h3>
                        <span class="doctor">${prescription.doctor}</span>
                    </div>
                </div>
                <div class="prescription-body">
                    <p><i class="fas fa-syringe"></i> ${prescription.dosage}</p>
                    <p><i class="fas fa-calendar"></i> ${prescription.date}</p>
                    <p><i class="fas fa-check-circle"></i> ${prescription.status === "active" ? "Активно" : "Завершено"}</p>
                </div>
            </div>
        `,
      )
      .join("");
  };

  // ===== 7. Генерация записей к врачу =====
  const generateAppointments = () => {
    const upcomingContainer = document.getElementById("upcomingAppointments");
    const pastContainer = document.getElementById("pastAppointments");
    if (!upcomingContainer || !pastContainer) return;

    const upcoming = appointments.filter((a) => a.status === "upcoming");
    const past = appointments.filter((a) => a.status === "past");

    const doctorIcons = {
      Терапевт: "fa-user-md",
      Кардиолог: "fa-heartbeat",
      Невролог: "fa-brain",
      Эндокринолог: "fa-flask",
      Дерматолог: "fa-hand-holding-medical",
    };

    const renderAppointmentCard = (appointment) => {
      const icon = doctorIcons[appointment.doctor] || "fa-user-md";
      const formattedDate = new Date(appointment.date).toLocaleDateString(
        "ru-RU",
        {
          day: "numeric",
          month: "long",
          year: "numeric",
        },
      );

      return `
                <div class="appointment-card ${appointment.status}">
                    <div class="appointment-info">
                        <div class="appointment-icon">
                            <i class="fas ${icon}"></i>
                        </div>
                        <div class="appointment-details">
                            <h4>${appointment.doctor}</h4>
                            <p><i class="fas fa-user"></i> ${appointment.doctorName}</p>
                            <p><i class="fas fa-calendar"></i> ${formattedDate}</p>
                            <p><i class="fas fa-clock"></i> ${appointment.time}</p>
                            <p><i class="fas fa-comment"></i> ${appointment.reason}</p>
                        </div>
                    </div>
                    <div class="appointment-actions">
                        ${
                          appointment.status === "upcoming"
                            ? `<button class="btn-cancel-appoint" onclick="cancelAppointment(${appointment.id})">
                                <i class="fas fa-times"></i> Отменить
                            </button>`
                            : `<button class="btn-view-details">
                                <i class="fas fa-file-medical"></i> Результаты
                            </button>`
                        }
                    </div>
                </div>
            `;
    };

    upcomingContainer.innerHTML =
      upcoming.length > 0
        ? upcoming.map(renderAppointmentCard).join("")
        : `<div class="empty-state"><i class="fas fa-calendar-check"></i><p>Нет предстоящих записей</p></div>`;

    pastContainer.innerHTML =
      past.length > 0
        ? past.map(renderAppointmentCard).join("")
        : `<div class="empty-state"><i class="fas fa-history"></i><p>Нет прошлых записей</p></div>`;
  };

  // ===== 8. Навигация =====
  const setupNavigation = () => {
    const navLinks = document.querySelectorAll(".sidebar nav a");
    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        document
          .querySelectorAll(".sidebar nav a")
          .forEach((el) => el.classList.remove("active"));
        document.querySelectorAll("section").forEach((el) => {
          el.classList.add("hidden");
          el.classList.remove("active");
        });
        this.classList.add("active");
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          targetSection.classList.remove("hidden");
          targetSection.classList.add("active");
        }
      });
    });
  };

  // ===== 9. Модальное окно записи =====
  const setupAppointmentModal = () => {
    const openBtn = document.getElementById("openAppointmentModal");
    const closeBtn = document.getElementById("closeAppointmentModal");
    const cancelBtn = document.getElementById("cancelAppointment");
    const modal = document.getElementById("appointmentModal");
    const form = document.getElementById("appointmentForm");

    if (!openBtn || !modal) return;

    const openModal = () => {
      modal.classList.add("show");
      document
        .getElementById("appointDate")
        .setAttribute("min", new Date().toISOString().split("T")[0]);
    };

    const closeModal = () => {
      modal.classList.remove("show");
      form.reset();
    };

    openBtn.addEventListener("click", openModal);
    closeBtn.addEventListener("click", closeModal);
    cancelBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const doctorSelect = document.getElementById("appointDoctor");
      const newAppointment = {
        id: appointments.length + 1,
        doctor: doctorSelect.value,
        doctorName: doctorSelect.options[doctorSelect.selectedIndex].text,
        date: document.getElementById("appointDate").value,
        time: document.getElementById("appointTime").value,
        reason: document.getElementById("appointReason").value || "Не указано",
        status: "upcoming",
      };
      appointments.unshift(newAppointment);
      generateAppointments();
      closeModal();
      alert("✅ Вы успешно записаны к врачу!");
    });
  };

  // ===== 10. Отмена записи =====
  window.cancelAppointment = (id) => {
    if (confirm("Отменить запись?")) {
      const appointment = appointments.find((a) => a.id === id);
      if (appointment) {
        appointment.status = "cancelled";
        generateAppointments();
        alert("Запись отменена");
      }
    }
  };

  // ===== 11. Чат =====
  const setupChat = () => {
    const sendMessageBtn = document.getElementById("sendMessage");
    const messageText = document.getElementById("messageText");
    const messagesHistory = document.getElementById("messagesHistory");
    if (!sendMessageBtn || !messageText || !messagesHistory) return;

    const addMessage = (text, isPatient = true) => {
      const time = new Date().toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const messageDiv = document.createElement("div");
      messageDiv.className = `message ${isPatient ? "patient" : "doctor"}`;
      messageDiv.innerHTML = `
                <div class="message-content">
                    <strong>${isPatient ? "Вы:" : "Др. Иванова:"}</strong>
                    <p>${text}</p>
                </div>
                <div class="message-time">${time}</div>
            `;
      messagesHistory.appendChild(messageDiv);
      messagesHistory.scrollTop = messagesHistory.scrollHeight;
    };

    const handleSend = () => {
      const text = messageText.value.trim();
      if (text) {
        addMessage(text, true);
        messageText.value = "";
        setTimeout(() => {
          const responses = [
            "Спасибо за информацию!",
            "Запишите это в дневник здоровья.",
            "Рекомендую измерить показатели ещё раз.",
          ];
          addMessage(
            responses[Math.floor(Math.random() * responses.length)],
            false,
          );
        }, 2000);
      }
    };

    sendMessageBtn.addEventListener("click", handleSend);
    messageText.addEventListener("keypress", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    });
  };

  // ===== 12. Профиль =====
  const setupProfile = () => {
    const profileTrigger = document.getElementById("profileTrigger");
    const profileModal = document.getElementById("profileModal");
    const closeModal = document.getElementById("closeModal");
    const cancelEdit = document.getElementById("cancelEdit");
    const profileForm = document.getElementById("profileForm");
    const userNameDisplay = document.querySelector(".user-name");
    const userEmailDisplay = document.querySelector(".user-email");

    profileTrigger.addEventListener("click", () => {
      profileModal.classList.add("show");
      document.getElementById("editName").value = userData.name;
      document.getElementById("editEmail").value = userData.email;
      document.getElementById("editPhone").value = userData.phone;
      document.getElementById("editBirthdate").value = userData.birthdate;
      document.getElementById("editGender").value = userData.gender;
    });

    const hideModal = () => profileModal.classList.remove("show");
    closeModal.addEventListener("click", hideModal);
    cancelEdit.addEventListener("click", hideModal);
    profileModal.addEventListener("click", (e) => {
      if (e.target === profileModal) hideModal();
    });

    profileForm.addEventListener("submit", (e) => {
      e.preventDefault();
      userData.name = document.getElementById("editName").value;
      userData.email = document.getElementById("editEmail").value;
      userNameDisplay.textContent = userData.name;
      userEmailDisplay.textContent = userData.email;
      const saveBtn = document.querySelector(".btn-save");
      const originalText = saveBtn.innerHTML;
      saveBtn.innerHTML = '<i class="fas fa-check"></i> Сохранено!';
      saveBtn.style.background = "#2ecc71";
      setTimeout(() => {
        saveBtn.innerHTML = originalText;
        saveBtn.style.background = "#3498db";
        hideModal();
      }, 1500);
    });
  };

  // ===== 13. Закрытие модального окна показателя =====
  const setupMetricModal = () => {
    const closeBtn = document.getElementById("closeMetricModal");
    const modal = document.getElementById("metricDetailModal");
    if (!closeBtn || !modal) return;

    const hideModal = () => {
      modal.classList.remove("show");
      if (metricChart) {
        metricChart.destroy();
        metricChart = null;
      }
    };

    closeBtn.addEventListener("click", hideModal);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) hideModal();
    });
  };

  // ===== 14. Выход =====
  const setupLogout = () => {
    const logoutBtn = document.getElementById("logout");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        if (confirm("Выйти из аккаунта?")) window.location.href = "index.html";
      });
    }
  };

  // ===== Инициализация =====
  generateMetrics();
  generatePrescriptions();
  generateAppointments();
  setupNavigation();
  setupAppointmentModal();
  setupMetricModal();
  setupChat();
  setupProfile();
  setupLogout();
});
