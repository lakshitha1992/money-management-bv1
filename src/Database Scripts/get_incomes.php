<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Database connection
$servername = "localhost";
$username = "root"; // Update this to your MySQL username
$password = "";     // Update this to your MySQL password
$dbname = "react";  // Update this to your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch incomes from the database
$sql = "SELECT * FROM incomes ORDER BY income_date DESC";
$result = $conn->query($sql);

// Check if query was successful
if (!$result) {
    die("Error in query: " . $conn->error);
}

// Prepare the result as an array
$incomes = array();
while ($row = $result->fetch_assoc()) {
    $incomes[] = $row;
}

// Return the incomes as JSON
echo json_encode($incomes);

$conn->close();
?>