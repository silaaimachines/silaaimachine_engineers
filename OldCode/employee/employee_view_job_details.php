<?php 
session_start(); 
 
// Check if user is logged in and is an employee 
if (!isset($_SESSION['loggedin']) || $_SESSION['role'] != 'employee') { 
    header('Location: ../login.php'); 
    exit(); 
}

$name = isset($_SESSION['name']) ? $_SESSION['name'] : 'Employee';
$role = isset($_SESSION['role']) ? $_SESSION['role'] : 'employee';

// Initialize error message variable
$error_message = '';

// Check if a job number has been submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Process the submitted job number
    $job_number = $_POST['jobNumber'];

    // Include the database connection
    include '../includes/db.php';

    // Prepare the SQL statement to fetch job details
    $sql = "SELECT * FROM services WHERE job_number = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $job_number); // Bind the job number
    $stmt->execute();
    $result = $stmt->get_result();

    // Check if a job with the provided job number exists
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc(); // Fetch the job details
    } else {
        // Set error message if no job is found
        $error_message = "No job found with Job Number: " . htmlspecialchars($job_number);
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

        <script>
            function printPage() {
                window.print();
            }
        </script>
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

                            <a href="employee_update_servicing_details.php" class="sidebar__link">
                                <i class="ri-information-fill"></i>
                                <span>Servicing Details</span>
                            </a>

                            <a href="employee_generate_service_bill.php" class="sidebar__link">
                                <i class="ri-bill-fill"></i>
                                <span>Service Bill</span>
                            </a>

                            <a href="employee_view_job_details.php" class="sidebar__link active-link">
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
            <div class="center-container">
                <h1>View Job Details</h1>
            </div>
            <form method="POST">
                <div class="form-group">
                    <label for="jobNumber">Enter Job Number:</label><br>
                    <input type="text" id="jobNumber" name="jobNumber" required>
                </div>
                <div class="center-container">
                    <input type="submit" value="View Job" id="submitButton">
                </div>
            </form>

            <div class="center-container">
                <?php if (!empty($error_message)) { ?>
                    <p class="error"><?php echo $error_message; ?></p>
                <?php } ?>
            </div>

            <?php if (isset($row)) { ?>
                <div class="entry">
                    <p class="job-number">Service Details</p>
                    <p class="job-number-value"><?php echo htmlspecialchars($row['job_number']); ?></p>
                    <p class="customer-id">Customer ID: <?php echo htmlspecialchars($row['customer_id']); ?></p>
                    <table>
                        <tr><td><strong>Choose Service</strong></td><td><?php echo htmlspecialchars($row['choose_service']); ?></td></tr>
                        <tr><td><strong>Customer Name</strong></td><td><?php echo htmlspecialchars($row['customer_name']); ?></td></tr>
                        <tr><td><strong>Contact Number</strong></td><td><?php echo htmlspecialchars($row['contact_number']); ?></td></tr>
                        <tr><td><strong>WhatsApp Number</strong></td><td><?php echo htmlspecialchars($row['whatsapp_number']); ?></td></tr>
                        <tr><td><strong>Address</strong></td><td><?php echo htmlspecialchars($row['address']); ?></td></tr>
                        <tr><td><strong>City</strong></td><td><?php echo htmlspecialchars($row['city']); ?></td></tr>
                        <tr><td><strong>District</strong></td><td><?php echo htmlspecialchars($row['district']); ?></td></tr>
                        <tr><td><strong>Customer Type</strong></td><td><?php echo htmlspecialchars($row['customer_type']); ?></td></tr>
                        <tr><td><strong>Service Type</strong></td><td><?php echo htmlspecialchars($row['service_type']); ?></td></tr>
                        <tr><td><strong>Machine Type</strong></td><td><?php echo htmlspecialchars($row['machine_type']); ?></td></tr>
                        <tr><td><strong>Machine Brand</strong></td><td><?php echo htmlspecialchars($row['machine_brand']); ?></td></tr>
                        <tr><td><strong>Model Name</strong></td><td><?php echo htmlspecialchars($row['model_name']); ?></td></tr>
                        <tr><td><strong>Engine Number</strong></td><td><?php echo htmlspecialchars($row['engine_number']); ?></td></tr>
                        <tr><td><strong>Problem</strong></td><td><?php echo htmlspecialchars($row['problem']); ?></td></tr>
                        <tr><td><strong>Due Date</strong></td><td><?php echo htmlspecialchars($row['due_date']); ?></td></tr>
                        <tr><td><strong>Notes</strong></td><td><?php echo htmlspecialchars($row['notes']); ?></td></tr>
                        <tr><td><strong>Submitted By</strong></td><td><?php echo htmlspecialchars($row['submitted_by']); ?></td></tr>
                    </table>
                </div>
                <div class="center-container">
                    <button class='print-button' onclick='printPage()' id='submitButton'>Print</button>
                </div>
            <?php } ?>
        </main>
        
        <!--=============== MAIN JS ===============-->
        <script src="../assets/js/main.js"></script>
    </body>
</html>