<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Database connection
$servername = "localhost";
$username = "root";  // Update this to your MySQL username
$password = "";      // Update this to your MySQL password
$dbname = "react";   // Update this to your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Connection failed: ' . $conn->connect_error
    ]);
    exit;
}

// Get JSON data from POST request
$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['income_date']) && isset($data['description']) && isset($data['amount'])) {
    $income_date = $data['income_date'];
    $description = $data['description'];
    $amount = $data['amount'];

    // Insert data into database
    $sql = "INSERT INTO incomes (income_date, description, amount) VALUES ('$income_date', '$description', '$amount')";

    if ($conn->query($sql) === TRUE) {
        // Return success message
        echo json_encode([
            'status' => 'success',
            'message' => 'Income saved successfully!'
        ]);
    } else {
        // Return error message
        echo json_encode([
            'status' => 'error',
            'message' => 'Error saving income: ' . $conn->error
        ]);
    }
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid input data.'
    ]);
}

$conn->close();
?>