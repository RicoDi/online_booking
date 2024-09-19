const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;

// Импортируем наш роутер
const apiRouter = require("./routes/apiRouter");

// Подключаем роутер для админки
const adminRouter = require("./routes/adminRouter");
app.use('/admin', adminRouter);

// Указываем папку для статических файлов (CSS, JS, изображения и т.д.)
app.use(express.static(path.join(__dirname, "public")));

// Подключаем body-parser для обработки данных из форм
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Подключаем роутер для API
app.use("/api", apiRouter);

// Маршрут для главной страницы
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "html", "index.html"));
});


// Маршрут для админки
app.get("/admin/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "admin", "dashboard.html"));
});

// Маршрут для страницы управления мастерами
app.get("/admin/masters", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "admin", "masters.html"));
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
