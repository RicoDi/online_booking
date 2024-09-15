"use strict";

var express = require('express');

var router = express.Router();

var mysql = require('mysql'); // Создание пула соединений


var pool = mysql2.createPool({
  host: '185.252.24.105',
  user: 'Rico',
  password: 'me3Hh2FaBt',
  database: 'online_booking_db1'
});
pool.getConnection(function (err, connection) {
  if (err) {
    console.error('Ошибка соединения с базой данных:', err);
  } else {
    console.log('Соединение с базой данных успешно установлено');
    connection.release();
  }
}); // Функция для выполнения запросов

var query = function query(sql, params) {
  return new Promise(function (resolve, reject) {
    pool.query(sql, params, function (error, results) {
      if (error) return reject(error);
      resolve(results);
    });
  });
}; // Эндпоинт для получения мастеров


router.get('/Masters', function _callee(req, res) {
  var masters;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(query('SELECT * FROM Masters'));

        case 3:
          masters = _context.sent;
          console.log('Полученные мастера:', masters);
          res.json({
            masters: masters
          });
          _context.next = 12;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.error('Ошибка при получении мастеров:', _context.t0);
          res.status(500).json({
            error: 'Ошибка сервера'
          });

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
}); // Эндпоинт для получения услуг

router.get('/services', function _callee2(req, res) {
  var master_id, services;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          master_id = req.query.master_id;

          if (master_id) {
            _context2.next = 4;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            error: 'Отсутствует ID мастера'
          }));

        case 4:
          _context2.next = 6;
          return regeneratorRuntime.awrap(query("\n            SELECT s.id, s.name \n            FROM services s\n            JOIN MasterServices ms ON s.id = ms.service_id\n            WHERE ms.master_id = ?\n        ", [master_id]));

        case 6:
          services = _context2.sent;
          console.log('Полученные услуги:', services);
          res.json({
            services: services
          });
          _context2.next = 15;
          break;

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](0);
          console.error('Ошибка при получении услуг:', _context2.t0);
          res.status(500).json({
            error: 'Ошибка сервера'
          });

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 11]]);
}); // Эндпоинт для сохранения данных бронирования

router.post('/confirm', function _callee3(req, res) {
  var _req$body, name, surname, phone, email, master, service, date, sql;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, surname = _req$body.surname, phone = _req$body.phone, email = _req$body.email, master = _req$body.master, service = _req$body.service, date = _req$body.date;

          if (!(!name || !surname || !phone || !email || !master || !service || !date)) {
            _context3.next = 3;
            break;
          }

          return _context3.abrupt("return", res.status(400).json({
            error: 'Заполните все поля'
          }));

        case 3:
          _context3.prev = 3;
          sql = "\n            INSERT INTO bookings (name, surname, phone, email, master_id, service_id, date)\n            VALUES (?, ?, ?, ?, ?, ?, ?)\n        ";
          _context3.next = 7;
          return regeneratorRuntime.awrap(query(sql, [name, surname, phone, email, master, service, date]));

        case 7:
          res.json({
            success: true,
            message: 'Данные успешно сохранены'
          });
          _context3.next = 14;
          break;

        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](3);
          console.error('Ошибка при сохранении данных:', _context3.t0);
          res.status(500).json({
            error: 'Ошибка сервера'
          });

        case 14:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[3, 10]]);
});
module.exports = router;