"use strict";

// Загрузка доступных мастеров
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
});

var _require = require('./models'),
    sequelize = _require.sequelize,
    Master = _require.Master,
    Service = _require.Service;

function loadServicesForMaster(masterId) {
  var master;
  return regeneratorRuntime.async(function loadServicesForMaster$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(sequelize.sync());

        case 2:
          _context2.next = 4;
          return regeneratorRuntime.awrap(Master.findByPk(masterId, {
            include: Service
          }));

        case 4:
          master = _context2.sent;

          if (!master) {
            _context2.next = 9;
            break;
          }

          return _context2.abrupt("return", master.Services);

        case 9:
          return _context2.abrupt("return", null);

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  });
} // Пример использования функции


(function _callee() {
  var master, service1, service2, services;
  return regeneratorRuntime.async(function _callee$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(sequelize.sync({
            force: true
          }));

        case 2:
          _context3.next = 4;
          return regeneratorRuntime.awrap(Master.create({
            name: 'John Doe'
          }));

        case 4:
          master = _context3.sent;
          _context3.next = 7;
          return regeneratorRuntime.awrap(Service.create({
            name: 'Haircut',
            description: 'Basic haircut'
          }));

        case 7:
          service1 = _context3.sent;
          _context3.next = 10;
          return regeneratorRuntime.awrap(Service.create({
            name: 'Shave',
            description: 'Basic shave'
          }));

        case 10:
          service2 = _context3.sent;
          _context3.next = 13;
          return regeneratorRuntime.awrap(master.addServices([service1, service2]));

        case 13:
          _context3.next = 15;
          return regeneratorRuntime.awrap(loadServicesForMaster(master.id));

        case 15:
          services = _context3.sent;

          if (services) {
            services.forEach(function (service) {
              console.log("Service ID: ".concat(service.id, ", Name: ").concat(service.name));
            });
          } else {
            console.log('Master not found or no services available.');
          }

        case 17:
        case "end":
          return _context3.stop();
      }
    }
  });
})(); // // Обработка отправки формы
// const bookingForm = document.getElementById("bookingForm");
// if (bookingForm) {
//     bookingForm.addEventListener("submit", function (e) {
//         e.preventDefault();
//         const formData = new FormData(this);
//         fetch("/php/process_form.php", {
//             method: "POST",
//             body: formData,
//         })
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error(
//                         `Network response was not ok: ${response.status}`
//                     );
//                 }
//                 return response.json();
//             })
//             .then((data) => {
//                 const responseMessage =
//                     document.getElementById("responseMessage");
//                 if (responseMessage) {
//                     responseMessage.textContent = data.message;
//                 }
//             })
//             .catch((error) =>
//                 console.error("Ошибка при отправке формы:", error)
//             );
//     });
// }