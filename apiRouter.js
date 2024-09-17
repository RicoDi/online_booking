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
router.get('/masters', async (req, res) => {
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


// Эндпоинт для получения бронирований. ADMIN
router.get('/bookings', async (req, res) => {
    try {
        const bookings = await query('SELECT * FROM bookings');
        res.json({ bookings });
    } catch (error) {
        console.error('Ошибка при получении бронирований:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Добавление мастера
router.post('/masters', async (req, res) => {
    const { name, surname } = req.body;
    if (!name || !surname) {
        return res.status(400).json({ error: 'Все поля обязательны для заполнения' });
    }

    try {
        await query('INSERT INTO Masters (name, surname) VALUES (?, ?)', [name, surname]);
        res.status(201).json({ message: 'Мастер добавлен' });
    } catch (error) {
        console.error('Ошибка при добавлении мастера:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Получение мастера по ID
router.get('/masters/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const master = await query('SELECT * FROM Masters WHERE id = ?', [id]);
        if (!master.length) {
            return res.status(404).json({ error: 'Мастер не найден' });
        }
        res.json(master[0]);
    } catch (error) {
        console.error('Ошибка при получении мастера:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Обновление мастера
router.put('/masters/:id', async (req, res) => {
    const { id } = req.params;
    const { name, surname } = req.body;
    if (!name || !surname) {
        return res.status(400).json({ error: 'Все поля обязательны для заполнения' });
    }

    try {
        await query('UPDATE Masters SET name = ?, surname = ? WHERE id = ?', [name, surname, id]);
        res.json({ message: 'Мастер обновлен' });
    } catch (error) {
        console.error('Ошибка при обновлении мастера:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Удаление мастера
router.delete('/masters/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await query('DELETE FROM Masters WHERE id = ?', [id]);
        res.json({ message: 'Мастер удален' });
    } catch (error) {
        console.error('Ошибка при удалении мастера:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Добавление услуги
router.post('/services', async (req, res) => {
    const { name, master_id } = req.body;
    if (!name || !master_id) {
        return res.status(400).json({ error: 'Все поля обязательны для заполнения' });
    }

    try {
        await query('INSERT INTO Services (name, master_id) VALUES (?, ?)', [name, master_id]);
        res.status(201).json({ message: 'Услуга добавлена' });
    } catch (error) {
        console.error('Ошибка при добавлении услуги:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Получение услуги по ID
router.get('/services/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const service = await query(`
            SELECT s.id, s.name, s.master_id 
            FROM Services s
            WHERE s.id = ?
        `, [id]);
        if (!service.length) {
            return res.status(404).json({ error: 'Услуга не найдена' });
        }
        res.json(service[0]);
    } catch (error) {
        console.error('Ошибка при получении услуги:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Обновление услуги
router.put('/services/:id', async (req, res) => {
    const { id } = req.params;
    const { name, master_id } = req.body;
    if (!name || !master_id) {
        return res.status(400).json({ error: 'Все поля обязательны для заполнения' });
    }

    try {
        await query('UPDATE Services SET name = ?, master_id = ? WHERE id = ?', [name, master_id, id]);
        res.json({ message: 'Услуга обновлена' });
    } catch (error) {
        console.error('Ошибка при обновлении услуги:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Удаление услуги
router.delete('/services/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await query('DELETE FROM Services WHERE id = ?', [id]);
        res.json({ message: 'Услуга удалена' });
    } catch (error) {
        console.error('Ошибка при удалении услуги:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Эндпоинт для получения списка бронирований с фильтрацией
router.get('/bookings', async (req, res) => {
    const { master_id, date, client } = req.query;
    let queryStr = `
        SELECT b.id, b.date, b.name, b.surname, b.phone, b.email, 
               m.name as master_name, s.name as service_name
        FROM bookings b
        JOIN Masters m ON b.master_id = m.id
        JOIN Services s ON b.service_id = s.id
        WHERE 1=1
    `;
    const queryParams = [];

    // Фильтрация по мастеру
    if (master_id) {
        queryStr += ' AND b.master_id = ?';
        queryParams.push(master_id);
    }

    // Фильтрация по дате
    if (date) {
        queryStr += ' AND DATE(b.date) = ?';
        queryParams.push(date);
    }

    // Фильтрация по клиенту (имя, фамилия)
    if (client) {
        queryStr += ' AND (LOWER(b.name) LIKE ? OR LOWER(b.surname) LIKE ?)';
        queryParams.push(`%${client}%`, `%${client}%`);
    }

    try {
        const bookings = await query(queryStr, queryParams);
        res.json({ bookings });
    } catch (error) {
        console.error('Ошибка при получении бронирований:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Эндпоинт для получения деталей бронирования
router.get('/bookings/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const booking = await query(`
            SELECT b.id, b.date, b.name, b.surname, b.phone, b.email, 
                   m.name as master_name, s.name as service_name
            FROM bookings b
            JOIN Masters m ON b.master_id = m.id
            JOIN Services s ON b.service_id = s.id
            WHERE b.id = ?
        `, [id]);
        if (!booking.length) {
            return res.status(404).json({ error: 'Бронирование не найдено' });
        }
        res.json(booking[0]);
    } catch (error) {
        console.error('Ошибка при получении бронирования:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Эндпоинт для удаления бронирования
router.delete('/bookings/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await query('DELETE FROM bookings WHERE id = ?', [id]);
        res.json({ message: 'Бронирование удалено' });
    } catch (error) {
        console.error('Ошибка при удалении бронирования:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});


module.exports = router;