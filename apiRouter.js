const express = require('express');
const router = express.Router();
const mysql2 = require('mysql2');

// Создание пула соединений
const pool = mysql2.createPool({
    host: '185.252.24.105',
    user: 'rico',
    password: 'me3Hh2FaBt',
    database: 'online_booking_db'
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Ошибка соединения с базой данных:', err);
    } else {
        console.log('Соединение с базой данных успешно установлено');
        connection.release();
    }
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
router.get('/Masters', async (req, res) => {
    try {
        const masters = await query('SELECT * FROM Masters');
        console.log('Полученные мастера:', masters);
        res.json({ masters });
    } catch (error) {
        console.error('Ошибка при получении мастеров:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Эндпоинт для получения услуг
router.get('/services', async (req, res) => {
    try {
        const { master_id } = req.query;
        if (!master_id) {
            return res.status(400).json({ error: 'Отсутствует ID мастера' });
        }
        const services = await query(`
            SELECT s.id, s.name 
            FROM services s
            JOIN MasterServices ms ON s.id = ms.service_id
            WHERE ms.master_id = ?
        `, [master_id]);
        console.log('Полученные услуги:', services);
        res.json({ services });
    } catch (error) {
        console.error('Ошибка при получении услуг:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Эндпоинт для сохранения данных бронирования
router.post('/confirm', async (req, res) => {
    const { name, surname, phone, email, master, service, date } = req.body;

    if (!name || !surname || !phone || !email || !master || !service || !date) {
        return res.status(400).json({ error: 'Заполните все поля' });
    }

    try {
        const sql = `
            INSERT INTO bookings (name, surname, phone, email, master_id, service_id, date)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        await query(sql, [name, surname, phone, email, master, service, date]);
        res.json({ success: true, message: 'Данные успешно сохранены' });
    } catch (error) {
        console.error('Ошибка при сохранении данных:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

module.exports = router;