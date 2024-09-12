const mysql = require('mysql');


const pool = mysql.createPool({
    connectionLimit:1,
    host: '185.252.24.105',
    user: 'Rico',
    password: 'me3Hh2FaBt', // Замените на ваш пароль
    database: 'online_booking_db1'
  });
  
  pool.getConnection((err, connection) => {
    if (err) {
        console.error('Ошибка подключения к базе данных:', err);
        return;
    }

    console.log('Успешное подключение к базе данных');

    // Используйте соединение для выполнения запросов
    connection.query('SELECT * FROM my_table', (error, results, fields) => {
        connection.release(); // Освобождаем соединение обратно в пул

        if (error) {
            console.error('Ошибка выполнения запроса:', error);
            return;
        }

        console.log('Результаты запроса:', results);
    });
});
  
  // Функция для выполнения запросов
  const query = (sql, params) => {
    return new Promise((resolve, reject) => {
      pool.query(sql, params, (error, results) => {
        if (error) return reject(error);
        resolve(results);
      });
    });
  };
  
  // Эндпоинт для получения мастеров
  app.get('/api', async (req, res) => {
    try {
      const { type } = req.query;
      if (type === 'Masster') {
        const masters = await query('SELECT * FROM masters');
        res.json({ masters });
      } else {
        res.status(400).json({ error: 'Некорректный тип запроса' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Ошибка сервера' });
    }
  });
  
  // Эндпоинт для получения услуг по ID мастера
  app.get('/api/services', async (req, res) => {
    try {
      const { master_id } = req.query;
      if (master_id) {
        const services = await query('SELECT * FROM services WHERE master_id = ?', [master_id]);
        res.json({ services });
      } else {
        res.status(400).json({ error: 'Отсутствует ID мастера' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Ошибка сервера' });
    }
  });
  // Загрузка мастеров
document.addEventListener('DOMContentLoaded', () => {
  // Выполняем запрос на получение мастеров через ваш Node.js API
  fetch('/api?type=Master')
      .then(response => {
          if (!response.ok) {
              throw new Error('Ошибка запроса: ' + response.status);
          }
          return response.json();
      })
      .then(data => {
          const selectElement = document.getElementById('mastersSelect'); // Предполагается, что у вас есть select для мастеров
          data.masters.forEach(master => {
              const option = document.createElement('option');
              option.value = master.id;
              option.textContent = master.name;
              selectElement.appendChild(option);
          });
      })
      .catch(error => {
          console.error('Ошибка при получении данных: ', error);
      });
});

// Загрузка услуг на основе выбранного мастера
const masterSelect = document.getElementById('dropdown_master');
if (masterSelect) {
  masterSelect.addEventListener('change', function() {
      const masterId = this.value;
      if (masterId) {
          fetch(`/php/get_options.php?type=services&master_id=${masterId}`)
              .then(response => {
                  if (!response.ok) {
                      throw new Error(`Network response was not ok: ${response.status}`);
                  }
                  return response.json();
              })
              .then(data => {
                  const serviceSelect = document.getElementById('dropdown_service');
                  if (serviceSelect) {
                      serviceSelect.innerHTML = '<option value="">Выберите услугу</option>';
                      if (!Array.isArray(data.services)) {
                          throw new Error('Некорректный формат данных: ожидается массив услуг');
                      }
                      data.services.forEach(service => {
                          if (!service.id || !service.name) {
                              throw new Error(`Некорректные данные услуги: ${JSON.stringify(service)}`);
                          }
                          const option = document.createElement('option');
                          option.value = service.id;
                          option.textContent = service.name;
                          serviceSelect.appendChild(option);
                      });
                  }
              })
              .catch(error => console.error('Ошибка при загрузке услуг:', error));
      }
  });
}



// Обработка отправки формы
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
  bookingForm.addEventListener('submit', function(e) {
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
          const responseMessage = document.getElementById('responseMessage');
          if (responseMessage) {
              responseMessage.textContent = data.message;
          }
      })
      .catch(error => console.error('Ошибка при отправке формы:', error));
  });
}


