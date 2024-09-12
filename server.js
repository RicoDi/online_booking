const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;



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
