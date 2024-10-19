<?php
session_start();

// Check if the user is logged in
if (!isset($_SESSION['loggedin']) || $_SESSION['role'] != 'employee') {
    header('Location: ../login.php');
    exit();
}

// Include the database connection
include '../includes/db.php';

// Function to clean the phone number
function cleanPhoneNumber($number) {
    // Remove any non-digit characters
    $cleaned = preg_replace('/\D/', '', $number);
    
    // Remove country code if it exists (you can customize this based on your needs)
    // For example: removing '0', '+91', etc.
    if (strpos($cleaned, '91') === 0) {
        $cleaned = substr($cleaned, 2); // Remove '+91'
    } elseif (strpos($cleaned, '0') === 0) {
        $cleaned = substr($cleaned, 1); // Remove '0'
    }

    return $cleaned;
}

// Retrieve the form data
$choose_service = $_POST['serviceType'] === "Other" ? $_POST['customServiceType'] : $_POST['serviceType'];
$customer_name = $_POST['customerName'];
$contact_number = cleanPhoneNumber($_POST['contactNumber']);
$whatsapp_number = cleanPhoneNumber($_POST['whatsappNumber']);
$address = $_POST['address'];
$address_city = $_POST['addressCity'];
$district = $_POST['district'] === "Other" ? $_POST['customDistrict'] : $_POST['district'];
$customer_type = $_POST['customerType'] === "Other" ? $_POST['customCustomerType'] : $_POST['customerType'];
$service_type_select = $_POST['serviceTypeSelect'] === "Other" ? $_POST['customServiceTypeSelect'] : $_POST['serviceTypeSelect'];
$machine_type = $_POST['machineType'] === "Other" ? $_POST['customMachineType'] : $_POST['machineType'];
$machine_brand = $_POST['machineBrand'] === "Other" ? $_POST['customMachineBrand'] : $_POST['machineBrand'];
$model_name = $_POST['modelName'];
$engine_number = $_POST['engineNumber'];
$problem = $_POST['problem'] === "Other" ? $_POST['customProblem'] : $_POST['problem'];
$due_date = $_POST['dueDate'];
$notes = $_POST['notes'];
$submitted_by = $_SESSION['name'];
$current_timestamp = $_POST['currentTimestamp'];

// Check if the contact number exists in the customers table
$sql_check_contact = "SELECT customer_id FROM customers WHERE contact_number = ?";
$stmt = $conn->prepare($sql_check_contact);
$stmt->bind_param('s', $contact_number);
$stmt->execute();
$stmt->bind_result($customer_id);
$stmt->fetch();
$stmt->close();

if (!$customer_id) {
    // Generate a new customer_id in the format CN00001, CN00002, etc.
    $sql_get_last_id = "SELECT customer_id FROM customers ORDER BY customer_id DESC LIMIT 1";
    $result = $conn->query($sql_get_last_id);
    if ($result->num_rows > 0) {
        // Fetch the last customer_id and increment it
        $row = $result->fetch_assoc();
        $last_id = intval(substr($row['customer_id'], 2)); // Extract the numeric part of the ID
        $new_id = 'CN' . str_pad($last_id + 1, 5, '0', STR_PAD_LEFT);
    } else {
        // If no customer exists, start with CN00001
        $new_id = 'CN00001';
    }

    // Insert new customer with generated customer_id
    $sql_insert_customer = "INSERT INTO customers (customer_id, customer_name, contact_number) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql_insert_customer);
    $stmt->bind_param('sss', $new_id, $customer_name, $contact_number);

    if (!$stmt->execute()) {
        // Handle error in case the insert fails
        die("Error inserting new customer: " . $stmt->error);
    }
    $stmt->close();

    // Use the newly created customer_id
    $customer_id = $new_id;
}

// Prepare the SQL statement for inserting the new service
$sql = "INSERT INTO services (customer_id, choose_service, customer_name, contact_number, whatsapp_number, address, city, district, customer_type, service_type, machine_type, machine_brand, model_name, engine_number, problem, due_date, notes, submitted_by, created_at) 
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

// Initialize a prepared statement for insertion
$stmt = $conn->prepare($sql);

// Bind parameters to the SQL query
$stmt->bind_param("sssssssssssssssssss", $customer_id, $choose_service, $customer_name, $contact_number, $whatsapp_number, $address, $address_city, $district, $customer_type, $service_type, $machine_type, $machine_brand, $model_name, $engine_number, $problem, $due_date, $notes, $submitted_by, $current_timestamp);

