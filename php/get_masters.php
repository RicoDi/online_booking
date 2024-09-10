<?php
// Подключение к базе данных
$conn = new mysqli('localhost', 'username', 'password', 'database');

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$result = $conn->query("SELECT id, name FROM masters");
$masters = [];

while ($row = $result->fetch_assoc()) {
    $masters[] = $row;
}

echo json_encode(['masters' => $masters]);

$conn->close();
?>