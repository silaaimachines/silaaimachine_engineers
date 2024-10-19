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

// Handle Modify form submission
if (isset($_POST['modify'])) {
    $original_employee_name = $_POST['original_employee_name'];
    $new_employee_name = $_POST['employee_name'];
    $new_employee_username = $_POST['employee_username'];
    $new_employee_mail = $_POST['employee_mail'];
    $new_employee_password = $_POST['employee_password'];

    // Update query
    $update_sql = "UPDATE users SET name = '$new_employee_name', username = '$new_employee_username', email = '$new_employee_mail', password = '$new_employee_password' WHERE name = '$original_employee_name'";

    if ($conn->query($update_sql) === TRUE) {
        echo "<script>alert('Employee updated successfully');</script>";
    } else {
        echo "<script>alert('Error updating employee: " . $conn->error . "');</script>";
    }
}

// Handle Delete form submission
if (isset($_POST['delete'])) {
    $employee_name = $_POST['employee_name'];

    // Delete query
    $delete_sql = "DELETE FROM users WHERE name = '$employee_name'";

    if ( $conn->query($delete_sql) === TRUE) {
        echo " <script>alert('Employee deleted successfully');</script>";
    } else {
        echo " <script>alert('Error deleting employee: " . $conn->error . "');</script>";
    }
}

// Fetch all employees from the database (without pagination)
$sql = "SELECT * FROM users WHERE role = 'employee'";
$result = $conn->query($sql);

$employees = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $employees[] = $row;
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

                            <a href="admin_modify_employee.php" class="sidebar__link active-link">
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
                    <h1>Modify Employee</h1>
                </div>

                <!-- Modify Employee Form (Initially Hidden) -->
                <div id="modifyFormContainer" style="display:none;">
                    <div class="center-container">
                    </div>
                    <form method="post">
                        <input type="hidden" id="original_employee_name" name="original_employee_name">
                        <label for="employee_name">Employee Name:</label>
                        <input type="text" id="employee_name" name="employee_name" required>

                        <label for="employee_username">Employee Username:</label>
                        <input type="text" id="employee_username" name="employee_username" required>

                        <label for="employee_mail">Employee Email:</label>
                        <input type="email" id="employee_mail" name="employee_mail" required>

                        <label for="employee_password">Employee Password:</label>
                        <input type="password" id="employee_password" name="employee_password" required>

                        <div class="center-container">
                            <button type="submit" id="modifyButton" name="modify">Submit</button>
                            <button type="button" id="cancelButton" onclick="hideModifyForm()">Cancel</button>
                        </div>
                    </form>
                </div>

                <!-- Delete Confirmation Form (Initially Hidden) -->
                <div id="deleteFormContainer" style="display:none;">
                    <div class="center-container">
                        <h2>Delete Confirmation</h2>
                        <p>Are you sure you want to delete <span id="delete_employee_name"></span>?</p>
                        <form method="post" style="margin-top: 30px;">
                            <input type="hidden" id="delete_employee_name_hidden" name="employee_name">
                            <button type="submit" id="deleteButton" name="delete">Yes, Delete</button>
                            <button type="button" id="cancelButton" onclick="hideDeleteForm()">Cancel</button>
                        </form>
                    </div>
                </div>

                <!-- Search input field -->
                <input type="text" id="searchInput" onkeyup="searchTable()" placeholder="Search for employee name..">

                <!-- Table to display employees -->
                <table id="employeesTable">
                    <thead>
                        <tr>
                            <th>Employee Name</th>
                            <th>Employee Username</th>
                            <th>Employee Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Employees will be populated here dynamically via JS -->
                    </tbody>
                </table>

                <!-- Pagination Controls -->
                 <div class="pagination"></div>
            </div>              
        </main>
        
        <!--=============== MAIN JS ===============-->
        <script src="../assets/js/main.js"></script>

        <script>
            var employeesPerPage = 10; // Set the number of employees to display per page
            var currentPage = 1;
            var employees = [];

            // Load all employees into a JS array (from PHP)
            employees = <?php echo json_encode($employees); ?>;

            // Function to display employees on the current page
            function displayEmployees() {
                var tableBody = document.getElementById('employeesTable').getElementsByTagName('tbody')[0];
                tableBody.innerHTML = '';
                var start = (currentPage - 1) * employeesPerPage;
                var end = start + employeesPerPage;

                var filteredEmployees = employees.slice(start, end);
                filteredEmployees.forEach(function(employee) {
                    var row = `<tr>
                        <td>${employee.name}</td>
                        <td>${employee.username}</td>
                        <td>${employee.email}</td>
                        <td>
                            <button id="modifyButton" onclick="showModifyForm('${employee.name}', '${employee.username}', '${employee.email}')">Modify</button>
                            <button id="deleteButton" onclick="showDeleteForm('${employee.name}')">Delete</button>
                        </td>
                    </tr>`;
                    tableBody.innerHTML += row;
                });

                updatePagination();
            }

            // Function to update pagination controls
            function updatePagination() {
                var totalEmployees = employees.length;
                var totalPages = Math.ceil(totalEmployees / employeesPerPage);
                var paginationDiv = document.querySelector('.pagination');
                paginationDiv.innerHTML = '';

                if (currentPage > 1) {
                    paginationDiv.innerHTML += `<a href="#" onclick="goToPage(${currentPage - 1})">Previous</a>`;
                }

                for (var i = 1; i <= totalPages; i++) {
                    paginationDiv.innerHTML += `<a href="#" class="${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">${i}</a>`;
                }

                if (currentPage < totalPages) {
                    paginationDiv.innerHTML += `<a href="#" onclick="goToPage(${currentPage + 1})">Next</a>`;
                }
            }

            // Function to change pages
            function goToPage(page) {
                currentPage = page;
                displayEmployees();
            }

            function scrollToTop() {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }

            // Function to filter employees based on search input
            function searchTable() {
                var input = document.getElementById('searchInput').value.toUpperCase();
                employees = <?php echo json_encode($employees); ?>.filter(function(employee) {
                    return employee.name.toUpperCase().includes(input);
                });
                currentPage = 1; // Reset to first page after search
                displayEmployees();
            }

            // Show the modify form and fill with data
            function showModifyForm(employeeName, employeeUsername, employeeMail) {
                document.getElementById('original_employee_name').value = employeeName;
                document.getElementById('employee_name').value = employeeName;
                document.getElementById('employee_username').value = employeeUsername;
                document.getElementById('employee_mail').value = employeeMail;
                document.getElementById('modifyFormContainer').style.display = 'block';
                scrollToTop();
                hideDeleteForm();
            }

            // Hide the modify form
            function hideModifyForm() {
                document.getElementById('modifyFormContainer').style.display = 'none';
            }

            // Show the delete confirmation
            function showDeleteForm(employeeName) {
                document.getElementById('delete_employee_name').textContent = employeeName;
                document.getElementById('delete_employee_name_hidden').value = employeeName;
                document.getElementById('deleteFormContainer').style.display = 'block';
                scrollToTop();
                hideModifyForm();
            }

            // Hide the delete form
            function hideDeleteForm() {
                document.getElementById('deleteFormContainer').style.display = 'none';
            }

            // Load the initial employees when the page loads
            window.onload = function() {
                displayEmployees();
            }
        </script>
    </body>
</html>