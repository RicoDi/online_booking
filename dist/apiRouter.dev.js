"use strict";

var express = require('express');

var router = express.Router();

var mysql2 = require('mysql2'); // Создание пула соединений


var pool = mysql2.createPool({
  host: '185.252.24.105',
  user: 'rico',
  password: 'me3Hh2FaBt',
  database: 'online_booking_db'
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


router.get('/masters', function _callee(req, res) {
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
  var _req$body, name, surname, phone, email, master, service, date, time, sql;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, surname = _req$body.surname, phone = _req$body.phone, email = _req$body.email, master = _req$body.master, service = _req$body.service, date = _req$body.date, time = _req$body.time;

          if (!(!name || !surname || !phone || !email || !master || !service || !date || !time)) {
            _context3.next = 3;
            break;
          }

          return _context3.abrupt("return", res.status(400).json({
            error: 'Заполните все поля'
          }));

        case 3:
          _context3.prev = 3;
          sql = "\n            INSERT INTO bookings (name, surname, phone, email, master_id, service_id, booking_date, booking_time)\n            VALUES (?, ?, ?, ?, ?, ?, ?, ?)\n        ";
          _context3.next = 7;
          return regeneratorRuntime.awrap(query(sql, [name, surname, phone, email, master, service, date, time]));

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
}); // Эндпоинт для получения бронирований. ADMIN

router.get('/bookings', function _callee4(req, res) {
  var bookings;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(query('SELECT * FROM bookings'));

        case 3:
          bookings = _context4.sent;
          res.json({
            bookings: bookings
          });
          _context4.next = 11;
          break;

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          console.error('Ошибка при получении бронирований:', _context4.t0);
          res.status(500).json({
            error: 'Ошибка сервера'
          });

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // Добавление мастера

router.post('/masters', function _callee5(req, res) {
  var _req$body2, name, surname;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _req$body2 = req.body, name = _req$body2.name, surname = _req$body2.surname;

          if (!(!name || !surname)) {
            _context5.next = 3;
            break;
          }

          return _context5.abrupt("return", res.status(400).json({
            error: 'Все поля обязательны для заполнения'
          }));

        case 3:
          _context5.prev = 3;
          _context5.next = 6;
          return regeneratorRuntime.awrap(query('INSERT INTO Masters (name, surname) VALUES (?, ?)', [name, surname]));

        case 6:
          res.status(201).json({
            message: 'Мастер добавлен'
          });
          _context5.next = 13;
          break;

        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5["catch"](3);
          console.error('Ошибка при добавлении мастера:', _context5.t0);
          res.status(500).json({
            error: 'Ошибка сервера'
          });

        case 13:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[3, 9]]);
}); // Получение мастера по ID

router.get('/masters/:id', function _callee6(req, res) {
  var id, master;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          id = req.params.id;
          _context6.prev = 1;
          _context6.next = 4;
          return regeneratorRuntime.awrap(query('SELECT * FROM Masters WHERE id = ?', [id]));

        case 4:
          master = _context6.sent;

          if (master.length) {
            _context6.next = 7;
            break;
          }

          return _context6.abrupt("return", res.status(404).json({
            error: 'Мастер не найден'
          }));

        case 7:
          res.json(master[0]);
          _context6.next = 14;
          break;

        case 10:
          _context6.prev = 10;
          _context6.t0 = _context6["catch"](1);
          console.error('Ошибка при получении мастера:', _context6.t0);
          res.status(500).json({
            error: 'Ошибка сервера'
          });

        case 14:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[1, 10]]);
}); // Обновление мастера

router.put('/masters/:id', function _callee7(req, res) {
  var id, _req$body3, name, surname;

  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          id = req.params.id;
          _req$body3 = req.body, name = _req$body3.name, surname = _req$body3.surname;

          if (!(!name || !surname)) {
            _context7.next = 4;
            break;
          }

          return _context7.abrupt("return", res.status(400).json({
            error: 'Все поля обязательны для заполнения'
          }));

        case 4:
          _context7.prev = 4;
          _context7.next = 7;
          return regeneratorRuntime.awrap(query('UPDATE Masters SET name = ?, surname = ? WHERE id = ?', [name, surname, id]));

        case 7:
          res.json({
            message: 'Мастер обновлен'
          });
          _context7.next = 14;
          break;

        case 10:
          _context7.prev = 10;
          _context7.t0 = _context7["catch"](4);
          console.error('Ошибка при обновлении мастера:', _context7.t0);
          res.status(500).json({
            error: 'Ошибка сервера'
          });

        case 14:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[4, 10]]);
}); // Удаление мастера

