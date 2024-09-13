"use strict";

var currentPage = 1;
var totalPages = 4; //Обновляет кнопки прогресса в зависимости от текущей страницы.
//Проходит по всем страницам и добавляет или удаляет класс 'active'
//для соответствующего элемента кнопки прогресса.

function updateProgress() {
  for (var i = 1; i <= totalPages; i++) {
    var progressBtn = document.getElementById("progress".concat(i));

    if (i <= currentPage) {
      progressBtn.classList.add('active');
    } else {
      progressBtn.classList.remove('active');
    }
  }
}

function updateButtons() {
  // Отключаем кнопку "Назад" на первой странице
  var nextBtn = document.getElementById("nextBtn");

  if (currentPage === totalPages) {
    nextBtn.textContent = "Підтверджую"; // Меняем текст кнопки на "Submit"

    nextBtn.setAttribute("type", "submit"); // Меняем тип кнопки на "submit"
  } else {
    nextBtn.textContent = "Далі"; // Меняем текст кнопки на "Next"

    nextBtn.setAttribute("type", "button"); // Меняем тип кнопки на "button"
  }
} //Механизм переключения страниц 


function showPage(page) {
  console.log("showPage" + page);

  for (var i = 1; i <= totalPages; i++) {
    var PageElement = document.getElementById("page".concat(i));

    if (i === page) {
      PageElement.classList.add('active');
      PageElement.classList.remove('hide');
    } else {
      PageElement.classList.add('hide');
      PageElement.classList.remove('active');
    }
  }

  updateProgress();
  updateButtons();
}

document.getElementById("backBtn").addEventListener("click", function () {
  if (currentPage > 1) {
    currentPage--;
    showPage(currentPage);
  }
});
document.getElementById("nextBtn").addEventListener("click", function () {
  console.log("nextBtn");

  if (currentPage < totalPages) {
    currentPage++;
    showPage(currentPage);
  }
}); // Начальное отображение первой страницы

showPage(currentPage);
document.getElementById('bookingForm').addEventListener('submit', function _callee(e) {
  var name, surname, email, phone, booking_date, response, result;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          e.preventDefault();
          name = document.getElementById('name').value;
          surname = document.getElementById('surname').value;
          email = document.getElementById('email').value;
          phone = document.getElementById('phone').value;
          booking_date = document.getElementById('date').value;
          _context.next = 8;
          return regeneratorRuntime.awrap(fetch('/api/bookings', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: name,
              email: email,
              phone: phone,
              booking_date: booking_date
            })
          }));

        case 8:
          response = _context.sent;
          _context.next = 11;
          return regeneratorRuntime.awrap(response.json());

        case 11:
          result = _context.sent;
          document.getElementById('responseMessage').innerText = result.message;

        case 13:
        case "end":
          return _context.stop();
      }
    }
  });
});