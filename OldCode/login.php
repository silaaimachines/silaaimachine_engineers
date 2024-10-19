<?php
session_start();
require 'includes/db.php'; // Database connection

// Redirect logged-in users to their respective dashboards
if (isset($_SESSION['loggedin'])) {
    header('Location: employee/employee_dashboard.php');
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Check if username or email is provided
    $stmt = $conn->prepare("SELECT id, firstname, password FROM admin_users WHERE username = ? OR email = ?");
    $stmt->bind_param("ss", $username, $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows == 1) {
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['password'])) {
            // Set session variables
            $_SESSION['loggedin'] = true;
            $_SESSION['id'] = $user['id'];
            $_SESSION['name'] = $user['firstname'];
            
            // Redirect to specific dashboard based on role
            header('Location: employee/employee_dashboard.php');
            exit();
        } else {
            $error = "Incorrect password.";
        }
    } else {
        $error = "User not found.";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <style>
        html,body {
            height: 100%;
            margin: 0;
        }

        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .login-container {
            background-color: white;
            padding: 40px;
            border-radius: 5px;
            box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
            max-width: 300px;
            box-sizing: border-box;
        }

        .center-container {
            text-align: center;
        }

        h1 {
            margin-bottom: 20px;
            text-align: center;
        }

        h2 {
            text-align: center;
        }

        label {
            display: block;
            margin-bottom: 5px;
        }
        input {
            width: 100%;
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box; /* Ensures padding is included in width */
        }        
        .logo {
            width: 100%;
            height: auto;
        }

        button {
            width: 100%;
            padding: 10px;
            background-color: #e42584; /* Updated button color */
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        button:hover {
            background-color: #c41f74; /* Slightly darker shade for hover effect */
        }
        p {
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="login-container">
    <img src="https://silaaimachines.com/wp-content/uploads/2024/09/Silaamachine-Logo-Pink-Long-Text.png" alt="Silaaimachines Logo" class="logo">
        <div class="center-container">
            <h1>Login</h1>
        </div>
        <?php if (isset($error)) { echo "<p style='color:red;'>$error</p>"; } ?>
        <form action="" method="post">
            <label for="username">Username or Email</label>
            <input type="text" id="username" name="username" placeholder="Username or Email" required>
            <label for="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Password" required>
            <div class="center-container">
                <button type="submit" id="submitButton">Login</button>
            </div>
        </form>
    </div>
</body>
</html>