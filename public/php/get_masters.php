<?php
// Параметры доступа к базе данных
$servername = "localhost";
$username = "rico";
$password = "me3Hh2FaBt";
$dbname = "online_booking_db";

// Создание соединения
$conn = new mysqli($servername, $username, $password, $dbname);

// Проверка соединения
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Запрос для получения мастеров
$sql = "SELECT id, name FROM masters";
$result = $conn->query($sql);

// Проверка и вывод данных
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo '<option value="' . $row["id"] . '">' . $row["name"] . '</option>';
    }
} else {
    echo '<option value="">No masters available</option>';
}

// Закрытие соединения
$conn->close();
?>
