<?php
// includes/db.php
// Database configuration
$servername = "193.203.184.158"; // Usually 'localhost' on Hostinger
$username = "u151106218_admin"; // Replace with your database username
$password = "Database@1122"; // Replace with your database password
$dbname = "u151106218_manage"; // Replace with your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}