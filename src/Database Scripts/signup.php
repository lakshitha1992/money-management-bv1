<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

header('Content-Type: application/json');

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);

// Validate data
if (!isset($data['firstName'], $data['lastName'], $data['email'], $data['password'], $data['confirmPassword'])) {
    echo json_encode(['error' => 'All fields are required.']);
    exit;
}

if ($data['password'] !== $data['confirmPassword']) {
    echo json_encode(['error' => 'Passwords do not match.']);
    exit;
}

// Hash password before saving
$passwordHash = password_hash($data['password'], PASSWORD_BCRYPT);

// Database connection (replace with your own)
$mysqli = new mysqli('localhost', 'root', '', 'react');

// Check for connection error
if ($mysqli->connect_error) {
    die(json_encode(['error' => 'Failed to connect to the database.']));
}

// Prepare and execute the query to insert the user
$stmt = $mysqli->prepare("INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $data['firstName'], $data['lastName'], $data['email'], $passwordHash);

if ($stmt->execute()) {
    echo json_encode(['message' => 'User registered successfully.']);
} else {
    echo json_encode(['error' => 'Error registering the user.']);
}

$stmt->close();
$mysqli->close();
?>