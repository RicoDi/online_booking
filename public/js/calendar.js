// script.js

// Включаем календарь с Flatpickr
flatpickr("#datepicker", {
    minDate: "today",
    dateFormat: "Y-m-d",
    onChange: function(selectedDates, dateStr, instance) {
        document.getElementById('time-slots').innerHTML = ''; // Очистка слотов времени при изменении даты
        generateTimeSlots(); // Генерация временных слотов
    }
});

// Функция для генерации слотов времени
function generateTimeSlots() {
    const timeSlots = ["12:00", "13:00", "14:00", "15:00", "16:00"];
    const timeSlotsContainer = document.getElementById('time-slots');
    
    timeSlots.forEach(time => {
        const slot = document.createElement('div');
        slot.classList.add('time-slot');
        slot.innerText = time;

        // Добавляем событие для выбора времени
        slot.addEventListener('click', function() {
            document.querySelectorAll('.time-slot').forEach(slot => slot.classList.remove('active'));
            this.classList.add('active');
            document.getElementById('nextStep').disabled = false;
        });

        timeSlotsContainer.appendChild(slot);
    });
}

// Отключаем кнопку "Следующий" по умолчанию
document.getElementById('nextStep').addEventListener('click', function() {
    const selectedDate = document.getElementById('datepicker').value;
    const selectedTime = document.querySelector('.time-slot.active').innerText;

    alert(`Вы выбрали дату: ${selectedDate}, время: ${selectedTime}`);
});