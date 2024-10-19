<?php
// Include database connection file
require_once '../includes/db.php';

if (isset($_POST['employee_username'])) {
    $employeeUsername = htmlspecialchars($_POST['employee_username']);

    // Convert the username to lowercase for consistency
    $employeeUsername = strtolower($employeeUsername);

    // Prepare and execute the query
    $sql = "SELECT id FROM users WHERE username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $employeeUsername);
    $stmt->execute();
    $stmt->store_result();

    // Check if the username exists
    if ($stmt->num_rows > 0) {
        echo "exists";
    } else {
        echo "available";
    }

    $stmt->close();
    $conn->close();
}