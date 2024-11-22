<?php
// login.php

// Enable error reporting for debugging
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Set headers for CORS and JSON response
header("Access-Control-Allow-Origin: *"); // Allows requests from any origin
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');

// Database connection settings
$servername = "localhost";
$username = "root"; // Update with your DB username
$password = ""; // Update with your DB password
$dbname = "react"; // Update with your DB name

// Create a connection to the database
$conn = new mysqli($servername, $username, $password, $dbname);

// Check if connection was successful
if ($conn->connect_error) {
    echo json_encode(["success" => false, "error" => "Database connection failed: " . $conn->connect_error]);
    exit(); // Stop execution if database connection fails
}

// Get the raw POST data (JSON)
$data = json_decode(file_get_contents("php://input"), true);

// Check if data is received in the correct format
if (!$data) {
    echo json_encode(["success" => false, "error" => "Invalid request format."]);
    exit(); // Exit if data is not in the correct format
}

// Extract email and password from the incoming data
$email = $data['email'] ?? ''; // Default to an empty string if not set
$password = $data['password'] ?? ''; // Default to an empty string if not set

// Check if email and password are provided
if (empty($email) || empty($password)) {
    echo json_encode(["success" => false, "error" => "Email and password are required."]);
    exit(); // Exit if any required field is missing
}

// Prepare the SQL query to check if the user exists
$sql = "SELECT * FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);

// Check if the query was prepared correctly
if (!$stmt) {
    echo json_encode(["success" => false, "error" => "Failed to prepare the SQL query."]);
    exit();
}

// Bind the email parameter to the query
$stmt->bind_param("s", $email);
$stmt->execute();

// Get the result of the query
$result = $stmt->get_result();

// Check if the user exists in the database
if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();

    // Verify the password
    if (password_verify($password, $user['password'])) {
        // If password is correct, login is successful
        echo json_encode([
            "success" => true,
            "message" => "Login successful!",
            "userId" => $user['id'] // Send user ID for further use
        ]);
    } else {
        // If password is incorrect
        echo json_encode(["success" => false, "error" => "Invalid email or password."]);
    }
} else {
    // If no user is found with the provided email
    echo json_encode(["success" => false, "error" => "No user found with this email."]);
}

// Close the statement and connection
$stmt->close();
$conn->close();
?>