<?php 
session_start(); 
 
// Check if user is logged in and is an employee 
if (!isset($_SESSION['loggedin'])) { 
    header('Location: ../login.php'); 
    exit(); 
}

$name = isset($_SESSION['name']) ? $_SESSION['name'] : 'Employee';

include 'service_entry_form_options.php';
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
                            <a href="employee_add_a_service.php" class="sidebar__link active-link">
                                <i class="ri-add-large-fill"></i>
                                <span>Add New Service</span>
                            </a>

                            <a href="employee_update_servicing_details.php" class="sidebar__link">
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
                    <h1>Add New Service</h1>
                </div>
                <form action="employee_add_service_processing.php" method="post">

                    <label for="serviceType">Choose Service</label> <!-- Updated the label -->
                    <select id="serviceType" name="serviceType" required onchange="toggleCustomInput(this, 'customServiceType')">
                        <option value="">Choose Service</option> <!-- Updated this line -->
                        <option value="Store Service">Store Service</option>
                        <option value="Home Service">Home Service</option>
                    </select>
                    <input type="text" id="customServiceType" name="customServiceType" placeholder="Specify Other" style="display:none;">

                    <label for="customerName">Customer Name *</label>
                    <input type="text" id="customerName" name="customerName" required>

                    <label for="contactNumber">Contact Number *</label>
                    <input type="tel" id="contactNumber" name="contactNumber" required>

                    <label for="whatsappNumber">WhatsApp Number</label>
                    <input type="tel" id="whatsappNumber" name="whatsappNumber">

                    <label for="address">Address</label>
                    <input type="text" id="address" name="address">

                    <label for="addressCity">City</label>
                    <input type="text" id="addressCity" name="addressCity">

                    <label for="district">District</label>
                    <select id="district" name="district" onchange="toggleCustomInput(this, 'customDistrict')">
                        <option value="">Select District</option>
                        <?php foreach ($districts as $district): ?>
                            <option value="<?php echo $district; ?>"><?php echo $district; ?></option>
                        <?php endforeach; ?>
                        <option value="Other">Other</option>
                    </select>
                    <input type="text" id="customDistrict" name="customDistrict" placeholder="Specify Other" style="display:none;">

                    <label for="customerType">Customer Type</label>
                    <select id="customerType" name="customerType" onchange="toggleCustomInput(this, 'customCustomerType')">
                        <option value="">Select Customer Type</option>
                        <?php foreach ($customerTypes as $type): ?>
                            <option value="<?php echo $type; ?>"><?php echo $type; ?></option>
                        <?php endforeach; ?>
                        <option value="Other">Other</option>
                    </select>
                    <input type="text" id="customCustomerType" name="customCustomerType" placeholder="Specify Other" style="display:none;">

                    <label for="serviceTypeSelect">Service Type</label> <!-- Second Service Type -->
                    <select id="serviceTypeSelect" name="serviceTypeSelect" onchange="toggleCustomInput(this, 'customServiceTypeSelect')">
                        <option value="">Select Service Type</option>
                        <?php foreach ($serviceTypes as $service): ?>
                            <option value="<?php echo $service; ?>"><?php echo $service; ?></option>
                        <?php endforeach; ?>
                        <option value="Other">Other</option>
                    </select>
                    <input type="text" id="customServiceTypeSelect" name="customServiceTypeSelect" placeholder="Specify Other" style="display:none;">

                    <label for="machineType">Machine Type</label>
                    <select id="machineType" name="machineType" onchange="toggleCustomInput(this, 'customMachineType')">
                        <option value="">Select Machine Type</option>
                        <?php foreach ($machineTypes as $machine): ?>
                            <option value="<?php echo $machine; ?>"><?php echo $machine; ?></option>
                        <?php endforeach; ?>
                        <option value="Other">Other</option>
                    </select>
                    <input type="text" id="customMachineType" name="customMachineType" placeholder="Specify Other" style="display:none;">

                    <label for="machineBrand">Machine Brand</label>
                    <select id="machineBrand" name="machineBrand" onchange="toggleCustomInput(this, 'customMachineBrand')">
                        <option value="">Select Machine Brand</option>
                        <?php foreach ($machineBrands as $brand): ?>
                            <option value="<?php echo $brand; ?>"><?php echo $brand; ?></option>
                        <?php endforeach; ?>
                        <option value="Other">Other</option>
                    </select>
                    <input type="text" id="customMachineBrand" name="customMachineBrand" placeholder="Specify Other" style="display:none;">

                    <label for="modelName">Model Name</label>
                    <input type="text" id="modelName" name="modelName">

                    <label for="engineNumber">Engine Number</label>
                    <input type="text" id="engineNumber" name="engineNumber">

                    <label for="problem">Problem</label>
                    <select id="problem" name="problem" onchange="toggleCustomInput(this, 'customProblem')">
                        <option value="">Select Problem</option>
                        <?php foreach ($problems as $issue): ?>
                            <option value="<?php echo $issue; ?>"><?php echo $issue; ?></option>
                        <?php endforeach; ?>
                        <option value="Other">Other</option>
                    </select>
                    <input type="text" id="customProblem" name="customProblem" placeholder="Specify Other" style="display:none;">

                    <label for="dueDate">Due Date</label>
                    <input type="date" id="dueDate" name="dueDate">

                    <label for="notes">Notes</label>
                    <textarea id="notes" name="notes" rows="4"></textarea>
                    
                    <input type="hidden" id="currentTimestamp" name="currentTimestamp" value="">

                    <div class="center-container">
                        <button type="submit" id="submitButton">Submit</button>
                    </div>
                </form>
            </div>
        </main>
        
        <!--=============== MAIN JS ===============-->
        <script src="../assets/js/main.js"></script>
    </body>
</html>