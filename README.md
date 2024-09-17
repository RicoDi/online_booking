# online_booking
Структура файлов admin panel:
Frontend (public/admin/):

admin.html: Главный файл панели администратора.
admin.css: Стили для админки.
admin.js: Логика для взаимодействия с сервером (fetch-запросы для получения и редактирования данных).
Backend (routes/adminRouter.js):

GET /admin/masters: Получение списка мастеров.
POST /admin/masters: Добавление мастера.
PUT /admin/masters/:id: Редактирование мастера.
DELETE /admin/masters/:id: Удаление мастера.
GET /admin/services: Получение списка услуг.
POST /admin/services: Добавление услуги.
PUT /admin/services/:id: Редактирование услуги.
DELETE /admin/services/:id: Удаление услуги.
GET /admin/bookings: Получение списка бронирований.
DELETE /admin/bookings/:id: Удаление бронирования.
Пример структуры URL:
/admin: Главная страница панели.
/admin/masters: Управление мастерами.
/admin/services: Управление услугами.
/admin/bookings: Управление бронированиями.



Объяснение маршрутов:
Мастера:

GET /admin/masters: Возвращает список всех мастеров.
POST /admin/masters: Добавляет нового мастера.
PUT /admin/masters/:id: Обновляет данные мастера по его ID.
DELETE /admin/masters/:id: Удаляет мастера по его ID.
Услуги:

GET /admin/services: Возвращает список всех услуг.
POST /admin/services: Добавляет новую услугу.
PUT /admin/services/:id: Обновляет данные услуги по её ID.
DELETE /admin/services/:id: Удаляет услугу по её ID.
Бронирования:

GET /admin/bookings: Возвращает список всех бронирований с привязкой к мастерам и услугам.
DELETE /admin/bookings/:id: Удаляет бронирование по его ID.