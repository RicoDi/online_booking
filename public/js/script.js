const cheerio = require('cheerio');
const fetch = require('node-fetch');

// Загрузка услуг на основе выбранного мастера
const masterSelect = $('#Master');
if (masterSelect.length) {
  masterSelect.on('change', function() {
      const masterId = $(this).val();
      if (masterId) {
          fetch(`/api/services?master_id=${masterId}`)
              .then(response => {
                  if (!response.ok) {
                      throw new Error(`Network response was not ok: ${response.status}`);
                  }
                  return response.json();
              })
              .then(data => {
                  const serviceSelect = $('#dropdown_service');
                  if (serviceSelect.length) {
                      serviceSelect.html('<option value="">Выберите услугу</option>');
                      if (!Array.isArray(data.services)) {
                          throw new Error('Некорректный формат данных: ожидается массив услуг');
                      }
                      data.services.forEach(service => {
                          if (!service.id || !service.name) {
                              throw new Error(`Некорректные данные услуги: ${JSON.stringify(service)}`);
                          }
                          const option = $('<option></option>').val(service.id).text(service.name);
                          serviceSelect.append(option);
                      });
                  }
              })
              .catch(error => console.error('Ошибка при загрузке услуг:', error));
      }
  });
}

// Обработка отправки формы
const bookingForm = $('#bookingForm');
if (bookingForm.length) {
  bookingForm.on('submit', function(e) {
      e.preventDefault();

      const formData = new FormData(this);
      fetch('/php/process_form.php', {
          method: 'POST',
          body: formData
      })
      .then(response => {
          if (!response.ok) {
              throw new Error(`Network response was not ok: ${response.status}`);
          }
          return response.json();
      })
      .then(data => {
          const responseMessage = $('#responseMessage');
          if (responseMessage.length) {
              responseMessage.text(data.message);
          }
      })
      .catch(error => console.error('Ошибка при отправке формы:', error));
  });
}