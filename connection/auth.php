<?php
include 'connect.php'; // Your database connection file

// Check which action is requested (register or login)
if (isset($_GET['action'])) {
    $action = $_GET['action'];

    if ($action == 'register' && $_SERVER["REQUEST_METHOD"] == "POST") {
        // Handle Registration
        $fName = $_POST['fName'];
        $lName = $_POST['lName'];
        $email = $_POST['email'];
        $password = $_POST['password']; // Store password as plain text
        $role = $_POST['role']; // Input for the user's role

        // Debugging output
        var_dump($_POST); // Check what is being submitted

        // Check if role is empty
        if (empty($role)) {
            echo "<p>Please select a valid category.</p>";
            exit(); // Stop execution if role is not selected
        }

        // Check if email already exists in studinfo table
        $checkEmail = $conn->prepare("SELECT * FROM studinfo WHERE email = ?");
        $checkEmail->bind_param("s", $email);
        $checkEmail->execute();
        $result = $checkEmail->get_result();

        if ($result->num_rows > 0) {
            echo "<p>Email already exists! Please use a different email.</p>";
        } else {
            // Prepare SQL statement to insert data into studinfo table without student_number
            $sql = "INSERT INTO studinfo (first_name, last_name, email, password, role) VALUES (?, ?, ?, ?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("sssss", $fName, $lName, $email, $password, $role);

            if ($stmt->execute()) {
                header("Location: index.html");
                exit();
            } else {
                echo "<p>Error: " . $conn->error . "</p>";
            }

            $stmt->close();
        }

        $checkEmail->close();
    }

    // Handle Login (same as before)
    session_start(); // Start the session
    
    if ($action == 'login' && $_SERVER["REQUEST_METHOD"] == "POST") {
        // Handle Login
        $email = $_POST['email'];
        $password = $_POST['password'];
    
        // Check if the email exists in the database
        $sql = "SELECT * FROM studinfo WHERE email = ? AND password = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ss", $email, $password);
        $stmt->execute();
        $result = $stmt->get_result();
    
        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc();
    
            // Store the user's first and last name in the session
            $_SESSION['first_name'] = $user['first_name'];
            $_SESSION['last_name'] = $user['last_name'];
    
            // Role-based redirection
            if ($user['role'] === 'Admin') {
                header("Location: ADMIN\ADMIN\admin.html");
            } else {
                header("Location: STUDENT UI\emergency_fix.html"); // Redirect to history.html for non-Admin users
            }
            exit();
        } else {
            echo "<p>Invalid email or password. Please try again.</p>";
        }
    
        $stmt->close();
    }
}
    $conn->close();
?>