"use strict";

var clientBooking;
var selectedDate = null;
var selectedTime = null;
var currentPage = 1;
var totalPages = 4;
document.addEventListener('DOMContentLoaded', function () {
  var masterSelect = document.getElementById('Masters'); // Функция для загрузки мастеров

  function loadMasters() {
    var response, data;
    return regeneratorRuntime.async(function loadMasters$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(fetch('/api/masters'));

          case 3:
            response = _context.sent;

            if (response.ok) {
              _context.next = 6;
              break;
            }

            throw new Error("Network response was not ok: ".concat(response.status));

          case 6:
            _context.next = 8;
            return regeneratorRuntime.awrap(response.json());

          case 8:
            data = _context.sent;

            if (Array.isArray(data.masters)) {
              _context.next = 11;
              break;
            }

            throw new Error('Некорректный формат данных: ожидается массив мастеров');

          case 11:
            // Очистка текущих опций
            masterSelect.innerHTML = '<option value="">Выберите мастера</option>'; // Добавление новых опций

            data.masters.forEach(function (master) {
              if (!master.idMasters || !master.Name || !master.Surname) {
                throw new Error("\u041D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u043C\u0430\u0441\u0442\u0435\u0440\u0430: ".concat(JSON.stringify(master)));
              }

              var option = document.createElement('option');
              option.value = master.idMasters;
              option.textContent = "".concat(master.Name, " ").concat(master.Surname);
              masterSelect.appendChild(option);
            });
            _context.next = 18;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](0);
            console.error('Ошибка при загрузке мастеров:', _context.t0);

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 15]]);
  } // Загрузка мастеров при загрузке страницы


  loadMasters();
}); // Функция для обработки отправки формы

function handleFormSubmit(event) {
  event.preventDefault(); // Получаем значения из полей формы user_data

  var name = document.getElementById('name').value;
  var surname = document.getElementById('surname').value;
  var phone = document.getElementById('phone').value;
  var email = document.getElementById('email').value;
  var masters = document.getElementById('Masters').value;
  var services = document.getElementById('Services').value;
  var time = selectedTime; // Создаем объект booking

  var booking = {
    name: name,
    surname: surname,
    phone: phone,
    email: email,
    master: masters,
    service: services,
    date: selectedDate,
    time: time
  };
  console.log(booking);
} // Настройка событий для страницы 4


function setupPage4Events() {
  console.log("Setting up events for page 4"); // Обновление деталей бронирования

  var detailName = document.getElementById('detailName');
  var detailPhone = document.getElementById('detailPhone');
  var detailEmail = document.getElementById('detailEmail');
  var detailMaster = document.getElementById('detailMaster');
  var detailService = document.getElementById('detailService');
  var detailDate = document.getElementById('detailDate');
  var detailTime = document.getElementById('detailTime');
  var name = document.getElementById('name').value;
  var surname = document.getElementById('surname').value;
  var phone = document.getElementById('phone').value;
  var email = document.getElementById('email').value;
  var master = document.getElementById('Masters').value;
  var service = document.getElementById('Services').value;
  var date = selectedDate;
  var time = selectedTime;
  detailName.textContent = surname + " " + name;
  detailPhone.textContent = phone;
  detailEmail.textContent = email;
  detailMaster.textContent = master;
  detailService.textContent = service;
  detailDate.textContent = date;
  detailTime.textContent = time; // Добавьте другие необходимые события и настройки для страницы 4
} // Настройка календаря с помощью flatpickr


var dateflatpickr = flatpickr("#datepicker", {
  minDate: "today",
  inline: true,
  dateFormat: "d-m-y",
  onChange: function onChange(selectedDates, dateStr, instance) {
    document.getElementById('timeSlots').innerHTML = ''; // Очистка слотов времени при изменении даты

    selectedDate = dateStr; // Сохраняем выбранную дату

    generateTimeSlots(); // Генерация временных слотов
  }
}); // Функция для генерации слотов времени

function generateTimeSlots() {
  var timeSlots = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];
  var timeSlotsContainer = document.getElementById('timeSlots');
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
      selectedTime = time; // Сохраняем выбранное время

      document.getElementById('nextBtn').disabled = false;
    });
    timeSlotsContainer.appendChild(slot);
  });
} // Обновление объекта бронирования


function updateBookingObject() {
  var booking = {
    name: document.getElementById('name').value,
    surname: document.getElementById('surname').value,
    phone: document.getElementById('phone').value,
    email: document.getElementById('email').value,
    master: document.getElementById('Masters').value,
    service: document.getElementById('Services').value,
    date: selectedDate,
    time: selectedTime
  };
  console.log(booking);
} // Обновление кнопок прогресса в зависимости от текущей страницы


function updateProgress() {
  for (var i = 1; i <= totalPages; i++) {
    var progressBtn = document.getElementById("progress".concat(i));

    if (i <= currentPage) {
      progressBtn.classList.add('active');
    } else {
      progressBtn.classList.remove('active');
    }
  }
} // Обновление текста и типа кнопки "Далее"


function updateButtons() {
  var nextBtn = document.getElementById("nextBtn");

  if (currentPage === totalPages) {
    nextBtn.textContent = "Підтверджую"; // Меняем текст кнопки на "Submit"

    nextBtn.setAttribute("type", "submit"); // Меняем тип кнопки на "submit"
  } else {
    nextBtn.textContent = "Далі"; // Меняем текст кнопки на "Next"

    nextBtn.setAttribute("type", "button"); // Меняем тип кнопки на "button"
  }
} // Механизм переключения страниц


function showPage(page) {
  console.log("showPage" + page);

  for (var i = 1; i <= totalPages; i++) {
    var PageElement = document.getElementById("page".concat(i));

    if (i === page) {
      PageElement.classList.add('active');
      PageElement.classList.remove('hide');

      if (i === 4) {
        setupPage4Events();
      }
    } else {
      PageElement.classList.add('hide');
      PageElement.classList.remove('active');
    }
  }

  updateProgress();
  updateButtons();
} // Обработчик кнопки "Назад"


document.getElementById("backBtn").addEventListener("click", function () {
  if (currentPage > 1) {
    currentPage--;
    showPage(currentPage);
  }
}); // Обработчик кнопки "Далее"

document.getElementById('nextBtn').addEventListener('click', function () {
  if (currentPage < totalPages) {
    currentPage++;
    showPage(currentPage);

    if (currentPage === totalPages) {
      updateBookingObject();
    }
  }
}); // Начальное отображение первой страницы

showPage(currentPage);