const express = require('express');
const path = require('./node_modules');
const app = express();
const PORT = process.env.PORT || 3000;


// Указываем, что статические файлы будут находиться в папке "public"
app.use(express.static(path.join(__dirname, 'public')));

// Маршрут для главной страницы
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});