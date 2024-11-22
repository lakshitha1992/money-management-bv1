<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);


header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Database connection
$conn = new mysqli('localhost', 'root', '', 'react');

if ($conn->connect_error) {
    die(json_encode(['error' => 'Database connection failed', 'details' => $conn->connect_error]));
}

// Get the raw POST data
$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

// Check if data is valid
if (isset($data['date'], $data['description'], $data['amount']) && is_numeric($data['amount'])) {
    $date = $conn->real_escape_string($data['date']);
    $description = $conn->real_escape_string($data['description']);
    $amount = (float) $data['amount']; // Ensure amount is a float

    // Use prepared statements to prevent SQL injection
    $stmt = $conn->prepare("INSERT INTO payments (payment_date, description, amount) VALUES (?, ?, ?)");
    $stmt->bind_param('ssd', $date, $description, $amount); // 's' for string, 'd' for double (float)

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Payment added successfully']);
    } else {
        echo json_encode(['error' => 'Failed to save payment', 'details' => $stmt->error]);
    }

    // Close the statement
    $stmt->close();
} else {
    echo json_encode([
        'error' => 'Invalid data provided',
        'received' => $data,
    ]);
}

// Close the database connection
$conn->close();
?>