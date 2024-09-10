<?php
$master_id = $_POST['dropdown_master'];
$service_id = $_POST['dropdown_service'];
$date = $_POST['date-picker'];

$conn = new mysqli('localhost', 'username', 'password', 'database');

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$stmt = $conn->prepare("INSERT INTO bookings (master_id, service_id, date) VALUES (?, ?, ?)");
$stmt->bind_param("iis", $master_id, $service_id, $date);
$stmt->execute();

echo json_encode(['message' => 'Запись успешно создана']);

$stmt->close();
$conn->close();
?>
