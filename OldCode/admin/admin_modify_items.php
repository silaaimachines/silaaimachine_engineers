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

// Handle Modify form submission
if (isset($_POST['modify'])) {
    $original_item_name = $_POST['original_item_name'];
    $new_item_name = $_POST['item_name'];
    $new_item_price = $_POST['item_price'];

    // Update query
    $update_sql = "UPDATE items SET item_name = '$new_item_name', item_price = '$new_item_price' WHERE item_name = '$original_item_name'";
    
    if ($conn->query($update_sql) === TRUE) {
        echo "<script>alert('Item updated successfully');</script>";
    } else {
        echo "<script>alert('Error updating item: " . $conn->error . "');</script>";
    }
}

// Handle Delete form submission
if (isset($_POST['delete'])) {
    $item_name = $_POST['item_name'];

    // Delete query
    $delete_sql = "DELETE FROM items WHERE item_name = '$item_name'";
    
    if ($conn->query($delete_sql) === TRUE) {
        echo "<script>alert('Item deleted successfully');</script>";
    } else {
        echo "<script>alert('Error deleting item: " . $conn->error . "');</script>";
    }
}

// Fetch all items from the database (without pagination)
$sql = "SELECT * FROM items";
$result = $conn->query($sql);

$items = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $items[] = $row;
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

                            <a href="admin_add_items.php" class="sidebar__link">
                                <i class="ri-file-list-fill"></i>
                                <span>Add Item</span>
                            </a>

                            <a href="admin_modify_items.php" class="sidebar__link active-link">
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
                    <h1>Edit Item</h1>
                </div>

                <!-- Modify Item Form (Initially Hidden) -->
                <div id="modifyFormContainer" style="display:none;">
                    <div class="center-container">
                        <h2>Modify Item</h2>
                    </div>
                    <form method="post">
                        <input type="hidden" id="original_item_name" name="original_item_name">
                        <label for="item_name">Item Name:</label>
                        <input type="text" id="item_name" name="item_name" required>

                        <label for="item_price">Item Price:</label>
                        <input type="text" id="item_price" name="item_price" required>

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
                        <p>Are you sure you want to delete <span id="delete_item_name"></span>?</p>
                        <form method="post" style="margin-top: 30px;">
                            <input type="hidden" id="delete_item_name_hidden" name="item_name">
                            <button type="submit" id="deleteButton" name="delete">Yes, Delete</button>
                            <button type="button" id="cancelButton" onclick="hideDeleteForm()">Cancel</button>
                        </form>
                    </div>
                </div>

                <!-- Search input field -->
                <input type="text" id="searchInput" onkeyup="searchTable()" placeholder="Search for item name..">

                <!-- Table to display items -->
                <table id="itemsTable">
                    <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Item Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Items will be populated here dynamically via JS -->
                    </tbody>
                </table>

                <!-- Pagination Controls -->
                <div class="pagination"></div>
            </div>
        </main>
        
        <!--=============== MAIN JS ===============-->
        <script src="../assets/js/main.js"></script>

        <script>
            var itemsPerPage = 10; // Set the number of items to display per page
            var currentPage = 1;
            var items = [];

            // Load all items into a JS array (from PHP)
            items = <?php echo json_encode($items); ?>;

            // Function to display items on the current page
            function displayItems() {
                var tableBody = document.getElementById('itemsTable').getElementsByTagName('tbody')[0];
                tableBody.innerHTML = '';
                var start = (currentPage - 1) * itemsPerPage;
                var end = start + itemsPerPage;

                var filteredItems = items.slice(start, end);
                filteredItems.forEach(function(item) {
                    var row = `<tr>
                        <td>${item.item_name}</td>
                        <td>${item.item_price}</td>
                        <td>
                            <button id="modifyButton" onclick="showModifyForm('${item.item_name}', '${item.item_price}')">Modify</button>
                            <button id="deleteButton" onclick="showDeleteForm('${item.item_name}')">Delete</button>
                        </td>
                    </tr>`;
                    tableBody.innerHTML += row;
                });

                updatePagination();
            }

            // Function to update pagination controls
            function updatePagination() {
                var totalItems = items.length;
                var totalPages = Math.ceil(totalItems / itemsPerPage);
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
                displayItems();
            }

            function scrollToTop() {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }

            // Function to filter items based on search input
            function searchTable() {
                var input = document.getElementById('searchInput').value.toUpperCase();
                items = <?php echo json_encode($items); ?>.filter(function(item) {
                    return item.item_name.toUpperCase().includes(input);
                });
                currentPage = 1; // Reset to first page after search
                displayItems();
            }

            // Show the modify form and fill with data
            function showModifyForm(itemName, itemPrice) {
                document.getElementById('original_item_name').value = itemName;
                document.getElementById('item_name').value = itemName;
                document.getElementById('item_price').value = itemPrice;
                document.getElementById('modifyFormContainer').style.display = 'block';
                scrollToTop();
                hideDeleteForm();
            }

            // Hide the modify form
            function hideModifyForm() {
                document.getElementById('modifyFormContainer').style.display = 'none';
            }

            // Show the delete confirmation form
            function showDeleteForm(itemName) {
                document.getElementById('delete_item_name').textContent = itemName;
                document.getElementById('delete_item_name_hidden').value = itemName;
                document.getElementById('deleteFormContainer').style.display = 'block';
                scrollToTop();
                hideModifyForm();
            }

            // Hide the delete form
            function hideDeleteForm() {
                document.getElementById('deleteFormContainer').style.display = 'none';
            }

            // Load the initial items when the page loads
            window.onload = function() {
                displayItems();
            };
        </script>
    </body>
</html>