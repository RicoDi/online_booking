const express = require('express');
const mysql = require('mysql2');
const app = express();

const port = 3000;

// Установите параметры подключения к базе данных
const dbConfig = {
    host: "185.252.24.105",
    user: "Rico", // Замените на ваше имя пользователя
    password: "me3Hh2FaBt", // Замените на ваш пароль
    database: "online_booking_db1" // Замените на ваше имя базы данных
};

// Создайте подключение к базе данных
const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
    if (err) {
        console.error('Connection failed: ' + err.stack);
        process.exit(1);
    }
    console.log('Connected to database.');
});

app.get('/', (req, res) => {
    const type = req.query.type || '';

    if (type === 'Masster') {
        connection.query("SELECT id, name FROM masters", (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Query failed: ' + error });
                return;
            }
            res.json({ masters: results });
        });

    } else if (type === 'Services') {
        const master_id = parseInt(req.query.master_id, 10) || 0;
        connection.query("SELECT id, name FROM services WHERE master_id = ?", [master_id], (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Query failed: ' + error });
                return;
            }
            res.json({ services: results });
        });

    } else {
        res.status(400).json({ error: 'Invalid type specified' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