// Execute the prepared statement
if ($stmt->execute()) {
    // Prepare SQL statement to fetch the last entry made by the employee
    $fetch_sql = "SELECT job_number FROM services WHERE submitted_by = ? ORDER BY job_number DESC LIMIT 1";
    $fetch_stmt = $conn->prepare($fetch_sql);
    $fetch_stmt->bind_param("s", $submitted_by); // Bind employee's name for filtering
    $fetch_stmt->execute();
    $result = $fetch_stmt->get_result();

    // Check if any results were returned
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $job_number = $row['job_number'];

        // Display the successful message and the last entry in HTML format
        echo "<html>
        <head>
            <link rel='stylesheet' type='text/css' href='../assets/css/styles.css'>
            <script>
                function printPage() {
                    window.print();
                }
            </script>
        </head>
        <body>
            <div class='add-service-container'>
                <button class='print-button' onclick='printPage()'>Print</button>
                <div class='entry'>
                    <img src='https://silaaimachines.com/wp-content/uploads/2024/09/Silaamachine-Logo-Pink-Long-Text.png' alt='Silaaimachines Logo' class='logo'>
                    <p class='job-number'>Service Request Received</p>
                    <p class='job-number-value'>" . htmlspecialchars($job_number) . "</p>
                    <p class='customer-id'>Customer ID: " . htmlspecialchars($customer_id) . "</p>
                    <table>
                        <tr>
                            <th>Choose Service</th>
                            <td>" . htmlspecialchars($choose_service) . "</td>
                        </tr>
                        <tr>
                            <th>Customer Name</th>
                            <td>" . htmlspecialchars($customer_name) . "</td>
                        </tr>
                        <tr>
                            <th>Contact Number</th>
                            <td>" . htmlspecialchars($contact_number) . "</td>
                        </tr>
                        <tr>
                            <th>WhatsApp Number</th>
                            <td>" . htmlspecialchars($whatsapp_number) . "</td>
                        </tr>
                        <tr>
                            <th>Address - Village/Area</th>
                            <td>" . htmlspecialchars($address) . "</td>
                        </tr>
                        <tr>
                            <th>Address - Town</th>
                            <td>" . htmlspecialchars($address_city) . "</td>
                        </tr>
                        <tr>
                            <th>District</th>
                            <td>" . htmlspecialchars($district) . "</td>
                        </tr>
                        <tr>
                            <th>Customer Type</th>
                            <td>" . htmlspecialchars($customer_type) . "</td>
                        </tr>
                        <tr>
                            <th>Service Type</th>
                            <td>" . htmlspecialchars($service_type) . "</td>
                        </tr>
                        <tr>
                            <th>Machine Type</th>
                            <td>" . htmlspecialchars($machine_type) . "</td>
                        </tr>
                        <tr>
                            <th>Machine Brand</th>
                            <td>" . htmlspecialchars($machine_brand) . "</td>
                        </tr>
                        <tr>
                            <th>Model Name</th>
                            <td>" . htmlspecialchars($model_name) . "</td>
                        </tr>
                        <tr>
                            <th>Engine Number</th>
                            <td>" . htmlspecialchars($engine_number) . "</td>
                        </tr>
                        <tr>
                            <th>Problem</th>
                            <td>" . htmlspecialchars($problem) . "</td>
                        </tr>
                        <tr>
                            <th>Due Date</th>
                            <td>" . htmlspecialchars($due_date) . "</td>
                        </tr>
                        <tr>
                            <th>Notes</th>
                            <td>" . htmlspecialchars($notes) . "</td>
                        </tr>
                    </table>
                </div>
                <a href='employee_dashboard.php'>Go back to Dashboard</a>
            </div>
        </body>
        </html>";
    } else {
        // Handle case where no results are found (shouldn't happen in this context)
        echo "No entry found.";
        exit();
    }
} else {
    // Handle error in case the insert fails
    echo "<html>
    <body>
        <h1>Error Adding Service: " . htmlspecialchars($stmt->error) . "</h1>
        <p><a href='employee_add_a_service.php'>Go back to the form</a></p>
    </body>
    </html>";
}

$stmt->close();
$conn->close();
?>