<?php
header('Content-Type: application/json');

// Установите параметры подключения к базе данных
$servername = "localhost";
$username = "rico"; // Замените на ваше имя пользователя
$password = "me3Hh2FaBt"; // Замените на ваш пароль
$dbname = "online_booking.db"; // Замените на ваше имя базы данных

// Создайте подключение к базе данных
$conn = new mysqli($servername, $username, $password, $dbname);

// Проверьте соединение
if ($conn->connect_error) {
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Connection failed: ' . $conn->connect_error]);
    exit();
}

// Получение параметра запроса (master или service)
$type = isset($_GET['type']) ? $_GET['type'] : '';

// Выполнение запроса в зависимости от типа
if ($type === 'masters') {
    $result = $conn->query("SELECT id, name FROM masters");
    $data = [];

    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    header('Content-Type: application/json');
    echo json_encode(['masters' => $data]);

} elseif ($type === 'services') {
    $master_id = isset($_GET['master_id']) ? intval($_GET['master_id']) : 0;
    $result = $conn->query("SELECT id, name FROM services WHERE master_id = $master_id");
    $data = [];

    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    header('Content-Type: application/json');
    echo json_encode(['services' => $data]);

} else {
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Invalid type specified']);
}

$conn->close();
?>