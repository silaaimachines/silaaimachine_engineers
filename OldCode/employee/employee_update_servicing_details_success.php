<?php
session_start();

// Check if user is logged in and is an employee 
if (!isset($_SESSION['loggedin']) || $_SESSION['role'] != 'employee') { 
    header('Location: ../login.php'); 
    exit(); 
}

$name = isset($_SESSION['name']) ? $_SESSION['name'] : 'Employee';
$role = isset($_SESSION['role']) ? $_SESSION['role'] : 'employee';
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
        <div class="container center-container">
            <h1>Service Details Updated Successfully</h1>
            <p>The servicing details have been successfully updated.</p>
            <p>Return to the <a href="employee_dashboard.php">Dashboard</a> or <a href="employee_update_servicing_details.php">Update Another Service</a>.</p>
        </div>
    </main>

    <!--=============== MAIN JS ===============-->
    <script src="../assets/js/main.js"></script>
</body>
</html>