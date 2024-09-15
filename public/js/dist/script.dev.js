"use strict";

document.addEventListener('DOMContentLoaded', function () {
  var masterSelect = document.getElementById('Masters');
  /**
   * Функция для загрузки мастеров с сервера и обновления выпадающего списка.
   * Выполняет асинхронный запрос к API, обрабатывает ответ и обновляет DOM.
   * В случае ошибки выводит сообщение в консоль.
   */

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
              if (!master.id || !master.name || !master.surname) {
                throw new Error("\u041D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u043C\u0430\u0441\u0442\u0435\u0440\u0430: ".concat(JSON.stringify(master)));
              }

              var option = document.createElement('option');
              option.value = master.id;
              option.textContent = "".concat(master.name, " ").concat(master.surname);
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
});
var masterSelect = document.getElementById("dropdown_master");

if (masterSelect) {
  masterSelect.addEventListener("change", function () {
    var masterId = this.value;

    if (masterId) {
      fetch("/api/services?master_id=".concat(masterId)) // изменённый путь
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Network response was not ok: ".concat(response.status));
        }

        return response.json();
      }).then(function (data) {
        var serviceSelect = document.getElementById("dropdown_service");

        if (serviceSelect) {
          serviceSelect.innerHTML = '<option value="">Выберите услугу</option>';

          if (!Array.isArray(data.services)) {
            throw new Error("Некорректный формат данных: ожидается массив услуг");
          }

          data.services.forEach(function (service) {
            if (!service.id || !service.name) {
              throw new Error("\u041D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u0443\u0441\u043B\u0443\u0433\u0438: ".concat(JSON.stringify(service)));
            }

            var option = document.createElement("option");
            option.value = service.id;
            option.textContent = service.name;
            serviceSelect.appendChild(option);
          });
        }
      })["catch"](function (error) {
        return console.error("Ошибка при загрузке услуг:", error);
      });
    }
  });
} // Загрузка услуг на основе выбранного мастера


var masterSelectService = document.getElementById("dropdown_master");

if (masterSelectService) {
  masterSelectService.addEventListener("change", function () {
    var masterId = this.value;

    if (masterId) {
      fetch("/api/services?master_id=".concat(masterId)).then(function (response) {
        if (!response.ok) {
          throw new Error("Network response was not ok: ".concat(response.status));
        }

        return response.json();
      }).then(function (data) {
        var serviceSelect = document.getElementById("dropdown_service");

        if (serviceSelect) {
          serviceSelect.innerHTML = '<option value="">Выберите услугу</option>';

          if (!Array.isArray(data.services)) {
            throw new Error("Некорректный формат данных: ожидается массив услуг");
          }

          data.services.forEach(function (service) {
            if (!service.id || !service.name) {
              throw new Error("\u041D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u0443\u0441\u043B\u0443\u0433\u0438: ".concat(JSON.stringify(service)));
            }

            var option = document.createElement("option");
            option.value = service.id;
            option.textContent = service.name;
            serviceSelect.appendChild(option);
          });
        }
      })["catch"](function (error) {
        return console.error("Ошибка при загрузке услуг:", error);
      });
    }
  });
} // Обработка отправки формы


var bookingForm = document.getElementById("bookingForm");

if (bookingForm) {
  bookingForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var formData = new FormData(this);
    fetch("/php/process_form.php", {
      method: "POST",
      body: formData
    }).then(function (response) {
      if (!response.ok) {
        throw new Error("Network response was not ok: ".concat(response.status));
      }

      return response.json();
    }).then(function (data) {
      var responseMessage = document.getElementById("responseMessage");

      if (responseMessage) {
        responseMessage.textContent = data.message;
      }
    })["catch"](function (error) {
      return console.error("Ошибка при отправке формы:", error);
    });
  });
}