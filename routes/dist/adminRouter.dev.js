"use strict";

var express = require('express');

var router = express.Router(); // const { query } = require('../db'); // Ваша функция для выполнения запросов к базе данных
// ========== Управление мастерами ==========
// GET /admin/masters: Получение списка мастеров

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
          res.json({
            masters: masters
          });
          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.error('Ошибка при получении мастеров:', _context.t0);
          res.status(500).json({
            error: 'Ошибка сервера'
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // POST /admin/masters: Добавление мастера

router.post('/masters', function _callee2(req, res) {
  var _req$body, name, surname, sql;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, surname = _req$body.surname;

          if (!(!name || !surname)) {
            _context2.next = 3;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            error: 'Необходимо указать имя и фамилию мастера'
          }));

        case 3:
          _context2.prev = 3;
          sql = 'INSERT INTO Masters (name, surname) VALUES (?, ?)';
          _context2.next = 7;
          return regeneratorRuntime.awrap(query(sql, [name, surname]));

        case 7:
          res.json({
            message: 'Мастер успешно добавлен'
          });
          _context2.next = 14;
          break;

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](3);
          console.error('Ошибка при добавлении мастера:', _context2.t0);
          res.status(500).json({
            error: 'Ошибка сервера'
          });

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[3, 10]]);
}); // PUT /admin/masters/:id: Редактирование мастера

router.put('/masters/:id', function _callee3(req, res) {
  var id, _req$body2, name, surname, sql;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.id;
          _req$body2 = req.body, name = _req$body2.name, surname = _req$body2.surname;

          if (!(!name || !surname)) {
            _context3.next = 4;
            break;
          }

          return _context3.abrupt("return", res.status(400).json({
            error: 'Необходимо указать имя и фамилию мастера'
          }));

        case 4:
          _context3.prev = 4;
          sql = 'UPDATE Masters SET name = ?, surname = ? WHERE id = ?';
          _context3.next = 8;
          return regeneratorRuntime.awrap(query(sql, [name, surname, id]));

        case 8:
          res.json({
            message: 'Данные мастера успешно обновлены'
          });
          _context3.next = 15;
          break;

        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](4);
          console.error('Ошибка при обновлении мастера:', _context3.t0);
          res.status(500).json({
            error: 'Ошибка сервера'
          });

        case 15:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[4, 11]]);
}); // DELETE /admin/masters/:id: Удаление мастера

router["delete"]('/masters/:id', function _callee4(req, res) {
  var id;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(query('DELETE FROM Masters WHERE id = ?', [id]));

        case 4:
          res.json({
            message: 'Мастер успешно удален'
          });
          _context4.next = 11;
          break;

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](1);
          console.error('Ошибка при удалении мастера:', _context4.t0);
          res.status(500).json({
            error: 'Ошибка сервера'
          });

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 7]]);
}); // ========== Управление услугами ==========
// GET /admin/services: Получение списка услуг

router.get('/services', function _callee5(req, res) {
  var services;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(query('SELECT * FROM Services'));

        case 3:
          services = _context5.sent;
          res.json({
            services: services
          });
          _context5.next = 11;
          break;

        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          console.error('Ошибка при получении услуг:', _context5.t0);
          res.status(500).json({
            error: 'Ошибка сервера'
          });

        case 11:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // POST /admin/services: Добавление услуги

router.post('/services', function _callee6(req, res) {
  var name, sql;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          name = req.body.name;

          if (name) {
            _context6.next = 3;
            break;
          }

          return _context6.abrupt("return", res.status(400).json({
            error: 'Необходимо указать название услуги'
          }));

        case 3:
          _context6.prev = 3;
          sql = 'INSERT INTO Services (name) VALUES (?)';
          _context6.next = 7;
          return regeneratorRuntime.awrap(query(sql, [name]));

        case 7:
          res.json({
            message: 'Услуга успешно добавлена'
          });
          _context6.next = 14;
          break;

        case 10:
          _context6.prev = 10;
          _context6.t0 = _context6["catch"](3);
          console.error('Ошибка при добавлении услуги:', _context6.t0);
          res.status(500).json({
            error: 'Ошибка сервера'
          });

        case 14:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[3, 10]]);
}); // PUT /admin/services/:id: Редактирование услуги

router.put('/services/:id', function _callee7(req, res) {
  var id, name, sql;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          id = req.params.id;
          name = req.body.name;

          if (name) {
            _context7.next = 4;
            break;
          }

          return _context7.abrupt("return", res.status(400).json({
            error: 'Необходимо указать название услуги'
          }));

        case 4:
          _context7.prev = 4;
          sql = 'UPDATE Services SET name = ? WHERE id = ?';
          _context7.next = 8;
          return regeneratorRuntime.awrap(query(sql, [name, id]));

        case 8:
          res.json({
            message: 'Услуга успешно обновлена'
          });
          _context7.next = 15;
          break;

        case 11:
          _context7.prev = 11;
          _context7.t0 = _context7["catch"](4);
          console.error('Ошибка при обновлении услуги:', _context7.t0);
          res.status(500).json({
            error: 'Ошибка сервера'
          });

        case 15:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[4, 11]]);
}); // DELETE /admin/services/:id: Удаление услуги

router["delete"]('/services/:id', function _callee8(req, res) {
  var id;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          id = req.params.id;
          _context8.prev = 1;
          _context8.next = 4;
          return regeneratorRuntime.awrap(query('DELETE FROM Services WHERE id = ?', [id]));

        case 4:
          res.json({
            message: 'Услуга успешно удалена'
          });
          _context8.next = 11;
          break;

        case 7:
          _context8.prev = 7;
          _context8.t0 = _context8["catch"](1);
          console.error('Ошибка при удалении услуги:', _context8.t0);
          res.status(500).json({
            error: 'Ошибка сервера'
          });

        case 11:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[1, 7]]);
}); // ========== Управление бронированиями ==========
// GET /admin/bookings: Получение списка бронирований

router.get('/bookings', function _callee9(req, res) {
  var bookings;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return regeneratorRuntime.awrap(query("\n            SELECT b.id, b.date, b.name, b.surname, b.phone, b.email, \n                   m.name as master_name, s.name as service_name\n            FROM bookings b\n            JOIN Masters m ON b.master_id = m.id\n            JOIN Services s ON b.service_id = s.id\n        "));

        case 3:
          bookings = _context9.sent;
          res.json({
            bookings: bookings
          });
          _context9.next = 11;
          break;

        case 7:
          _context9.prev = 7;
          _context9.t0 = _context9["catch"](0);
          console.error('Ошибка при получении бронирований:', _context9.t0);
          res.status(500).json({
            error: 'Ошибка сервера'
          });

        case 11:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // DELETE /admin/bookings/:id: Удаление бронирования

router["delete"]('/bookings/:id', function _callee10(req, res) {
  var id;
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          id = req.params.id;
          _context10.prev = 1;
          _context10.next = 4;
          return regeneratorRuntime.awrap(query('DELETE FROM bookings WHERE id = ?', [id]));

        case 4:
          res.json({
            message: 'Бронирование успешно удалено'
          });
          _context10.next = 11;
          break;

        case 7:
          _context10.prev = 7;
          _context10.t0 = _context10["catch"](1);
          console.error('Ошибка при удалении бронирования:', _context10.t0);
          res.status(500).json({
            error: 'Ошибка сервера'
          });

        case 11:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[1, 7]]);
});
module.exports = router;