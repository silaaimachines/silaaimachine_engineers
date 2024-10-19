<?php
session_start();
session_destroy();

// Redirect to login page
header('Location: login.php');
exit(); // Ensure no further code is executed
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Logout</title>
</head>
<body>
    <div class="logout-container">
        <h1>You have been logged out</h1>
        <p><a href="login.php">Click here</a> to log in again.</p>
    </div>
</body>
</html>