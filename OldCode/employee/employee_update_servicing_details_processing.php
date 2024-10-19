<?php
session_start();

include '../includes/db.php';

// Check if user is logged in and is an employee 
if (!isset($_SESSION['loggedin']) || $_SESSION['role'] != 'employee') { 
    header('Location: ../login.php'); 
    exit(); 
}

// Check if form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get form data
    $job_number = $_POST['job_number'];
    $service_done = $_POST['serviceDone'];
    $service_type_done = $_POST['serviceTypeDone'];
    $job_status = $_POST['job_status'];  // New job status field
    $items_used = isset($_POST['item_name']) ? $_POST['item_name'] : [];

    // Join the items into a comma-separated string for storage in the `items_used` column
    $items_used_str = implode(',', $items_used);

    // Prepare an SQL UPDATE statement to update the specific row in the services table
    $sql = "UPDATE services 
            SET service_done = ?, service_type_done = ?, items_used = ?, job_status = ? 
            WHERE job_number = ?";

    // Use a prepared statement to avoid SQL injection
    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("sssss", $service_done, $service_type_done, $items_used_str, $job_status, $job_number);

        // Execute the statement
        if ($stmt->execute()) {
            // Redirect or notify user about success
            header("Location: employee_update_servicing_details_success.php");
        } else {
            // Error handling
            echo "Error updating record: " . $conn->error;
        }
        
        // Close the statement
        $stmt->close();
    } else {
        echo "Error preparing statement: " . $conn->error;
    }

    // Close the database connection
    $conn->close();
}
?>