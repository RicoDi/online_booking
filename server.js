const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Устанавливаем параметры подключения к базе данных
const dbConfig = {
    host: "185.252.24.105",
    user: "Rico", // Замените на ваше имя пользователя
    password: "me3Hh2FaBt", // Замените на ваш пароль
    database: "online_booking_db1" // Замените на ваше имя базы данных
};

// Создаём подключение к базе данных
const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
    if (err) {
        console.error('Ошибка подключения к базе данных: ' + err.stack);
        process.exit(1);
    }
    console.log('Подключено к базе данных.');
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
