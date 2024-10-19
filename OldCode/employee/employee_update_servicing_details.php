<?php 
session_start(); 
 
// Check if user is logged in and is an employee 
if (!isset($_SESSION['loggedin']) || $_SESSION['role'] != 'employee') { 
    header('Location: ../login.php'); 
    exit(); 
}

$name = isset($_SESSION['name']) ? $_SESSION['name'] : 'Employee';
$role = isset($_SESSION['role']) ? $_SESSION['role'] : 'employee';

include 'service_entry_form_options.php';

include '../includes/db.php';

// Fetch the item names from the database
$sql = "SELECT item_name FROM items";
$result = $conn->query($sql);

$items = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $items[] = $row['item_name'];
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

        <style>
            .search-container {
                position: relative;
                display: inline-block;
                width: 100%;
                margin-bottom: 10px;
            }
            .search-box {
                width: 100%;
                padding: 8px;
                box-sizing: border-box;
            }

            .item-group {
                display: flex;
                gap: 10px;
                align-items: center;
            }
            .delete-btn {
                background-color: red;
                color: white;
                border: none;
                padding: 5px 10px;
                cursor: pointer;
            }
            .delete-btn:hover {
                background-color: darkred;
            }
        </style>
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
                            <a href="employee_dashboard.php" class="sidebar__link">
                                <i class="ri-home-7-fill"></i>
                                <span>Home</span>
                            </a>
                        </div>
                    </div>

                    <!-- Manage Section -->
                    <div>
                        <h3 class="sidebar__title">MANAGE</h3>

                        <div class="sidebar__list">
                            <a href="employee_add_a_service.php" class="sidebar__link">
                                <i class="ri-add-large-fill"></i>
                                <span>Add New Service</span>
                            </a>

                            <a href="employee_update_servicing_details.php" class="sidebar__link active-link">
                                <i class="ri-information-fill"></i>
                                <span>Servicing Details</span>
                            </a>

                            <a href="employee_generate_service_bill.php" class="sidebar__link">
                                <i class="ri-bill-fill"></i>
                                <span>Service Bill</span>
                            </a>

                            <a href="employee_view_job_details.php" class="sidebar__link">
                                <i class="ri-zoom-in-fill"></i>
                                <span>View Service Details</span>
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
                    <h1>Update Servicing Details</h1>
                </div>
                <form action="employee_update_servicing_details_processing.php" method="post">
                    <label for="job_number">Job Number</label>
                    <input type="text" id="job_number" name="job_number" required>

                    <label for="serviceDone">Choose Service</label>
                    <select id="serviceDone" name="serviceDone" required>
                        <option value="">Select Service</option>
                        <option value="Store Service">Store Service</option>
                        <option value="Home Service">Home Service</option>
                    </select>

                    <label for="serviceTypeDone">Service Type Done</label>
                    <select id="serviceTypeDone" name="serviceTypeDone" required onchange="toggleCustomInput(this, 'customserviceTypeDone')">
                        <option value="">Select Service Type</option>
                        <?php foreach ($serviceTypes as $service): ?>
                            <option value="<?php echo $service; ?>"><?php echo $service; ?></option>
                        <?php endforeach; ?>
                        <option value="Other">Other</option>
                    </select>
                    <input type="text" id="customserviceTypeDone" name="customserviceTypeDone" placeholder="Specify Other" style="display:none;">

                    <div id="itemFieldsContainer">
                        <!-- The first search field -->
                        <label for="item_name[]">Spare Parts</label>
                        <div class="item-group">
                            <div class="search-container">
                                <input type="text" class="search-box" placeholder="Search Item" autocomplete="off" oninput="filterItems(this)">
                                <div class="dropdown-list"></div>
                                <input type="hidden" name="item_name[]" class="selectedItemName">
                            </div>
                            <button type="button" class="delete-btn" onclick="removeItemField(this)">X</button>
                        </div>
                    </div>

                    <div class="center-container">
                        <button type="button" id="modifyButton" onclick="addItemField()">Add More Item</button>
                    </div>

                    <label for="jobDoneBy">Job Done By</label>
                    <input type="text" id="jobDoneBy" name="jobDoneBy" required>

                    <label for="extraNotes">Extra Services</label>
                    <input type="text" id="extraNotes" name="extraNotes">
                    
                    <label for="job_status">Job Status</label>
                    <select id="job_status" name="job_status" required>
                        <option value="">Select Job Status</option>
                        <option value="Completed">Completed</option>
                        <option value="Pending">Pending</option>
                    </select>

                    <div class="center-container">
                        <button type="submit" id="submitButton">Submit</button>
                    </div>
                </form>
            </div>      
        </main>
        
        <!--=============== MAIN JS ===============-->
        <script src="../assets/js/main.js"></script>
        <script>
            const items = <?php echo json_encode($items); ?>;
            
            function filterItems(inputElement) {
                const query = inputElement.value.toLowerCase();
                const dropdown = inputElement.nextElementSibling;
                dropdown.innerHTML = '';

                // Filter and show items in the dropdown
                const filteredItems = items.filter(item => item.toLowerCase().includes(query));
                if (filteredItems.length > 0) {
                    dropdown.style.display = 'block';
                    filteredItems.forEach(item => {
                        const div = document.createElement('div');
                        div.textContent = item;
                        div.addEventListener('click', function() {
                            inputElement.value = item;
                            inputElement.nextElementSibling.nextElementSibling.value = item;  // Set hidden input
                            dropdown.style.display = 'none';
                        });
                        dropdown.appendChild(div);
                    });
                } else {
                    dropdown.style.display = 'none';
                }
            }

            function addItemField() {
                const container = document.getElementById('itemFieldsContainer');

                const itemGroup = document.createElement('div');
                itemGroup.className = 'item-group';

                const searchContainer = document.createElement('div');
                searchContainer.className = 'search-container';
                
                const searchBox = document.createElement('input');
                searchBox.type = 'text';
                searchBox.className = 'search-box';
                searchBox.placeholder = 'Search Item';
                searchBox.autocomplete = 'off';
                searchBox.oninput = function() {
                    filterItems(this);
                };

                const dropdown = document.createElement('div');
                dropdown.className = 'dropdown-list';

                const hiddenInput = document.createElement('input');
                hiddenInput.type = 'hidden';
                hiddenInput.name = 'item_name[]';
                hiddenInput.className = 'selectedItemName';

                const deleteBtn = document.createElement('button');
                deleteBtn.type = 'button';
                deleteBtn.className = 'delete-btn';
                deleteBtn.textContent = 'X';
                deleteBtn.onclick = function() {
                    removeItemField(this);
                };

                // Append the search box, dropdown, and hidden input to the search container
                searchContainer.appendChild(searchBox);
                searchContainer.appendChild(dropdown);
                searchContainer.appendChild(hiddenInput);

                // Append the search container and delete button to the item group
                itemGroup.appendChild(searchContainer);
                itemGroup.appendChild(deleteBtn);

                // Append the item group to the container
                container.appendChild(itemGroup);
            }

            function removeItemField(deleteButton) {
                const itemGroup = deleteButton.parentElement;
                itemGroup.remove();
            }

            document.addEventListener('click', function(event) {
                const dropdowns = document.querySelectorAll('.dropdown-list');
                dropdowns.forEach(dropdown => {
                    if (!dropdown.parentElement.contains(event.target)) {
                        dropdown.style.display = 'none';
                    }
                });
            });
        </script>
    </body>
</html>

Job Done By
Job Completed On
Extra Services
Show customer ID, name, phone number, address, customer type, service type (new service / re-service), brand name and model.