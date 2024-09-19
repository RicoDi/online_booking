const express = require('express');
const router = express.Router();
// const { query } = require('../db'); // Ваша функция для выполнения запросов к базе данных

// Маршрут для панели управления (dashboard)
router.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/admin/adminIndex.html'));
});



// Маршрут для управления услугами
router.get('/services', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/admin/services.html'));
});

// Маршрут для управления бронированиями
router.get('/bookings', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/admin/bookings.html'));
});




// ========== Управление мастерами ==========

// Маршрут для управления мастерами
router.get('/masters', (req, res) => {
    res.sendFile(path.join(__dirname, './public/admin/masters'));
});

// GET /admin/masters: Получение списка мастеров
router.get('/masters', async (req, res) => {
    try {
        const masters = await query('SELECT * FROM Masters');
        res.json({ masters });
    } catch (error) {
        console.error('Ошибка при получении мастеров:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// POST /admin/masters: Добавление мастера
router.post('/masters', async (req, res) => {
    const { name, surname } = req.body;

    if (!name || !surname) {
        return res.status(400).json({ error: 'Необходимо указать имя и фамилию мастера' });
    }

    try {
        const sql = 'INSERT INTO Masters (name, surname) VALUES (?, ?)';
        await query(sql, [name, surname]);
        res.json({ message: 'Мастер успешно добавлен' });
    } catch (error) {
        console.error('Ошибка при добавлении мастера:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// PUT /admin/masters/:id: Редактирование мастера
router.put('/masters/:id', async (req, res) => {
    const { id } = req.params;
    const { name, surname } = req.body;

    if (!name || !surname) {
        return res.status(400).json({ error: 'Необходимо указать имя и фамилию мастера' });
    }

    try {
        const sql = 'UPDATE Masters SET name = ?, surname = ? WHERE id = ?';
        await query(sql, [name, surname, id]);
        res.json({ message: 'Данные мастера успешно обновлены' });
    } catch (error) {
        console.error('Ошибка при обновлении мастера:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// DELETE /admin/masters/:id: Удаление мастера
router.delete('/masters/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await query('DELETE FROM Masters WHERE id = ?', [id]);
        res.json({ message: 'Мастер успешно удален' });
    } catch (error) {
        console.error('Ошибка при удалении мастера:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// ========== Управление услугами ==========

// GET /admin/services: Получение списка услуг
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

// ========== Управление бронированиями ==========

// GET /admin/bookings: Получение списка бронирований
router.get('/bookings', async (req, res) => {
    try {
        const bookings = await query(`
            SELECT b.id, b.date, b.name, b.surname, b.phone, b.email, 
                   m.name as master_name, s.name as service_name
            FROM bookings b
            JOIN Masters m ON b.master_id = m.id
            JOIN Services s ON b.service_id = s.id
        `);
        res.json({ bookings });
    } catch (error) {
        console.error('Ошибка при получении бронирований:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// DELETE /admin/bookings/:id: Удаление бронирования
router.delete('/bookings/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await query('DELETE FROM bookings WHERE id = ?', [id]);
        res.json({ message: 'Бронирование успешно удалено' });
    } catch (error) {
        console.error('Ошибка при удалении бронирования:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

module.exports = router;
