<?php
$master_id = $_GET['master_id'];

$conn = new mysqli('localhost', 'username', 'password', 'database');

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$result = $conn->query("SELECT id, name FROM services WHERE master_id = $master_id");
$services = [];

while ($row = $result->fetch_assoc()) {
    $services[] = $row;
}

echo json_encode(['services' => $services]);

$conn->close();
?>