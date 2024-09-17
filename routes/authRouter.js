const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { query } = require('./db');  // функция для запросов к базе данных

const JWT_SECRET = 'your_secret_key';  // секретный ключ для токенов JWT

// Вход в систему (логин)
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Введите логин и пароль' });
    }

    try {
        // Проверяем, существует ли пользователь
        const result = await query('SELECT * FROM Users WHERE username = ?', [username]);
        if (result.length === 0) {
            return res.status(401).json({ error: 'Неправильный логин или пароль' });
        }

        const user = result[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Неправильный логин или пароль' });
        }

        // Генерация JWT токена
        const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, role: user.role });
    } catch (error) {
        console.error('Ошибка при логине:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Middleware для проверки токена
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.status(401).json({ error: 'Нет доступа' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Недействительный токен' });
        }
        req.user = user;
        next();
    });
}

// Маршрут для проверки роли (например, доступ к админке)
router.get('/admin', authenticateToken, (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Доступ запрещен' });
    }

    res.json({ message: 'Добро пожаловать, администратор!' });
});

module.exports = router;