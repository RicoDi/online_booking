-- Таблица для клиентов
CREATE TABLE User (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    surname VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20)
);

-- Таблица для мастеров
CREATE TABLE Masster (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    surname VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20),
    admin BOOLEAN DEFAULT FALSE,
    service_id INT,
    FOREIGN KEY (service_id) REFERENCES Services(id)
);

-- Таблица для услуг
CREATE TABLE Services (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    duration INT NOT NULL, -- Длительность услуги в минутах
    masster_id INT, -- Ссылка на мастера, который предоставляет услугу
    FOREIGN KEY (masster_id) REFERENCES Masster(id)
);

-- Таблица для бронирований
CREATE TABLE Booking (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL, -- Ссылка на клиента
    service_id INT NOT NULL, -- Ссылка на услугу
    booking_date DATE NOT NULL, -- Дата бронирования
    booking_time TIME NOT NULL, -- Время бронирования
    FOREIGN KEY (user_id) REFERENCES User(id),
    FOREIGN KEY (service_id) REFERENCES Services(id)
);