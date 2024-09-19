const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();


// Подключаем body-parser для обработки данных из форм
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Импортируем наш роутер
const apiRouter = require("./routes/apiRouter");

// Указываем папку для статических файлов (CSS, JS, изображения и т.д.)
app.use(express.static(path.join(__dirname, "public")));

// Маршрут для главной страницы
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "html", "index.html"));
});

// Подключаем роутер для API
app.use("/api", apiRouter);



// Подключаем роутер для админки
const adminRouter = require("./routes/adminRouter");
// Маршрут для админки
// Подключаем маршруты для админки
app.use('/admin', adminRouter);

app.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "admin", "adminIndex.html"));
});

// Маршрут для страницы управления мастерами
app.get("/masters", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "html", "masters.html"));
});




const PORT = process.env.PORT || 3000;
// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
