const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

const pool = mysql.createPool({
    host: '185.252.24.105',
    user: 'Rico',
    password: 'me3Hh2FaBt', // Замените на ваш пароль
    database: 'online_booking_db1'
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

// Указываем папку для статических файлов (CSS, JS, изображения и т.д.)
app.use(express.static(path.join(__dirname, 'public')));

// Подключаем body-parser для обработки данных из форм
app.use(bodyParser.urlencoded({ extended: true }));

// Маршрут для главной страницы
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
});

// Маршрут для получения данных от базы данных в зависимости от типа запроса
app.get('/api', (req, res) => {
    const type = req.query.type || '';

    if (type === 'Masster') {
        connection.query("SELECT id, name FROM masters", (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Ошибка запроса: ' + error });
                return;
            }
            res.json({ masters: results });
        });

    } else if (type === 'Services') {
        const master_id = parseInt(req.query.master_id, 10) || 0;
        connection.query("SELECT id, name FROM services WHERE master_id = ?", [master_id], (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Ошибка запроса: ' + error });
                return;
            }
            res.json({ services: results });
        });

    } else {
        res.status(400).json({ error: 'Неверный тип запроса' });
    }
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
