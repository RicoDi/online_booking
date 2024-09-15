"use strict";

// function submiteForm() {
//     let name = document.getElementById('name').value;
//     let surname = document.getElementById('surname').value;
//     let phone = document.getElementById('phone').value;
//     let email = document.getElementById('email').value;
//     let date = document.getElementById('selectedDate').value;
//     let time = document.getElementById('selectedTime').value;
// }
// let user = {
//     name: name,
//     surname: surname,
//     phone: phone,
//     email: email
// };
// let booking = { 
//     date:selectedDate,
//     time:selectedTime,
//     };
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