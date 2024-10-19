<?php 
session_start(); 
 
// Check if user is logged in and is an employee 
if (!isset($_SESSION['loggedin']) || $_SESSION['role'] != 'admin') { 
    header('Location: ../login.php'); 
    exit(); 
}

$name = isset($_SESSION['name']) ? $_SESSION['name'] : 'Admin';
$role = isset($_SESSION['role']) ? $_SESSION['role'] : 'admin';

// Include the database connection file
include '../includes/db.php';

// Initialize a message variable
$message = "";
$employeeRole = "employee"; // ENUM value, treated as a string

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the submitted data and sanitize it
    $employeeName = htmlspecialchars($_POST['employee_name']);
    $employeeUsername = htmlspecialchars($_POST['employee_username']);
    $employeeMail = htmlspecialchars($_POST['employee_mail']);
    $employeePassword = htmlspecialchars($_POST['employee_password']);

    // Convert the username to lowercase
    $employeeUsername = strtolower($employeeUsername);

    // Hash the password using bcrypt
    $hashedPassword = password_hash($employeePassword, PASSWORD_BCRYPT);

    // Insert the data into the SQL table
    $sql = "INSERT INTO users (name, username, email, password, role) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssss", $employeeName, $employeeUsername, $employeeMail, $hashedPassword, $employeeRole);

    if ($stmt->execute()) {
        $message = "Employee added successfully!";
    } else {
        $message = "Error: " . $stmt->error;
    }

    $stmt->close();
}
?> 

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.2.0/remixicon.css">
        <link rel="stylesheet" href="../assets/css/styles.css">
    </head>
    <body>
        <!--=============== HEADER ===============-->
        <header class="header" id="header">
            <div class="header__container">
                <a href="../logout.php" class="header__logo">
                    <span>Logout</span>
                </a>
                
                <button class="header__toggle" id="header-toggle">
                    <i class="ri-menu-line"></i>
                </button>
            </div>
        </header>

        <!--=============== SIDEBAR ===============-->
        <nav class="sidebar" id="sidebar">
            <div class="sidebar__container">
                <div class="sidebar__user">
                    <div class="sidebar__info">
                        <h3><?php echo $name;?></h3>
                        <span><?php echo ucfirst($role); ?></span>
                    </div>
                </div>

                <div class="sidebar__content">
                    <!-- Dashboard Section -->
                    <div>
                        <h3 class="sidebar__title">DASHBOARD</h3>

                        <div class="sidebar__list">
                            <a href="admin_dashboard.php" class="sidebar__link">
                                <i class="ri-home-7-fill"></i>
                                <span>Home</span>
                            </a>
                        </div>
                    </div>

                    <!-- Manage Section -->
                    <div>
                        <h3 class="sidebar__title">MANAGE</h3>

                        <div class="sidebar__list">
                            <a href="admin_add_employee.php" class="sidebar__link active-link">
                                <i class="ri-add-large-fill"></i>
                                <span>Add Employee</span>
                            </a>

                            <a href="admin_modify_employee.php" class="sidebar__link">
                                <i class="ri-account-circle-fill"></i>
                                <span>Edit Employee</span>
                            </a>

                            <a href="admin_add_items.php" class="sidebar__link">
                                <i class="ri-file-list-fill"></i>
                                <span>Add Item</span>
                            </a>

                            <a href="admin_modify_items.php" class="sidebar__link">
                                <i class="ri-refresh-fill"></i>
                                <span>Edit Item</span>
                            </a>
                        </div>
                    </div>

                    <!-- Settings Section -->
                    <div>
                        <h3 class="sidebar__title">SETTINGS</h3>

                        <div class="sidebar__list">
                            <a href="#" class="sidebar__link">
                                <i class="ri-settings-3-fill"></i>
                                <span>Settings</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div class="sidebar__actions">
                    <button>
                        <i class="ri-moon-clear-fill sidebar__link sidebar__theme" id="theme-button">
                            <span>Dark Mode On/Off</span>
                        </i>
                    </button>
                </div>
            </div>
        </nav>

        <!--=============== MAIN ===============-->
        <main class="main container" id="main">
            <div class="container">
                <div class="center-container">
                    <h1>Add Employee</h1>
                </div>
                <form id="addEmployeeForm" method="POST" action="">
                    <label for="employee_name">Employee Name</label>
                    <input type="text" name="employee_name" placeholder="Employee Name" required>

                    <label for="employee_username">Employee Username</label>
                    <input type="text" name="employee_username" id="employee_username" placeholder="Employee Username" required>

                    <label for="employee_mail">Employee Email</label>
                    <input type="email" name="employee_mail" placeholder="Employee Email" required>

                    <label for="employee_password">Employee Password</label>
                    <input type="password" name="employee_password" placeholder="Employee Password" required>

                    <div class="center-container">
                        <button type="submit" id="submitButton">Add Employee</button>
                    </div>
                </form>

                <div class="center-container">
                    <div class="add-employee-message">
                        <span id="usernameFeedback" style="color: red;"></span>
                        
                        <?php
                        if (!empty($message)) {
                            echo $message;
                        }
                        ?>
                    </div>
                </div>
            </div>
        </main>
        
        <!--=============== MAIN JS ===============-->
        <script src="../assets/js/main.js"></script>

        <script>
            document.getElementById('addEmployeeForm').addEventListener('submit', function (event) {
                const username = document.getElementsByName('employee_username')[0].value;
                const email = document.getElementsByName('employee_mail')[0].value;
                const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

                // Check for spaces in username
                if (username.indexOf(' ') >= 0) {
                    alert('Username should not contain spaces.');
                    event.preventDefault(); // Prevent form submission
                    return false;
                }

                // Check for valid email format
                if (!emailPattern.test(email)) {
                    alert('Please enter a valid email address.');
                    event.preventDefault(); // Prevent form submission
                    return false;
                }
            });

            const usernameField = document.getElementById('employee_username');
            const usernameFeedback = document.getElementById('usernameFeedback');
            const submitButton = document.getElementById('submitButton');

            // Check username availability as the user types
            usernameField.addEventListener('input', function() {
                const username = usernameField.value.trim();

                // Ensure the username doesn't contain spaces
                if (username.indexOf(' ') >= 0) {
                    usernameFeedback.textContent = 'Username should not contain spaces.';
                    submitButton.disabled = true;
                    return;
                }

                if (username.length > 0) {
                    // Send AJAX request to check if username exists
                    const xhr = new XMLHttpRequest();
                    xhr.open('POST', 'admin_check_username.php', true);
                    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

                    xhr.onreadystatechange = function () {
                        if (xhr.readyState === 4 && xhr.status === 200) {
                            const response = xhr.responseText;
                            if (response === 'exists') {
                                usernameFeedback.textContent = 'Username already taken.';
                                submitButton.disabled = true; // Disable submit button if username exists
                            } else {
                                usernameFeedback.textContent = '';
                                submitButton.disabled = false; // Enable submit button if username is available
                            }
                        }
                    };

                    xhr.send('employee_username=' + encodeURIComponent(username));
                } else {
                    usernameFeedback.textContent = ''; // Clear feedback when no username is entered
                    submitButton.disabled = false; // Enable submit button if the input is cleared
                }
            });
        </script>
    </body>
</html>