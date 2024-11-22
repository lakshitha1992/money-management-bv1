<?php
// Enable error reporting for debugging during development
ini_set('display_errors', 1);
error_reporting(E_ALL);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Database connection
$conn = new mysqli('localhost', 'root', '', 'react');

// Check for database connection error
if ($conn->connect_error) {
    echo json_encode([
        'error' => 'Database connection failed',
        'details' => $conn->connect_error
    ]);
    exit;
}

// Query to get all payments ordered by date
$query = "SELECT payment_date AS date, description, amount FROM payments ORDER BY payment_date DESC";
$result = $conn->query($query);

// If the query fails, send a specific error response
if (!$result) {
    echo json_encode([
        'error' => 'Failed to retrieve payments',
        'details' => $conn->error
    ]);
    $conn->close(); // Close the connection before exiting
    exit;
}

// Process the result if the query is successful
$payments = [];
while ($row = $result->fetch_assoc()) {
    $payments[] = [
        'date' => $row['date'],
        'description' => $row['description'],
        'amount' => (float) $row['amount'], // Ensure amount is a float
    ];
}

// Return the payments data as a JSON response
echo json_encode($payments);

// Close the database connection
$conn->close();
?>