router["delete"]('/masters/:id', function _callee8(req, res) {
  var id;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          id = req.params.id;
          _context8.prev = 1;
          _context8.next = 4;
          return regeneratorRuntime.awrap(query('DELETE FROM Masters WHERE id = ?', [id]));

        case 4:
          res.json({
            message: 'Мастер удален'
          });
          _context8.next = 11;
          break;

        case 7:
          _context8.prev = 7;
          _context8.t0 = _context8["catch"](1);
          console.error('Ошибка при удалении мастера:', _context8.t0);
          res.status(500).json({
            error: 'Ошибка сервера'
          });

        case 11:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[1, 7]]);
}); // Добавление услуги

router.post('/services', function _callee9(req, res) {
  var _req$body4, name, master_id;

  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _req$body4 = req.body, name = _req$body4.name, master_id = _req$body4.master_id;

          if (!(!name || !master_id)) {
            _context9.next = 3;
            break;
          }

          return _context9.abrupt("return", res.status(400).json({
            error: 'Все поля обязательны для заполнения'
          }));

        case 3:
          _context9.prev = 3;
          _context9.next = 6;
          return regeneratorRuntime.awrap(query('INSERT INTO Services (name, master_id) VALUES (?, ?)', [name, master_id]));

        case 6:
          res.status(201).json({
            message: 'Услуга добавлена'
          });
          _context9.next = 13;
          break;

        case 9:
          _context9.prev = 9;
          _context9.t0 = _context9["catch"](3);
          console.error('Ошибка при добавлении услуги:', _context9.t0);
          res.status(500).json({
            error: 'Ошибка сервера'
          });

        case 13:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[3, 9]]);
}); // Получение услуги по ID

router.get('/services/:id', function _callee10(req, res) {
  var id, service;
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          id = req.params.id;
          _context10.prev = 1;
          _context10.next = 4;
          return regeneratorRuntime.awrap(query("\n            SELECT s.id, s.name, s.master_id \n            FROM Services s\n            WHERE s.id = ?\n        ", [id]));

        case 4:
          service = _context10.sent;

          if (service.length) {
            _context10.next = 7;
            break;
          }

          return _context10.abrupt("return", res.status(404).json({
            error: 'Услуга не найдена'
          }));

        case 7:
          res.json(service[0]);
          _context10.next = 14;
          break;

        case 10:
          _context10.prev = 10;
          _context10.t0 = _context10["catch"](1);
          console.error('Ошибка при получении услуги:', _context10.t0);
          res.status(500).json({
            error: 'Ошибка сервера'
          });

        case 14:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[1, 10]]);
}); // Обновление услуги

router.put('/services/:id', function _callee11(req, res) {
  var id, _req$body5, name, master_id;

  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          id = req.params.id;
          _req$body5 = req.body, name = _req$body5.name, master_id = _req$body5.master_id;

          if (!(!name || !master_id)) {
            _context11.next = 4;
            break;
          }

          return _context11.abrupt("return", res.status(400).json({
            error: 'Все поля обязательны для заполнения'
          }));

        case 4:
          _context11.prev = 4;
          _context11.next = 7;
          return regeneratorRuntime.awrap(query('UPDATE Services SET name = ?, master_id = ? WHERE id = ?', [name, master_id, id]));

        case 7:
          res.json({
            message: 'Услуга обновлена'
          });
          _context11.next = 14;
          break;

        case 10:
          _context11.prev = 10;
          _context11.t0 = _context11["catch"](4);
          console.error('Ошибка при обновлении услуги:', _context11.t0);
          res.status(500).json({
            error: 'Ошибка сервера'
          });

        case 14:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[4, 10]]);
}); // Удаление услуги

router["delete"]('/services/:id', function _callee12(req, res) {
  var id;
  return regeneratorRuntime.async(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          id = req.params.id;
          _context12.prev = 1;
          _context12.next = 4;
          return regeneratorRuntime.awrap(query('DELETE FROM Services WHERE id = ?', [id]));

        case 4:
          res.json({
            message: 'Услуга удалена'
          });
          _context12.next = 11;
          break;

        case 7:
          _context12.prev = 7;
          _context12.t0 = _context12["catch"](1);
          console.error('Ошибка при удалении услуги:', _context12.t0);
          res.status(500).json({
            error: 'Ошибка сервера'
          });

        case 11:
        case "end":
          return _context12.stop();
      }
    }
  }, null, null, [[1, 7]]);
}); // Эндпоинт для получения списка бронирований с фильтрацией

