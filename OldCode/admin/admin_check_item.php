<?php
include '../includes/db.php';

// Get the item name from the AJAX request
if (isset($_POST['item_name'])) {
    $itemName = strtolower($_POST['item_name']); // Convert input to lowercase

    // Prepare and execute the query to check if the item exists (case-insensitive)
    $sql = "SELECT item_name FROM items WHERE LOWER(item_name) = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $itemName);
    $stmt->execute();
    $stmt->store_result();

    // If the item exists, return a message
    if ($stmt->num_rows > 0) {
        echo "exists";
    } else {
        echo "available";
    }

    $stmt->close();
}
?>
