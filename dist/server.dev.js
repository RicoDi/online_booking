"use strict";

var express = require("express");

var path = require("path");

var bodyParser = require("body-parser");

var app = express();
var PORT = process.env.PORT || 3000; // Импортируем наш роутер

var apiRouter = require("./apiRouter"); // Подключаем роутер для админки


var adminRouter = require("./routes/adminRouter");

app.use('/admin', adminRouter); // Указываем папку для статических файлов (CSS, JS, изображения и т.д.)

app.use(express["static"](path.join(__dirname, "public"))); // Подключаем body-parser для обработки данных из форм

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json()); // Подключаем роутер для API

app.use("/api", apiRouter); // Маршрут для главной страницы

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "html", "index.html"));
}); // Маршрут для админки

app.get("/admin/dashboard", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "admin", "dashboard.html"));
}); // Маршрут для страницы управления мастерами

app.get("/admin/masters", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "admin", "masters.html"));
}); // Запуск сервера

app.listen(PORT, function () {
  console.log("\u0421\u0435\u0440\u0432\u0435\u0440 \u0437\u0430\u043F\u0443\u0449\u0435\u043D \u043D\u0430 http://localhost:".concat(PORT));
});