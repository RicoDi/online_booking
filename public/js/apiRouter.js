const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// Создание пула соединений
const pool = mysql.createPool({
    host: '185.252.24.105',
    user: 'Rico',
    password:'me3Hh2FaBt',
    database:'online_booking_db1'
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
      const masters = await query('SELECT * FROM masters');
      res.json({ masters });
    } catch (error) {
      res.status(500).json({ error: 'Ошибка сервера' });
    }
  });
  
  // Эндпоинт для получения услуг по ID мастера
  router.get('/services', async (req, res) => {
    try {
      const { master_id } = req.query;
      if (!master_id) {
        return res.status(400).json({ error: 'Отсутствует ID мастера' });
      }
  
      const services = await query('SELECT * FROM services WHERE master_id = ?', [master_id]);
      res.json({ services });
    } catch (error) {
      res.status(500).json({ error: 'Ошибка сервера' });
    }
  });
  
  module.exports = router;