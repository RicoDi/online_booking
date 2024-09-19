const express = require('express');
const router = express.Router();
// const { query } = require('../db'); // Ваша функция для выполнения запросов к базе данных

// ========== Управление мастерами ==========

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
router.get('/services', async (req, res) => {
    try {
        const services = await query('SELECT * FROM Services');
        res.json({ services });
    } catch (error) {
        console.error('Ошибка при получении услуг:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// POST /admin/services: Добавление услуги
router.post('/services', async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'Необходимо указать название услуги' });
    }

    try {
        const sql = 'INSERT INTO Services (name) VALUES (?)';
        await query(sql, [name]);
        res.json({ message: 'Услуга успешно добавлена' });
    } catch (error) {
        console.error('Ошибка при добавлении услуги:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// PUT /admin/services/:id: Редактирование услуги
router.put('/services/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'Необходимо указать название услуги' });
    }

    try {
        const sql = 'UPDATE Services SET name = ? WHERE id = ?';
        await query(sql, [name, id]);
        res.json({ message: 'Услуга успешно обновлена' });
    } catch (error) {
        console.error('Ошибка при обновлении услуги:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// DELETE /admin/services/:id: Удаление услуги
router.delete('/services/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await query('DELETE FROM Services WHERE id = ?', [id]);
        res.json({ message: 'Услуга успешно удалена' });
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
