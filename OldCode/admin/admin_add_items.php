<?php 
session_start(); 
 
// Check if user is logged in and is an admin 
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

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the submitted data and sanitize it
    $itemName = htmlspecialchars($_POST['new_item_name']);
    $itemPrice = htmlspecialchars($_POST['new_item_price']);

    // Validate that item price is not negative
    if ($itemPrice < 0) {
        $message = "Item price cannot be negative.";
    } else {
        // Insert the data into the SQL table
        $sql = "INSERT INTO items (item_name, item_price) VALUES (?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sd", $itemName, $itemPrice);

        if ($stmt->execute()) {
            $message = "Item added successfully!";
        } else {
            $message = "Error: " . $stmt->error;
        }

        $stmt->close();
    }
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
                            <a href="admin_add_employee.php" class="sidebar__link">
                                <i class="ri-add-large-fill"></i>
                                <span>Add Employee</span>
                            </a>

                            <a href="admin_modify_employee.php" class="sidebar__link">
                                <i class="ri-account-circle-fill"></i>
                                <span>Edit Employee</span>
                            </a>

                            <a href="admin_add_items.php" class="sidebar__link active-link">
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
                    <h1>Add Item</h1>
                </div>
                <form id="addNewItemForm" method="POST" action="">
                    <label for="new_item_name">Item Name</label>
                    <input type="text" name="new_item_name" id="new_item_name" placeholder="Item Name" required>

                    <label for="new_item_price">Item Price</label>
                    <input type="number" name="new_item_price" id="new_item_price" placeholder="Item Price" step="1" min="0" required>

                    <div class="center-container">
                        <button type="submit" id="submitButton">Submit</button>
                    </div>
                </form>

                <div class="center-container">
                    <div class="add-item-message">
                        <span id="itemnameFeedback"style="color: red;"></span>
                        
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
            document.getElementById('new_item_name').addEventListener('input', function () {
                let itemName = this.value;
                let feedback = document.getElementById('itemnameFeedback');

                // Check if itemName is not empty before sending AJAX request
                if (itemName.length > 0) {
                    // Create an AJAX request
                    let xhr = new XMLHttpRequest();
                    xhr.open('POST', 'admin_check_item.php', true);
                    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState == 4 && xhr.status == 200) {
                            // If item exists, show feedback and disable submit button
                            if (xhr.responseText === 'exists') {
                                feedback.textContent = "Item name already exists!";
                                document.getElementById('submitButton').disabled = true;
                            } else {
                                feedback.textContent = "";
                                document.getElementById('submitButton').disabled = false;
                            }
                        }
                    };

                    // Send the item name to the server
                    xhr.send('item_name=' + encodeURIComponent(itemName));
                } else {
                    feedback.textContent = "";  // Clear feedback if input is empty
                    document.getElementById('submitButton').disabled = false;
                }
            });
        </script>
    </body>
</html>