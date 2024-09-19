let clientBooking;
let selectedDate = null;
let selectedTime = null;
let currentPage = 1;
const totalPages = 4;

document.addEventListener('DOMContentLoaded', function() {
    const masterSelect = document.getElementById('Masters');

    // Функция для загрузки мастеров
    async function loadMasters() {
        try {
            const response = await fetch('/api/masters');
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            const data = await response.json();
            if (!Array.isArray(data.masters)) {
                throw new Error('Некорректный формат данных: ожидается массив мастеров');
            }

            // Очистка текущих опций
            masterSelect.innerHTML = '<option value="">Выберите мастера</option>';

            // Добавление новых опций
            data.masters.forEach(master => {
                if (!master.Id || !master.Name || !master.Surname) {
                    throw new Error(`Некорректные данные мастера: ${JSON.stringify(master)}`);
                }
                const option = document.createElement('option');
                option.value = master.Id;
                option.textContent = `${master.Name} ${master.Surname}`;
                masterSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Ошибка при загрузке мастеров:', error);
        }
    }

    // Загрузка мастеров при загрузке страницы
    loadMasters();
});



// Получение select элемента с услугами
const serviceSelect = document.getElementById('Services');

// Функция для загрузки услуг в зависимости от выбранного мастера
async function loadServicesForMaster(masterId) {
    try {
        if (!masterId) {
            serviceSelect.innerHTML = '<option value="">Выберите мастера для услуг</option>';
            return;
        }

        // Отправляем запрос на сервер для получения услуг мастера
        const response = await fetch(`/api/services?master_id=${masterId}`);
        if (!response.ok) {
            throw new Error(`Ошибка сети: ${response.status}`);
        }

        const data = await response.json();
        if (!Array.isArray(data.services)) {
            throw new Error('Неверный формат данных: ожидается массив услуг');
        }

        // Очистка текущих опций
        serviceSelect.innerHTML = '<option value="">Выберите услугу</option>';

        // Добавление опций для полученных услуг
        data.services.forEach(service => {
            const option = document.createElement('option');
            option.value = service.id;
            option.textContent = service.name;
            serviceSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Ошибка при загрузке услуг:', error);
    }
}

// Событие при изменении мастера
document.getElementById('Masters').addEventListener('change', function() {
    const selectedMasterId = this.value;
    loadServicesForMaster(selectedMasterId);  // Загрузка услуг для выбранного мастера
});


// Функция для обработки отправки формы
function handleFormSubmit(event) {
  event.preventDefault();

  // Получаем значения из полей формы user_data
  const name = document.getElementById('name').value;
  const surname = document.getElementById('surname').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const masters = document.getElementById('Masters').value;
  const services = document.getElementById('Services').value;
  const time = selectedTime;

  // Создаем объект booking
  const booking = {
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
};
//инициация отправки формы
document.getElementById('user_data').addEventListener('submit', async function(event) {
    event.preventDefault(); // Отключаем стандартное поведение формы

    const formData = {
      name: document.getElementById('name').value,
      surname: document.getElementById('surname').value,
      phone: document.getElementById('phone').value,
      email: document.getElementById('email').value,
      master: document.getElementById('master').value,
      service: document.getElementById('service').value,
      date: document.getElementById('date').value,
      time: document.getElementById('time').value
    };

    try {
      const response = await fetch('/api/confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.success) {
        alert('Бронирование успешно создано!');
      } else {
        alert(`Ошибка: ${result.error}`);
      }
    } catch (error) {
      console.error('Ошибка отправки данных:', error);
      alert('Произошла ошибка при отправке бронирования.');
    }
  });

// Настройка событий для страницы 4
function setupPage4Events() {
  console.log("Setting up events for page 4");

  // Обновление деталей бронирования
  const detailName = document.getElementById('detailName');
  const detailPhone = document.getElementById('detailPhone');
  const detailEmail = document.getElementById('detailEmail');
  const detailMaster = document.getElementById('detailMaster');
  const detailService = document.getElementById('detailService');
  const detailDate = document.getElementById('detailDate');
  const detailTime = document.getElementById('detailTime');

  const name = document.getElementById('name').value;
  const surname = document.getElementById('surname').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const master = document.getElementById('Masters').value;
  const service = document.getElementById('Services').value;
  const date = selectedDate;
  const time = selectedTime;

  detailName.textContent = surname + " " + name;
  detailPhone.textContent = phone;
  detailEmail.textContent = email;
  detailMaster.textContent = master;
  detailService.textContent = service;
  detailDate.textContent = date;
  detailTime.textContent = time;

  // Добавьте другие необходимые события и настройки для страницы 4
}

// Настройка календаря с помощью flatpickr
let dateflatpickr = flatpickr("#datepicker", {
    minDate: "today",
    inline: true,
    dateFormat: "d-m-y",
    onChange: function(selectedDates, dateStr, instance) {
        document.getElementById('timeSlots').innerHTML = ''; // Очистка слотов времени при изменении даты
        selectedDate = dateStr; // Сохраняем выбранную дату
        generateTimeSlots(); // Генерация временных слотов
    }
});

// Функция для генерации слотов времени
function generateTimeSlots() {
    const timeSlots = ["09:00","10:00","11:00","12:00", "13:00", "14:00", "15:00", "16:00","17:00","18:00"];
    const timeSlotsContainer = document.getElementById('timeSlots');
    
    timeSlots.forEach(time => {
        const slot = document.createElement('div');
        slot.classList.add('time-slot');
        slot.id = `time-slot-${time.replace(':', '-')}`;
        slot.innerText = time;

        // Добавляем событие для выбора времени
        slot.addEventListener('click', function() {
            document.querySelectorAll('.time-slot').forEach(slot => slot.classList.remove('active'));
            this.classList.add('active');
            selectedTime = time; // Сохраняем выбранное время
            document.getElementById('nextBtn').disabled = false;
        });

        timeSlotsContainer.appendChild(slot);
    });
}

// Обновление объекта бронирования
function updateBookingObject() {
    const booking = {
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
}


// Обновление кнопок прогресса в зависимости от текущей страницы
function updateProgress() {
    for (let i = 1; i <= totalPages; i++) {
        const progressBtn = document.getElementById(`progress${i}`);
        if (i <= currentPage) {
            progressBtn.classList.add('active');
        } else {
            progressBtn.classList.remove('active');
        }
    }
}

// Обновление текста и типа кнопки "Далее"
function updateButtons() {
    const nextBtn = document.getElementById("nextBtn");
    if (currentPage === totalPages) {
        nextBtn.textContent = "Підтверджую";  // Меняем текст кнопки на "Submit"
        nextBtn.setAttribute("type", "submit");  // Меняем тип кнопки на "submit"
    } else {
        nextBtn.textContent = "Далі";  // Меняем текст кнопки на "Next"
        nextBtn.setAttribute("type", "button");  // Меняем тип кнопки на "button"
    }
};


document.addEventListener('DOMContentLoaded', function() {
    const nextBtn = document.getElementById("nextBtn");

    // Функция для отправки данных бронирования
    function submitBookingForm(event) {
        event.preventDefault(); // Предотвращаем стандартное поведение кнопки

        // Собираем данные в объект booking
        const booking = {
            name: document.getElementById('name').value,
            surname: document.getElementById('surname').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            master: document.getElementById('Masters').value,
            service: document.getElementById('Services').value,
            date: selectedDate, // предполагается, что переменная selectedDate уже существует
            time: selectedTime  // предполагается, что переменная selectedTime уже существует
        };

        console.log(booking);  // Логирование данных для проверки

        // Проверка валидности данных
        if (!booking.name || !booking.surname || !booking.phone || !booking.email || !booking.master || !booking.service || !booking.date || !booking.time) {
            alert("Пожалуйста, заполните все поля.");
            return;
        }

        // Отправка данных через fetch
        fetch('/api/confirm', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                alert('Бронирование успешно создано!');
            } else {
                alert(`Ошибка: ${result.error}`);
            }
        })
        .catch(error => {
            console.error('Ошибка отправки данных:', error);
            alert('Произошла ошибка при отправке бронирования.');
        });
    }

    // Обработчик клика по кнопке вне формы
    nextBtn.addEventListener('click', submitBookingForm);
});

// Механизм переключения страниц
function showPage(page) {
    console.log("showPage" + page);  
    for(let i = 1; i <= totalPages; i++){
        const PageElement = document.getElementById(`page${i}`);
        if (i === page) {
            PageElement.classList.add('active');
            PageElement.classList.remove('hide');
            if (i === 4){
                setupPage4Events();
            }
        } else {
            PageElement.classList.add('hide');
            PageElement.classList.remove('active');
        }
    }
    updateProgress();
    updateButtons();
}

// Обработчик кнопки "Назад"
document.getElementById("backBtn").addEventListener("click", function(){
    if (currentPage > 1){
        currentPage--;
        showPage(currentPage);
    }
});

// Обработчик кнопки "Далее"
document.getElementById('nextBtn').addEventListener('click', function() {
    if (currentPage < totalPages) {
        currentPage++;
        showPage(currentPage);
        if (currentPage === totalPages) {
            updateBookingObject();
        }
    }
});

// Начальное отображение первой страницы
showPage(currentPage);
