"use strict";

// Включаем календарь с Flatpickr
flatpickr("#datepicker", {
  minDate: "today",
  inline: true,
  dateFormat: "Y-m-d",
  onChange: function onChange(selectedDates, dateStr, instance) {
    document.getElementById('time-slots').innerHTML = ''; // Очистка слотов времени при изменении даты

    generateTimeSlots(); // Генерация временных слотов
  }
}); // Функция для генерации слотов времени

function generateTimeSlots() {
  var timeSlots = ["09:00", "10:00",, "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];
  var timeSlotsContainer = document.getElementById('time-slots');
  timeSlots.forEach(function (time) {
    var slot = document.createElement('div');
    slot.classList.add('time-slot');
    slot.id = "time-slot-".concat(time.replace(':', '-'));
    slot.innerText = time; // Добавляем событие для выбора времени

    slot.addEventListener('click', function () {
      document.querySelectorAll('.time-slot').forEach(function (slot) {
        return slot.classList.remove('active');
      });
      this.classList.add('active');
      document.getElementById('nextBtn').disabled = false;
    });
    timeSlotsContainer.appendChild(slot);
  });
} // // Отключаем кнопку "Следующий" по умолчанию
//  document.getElementById('nextBtn').addEventListener('click', function() {
//     const selectedDate = document.getElementById('datepicker').value;
//      const selectedTime = document.querySelector('.time-slot.active').innerText;
//      console.log(`Вы выбрали дату: ${selectedDate}, время: ${selectedTime}`); });