router.get('/bookings', function _callee13(req, res) {
  var _req$query, master_id, date, client, queryStr, queryParams, bookings;

  return regeneratorRuntime.async(function _callee13$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _req$query = req.query, master_id = _req$query.master_id, date = _req$query.date, client = _req$query.client;
          queryStr = "\n        SELECT b.id, b.date, b.name, b.surname, b.phone, b.email, \n               m.name as master_name, s.name as service_name\n        FROM bookings b\n        JOIN Masters m ON b.master_id = m.id\n        JOIN Services s ON b.service_id = s.id\n        WHERE 1=1\n    ";
          queryParams = []; // Фильтрация по мастеру

          if (master_id) {
            queryStr += ' AND b.master_id = ?';
            queryParams.push(master_id);
          } // Фильтрация по дате


          if (date) {
            queryStr += ' AND DATE(b.date) = ?';
            queryParams.push(date);
          } // Фильтрация по клиенту (имя, фамилия)


          if (client) {
            queryStr += ' AND (LOWER(b.name) LIKE ? OR LOWER(b.surname) LIKE ?)';
            queryParams.push("%".concat(client, "%"), "%".concat(client, "%"));
          }

          _context13.prev = 6;
          _context13.next = 9;
          return regeneratorRuntime.awrap(query(queryStr, queryParams));

        case 9:
          bookings = _context13.sent;
          res.json({
            bookings: bookings
          });
          _context13.next = 17;
          break;

        case 13:
          _context13.prev = 13;
          _context13.t0 = _context13["catch"](6);
          console.error('Ошибка при получении бронирований:', _context13.t0);
          res.status(500).json({
            error: 'Ошибка сервера'
          });

        case 17:
        case "end":
          return _context13.stop();
      }
    }
  }, null, null, [[6, 13]]);
}); // Эндпоинт для получения деталей бронирования

router.get('/bookings/:id', function _callee14(req, res) {
  var id, booking;
  return regeneratorRuntime.async(function _callee14$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          id = req.params.id;
          _context14.prev = 1;
          _context14.next = 4;
          return regeneratorRuntime.awrap(query("\n            SELECT b.id, b.date, b.name, b.surname, b.phone, b.email, \n                   m.name as master_name, s.name as service_name\n            FROM bookings b\n            JOIN Masters m ON b.master_id = m.id\n            JOIN Services s ON b.service_id = s.id\n            WHERE b.id = ?\n        ", [id]));

        case 4:
          booking = _context14.sent;

          if (booking.length) {
            _context14.next = 7;
            break;
          }

          return _context14.abrupt("return", res.status(404).json({
            error: 'Бронирование не найдено'
          }));

        case 7:
          res.json(booking[0]);
          _context14.next = 14;
          break;

        case 10:
          _context14.prev = 10;
          _context14.t0 = _context14["catch"](1);
          console.error('Ошибка при получении бронирования:', _context14.t0);
          res.status(500).json({
            error: 'Ошибка сервера'
          });

        case 14:
        case "end":
          return _context14.stop();
      }
    }
  }, null, null, [[1, 10]]);
}); // Эндпоинт для удаления бронирования

router["delete"]('/bookings/:id', function _callee15(req, res) {
  var id;
  return regeneratorRuntime.async(function _callee15$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          id = req.params.id;
          _context15.prev = 1;
          _context15.next = 4;
          return regeneratorRuntime.awrap(query('DELETE FROM bookings WHERE id = ?', [id]));

        case 4:
          res.json({
            message: 'Бронирование удалено'
          });
          _context15.next = 11;
          break;

        case 7:
          _context15.prev = 7;
          _context15.t0 = _context15["catch"](1);
          console.error('Ошибка при удалении бронирования:', _context15.t0);
          res.status(500).json({
            error: 'Ошибка сервера'
          });

        case 11:
        case "end":
          return _context15.stop();
      }
    }
  }, null, null, [[1, 7]]);
});
module.exports = router;