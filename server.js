const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Импортируем наш роутер
const apiRouter = require('./apiRouter');

// Указываем папку для статических файлов (CSS, JS, изображения и т.д.)
app.use(express.static(path.join(__dirname, 'public')));

// Подключаем body-parser для обработки данных из форм
app.use(bodyParser.urlencoded({ extended: true }));

// Подключаем роутер для API
app.use('/api', apiRouter);

// Маршрут для главной страницы
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});