<?php
// Set your database connection variables
$host = 'localhost';  // Database host (usually localhost)
$dbname = 'react';  // Replace with your database name
$username = 'root';  // Replace with your MySQL username
$password = '';  // Replace with your MySQL password

// Create the connection
$conn = new mysqli($host, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} else {
    echo "Database connected successfully!";
}

?>