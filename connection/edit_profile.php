<?php
include 'connect.php'; // Include database connection

// Set a variable to hold the feedback message
$message = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fName = $_POST['fName'];
    $lName = $_POST['lName'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $role = $_POST['role']; // Use 'User' or 'Admin'

    // Check if the role is selected
    if (empty($role)) {
        $message = "Please select a valid category.";
    } else {
        // Check if the email already exists (excluding the current email)
        $checkEmail = $conn->prepare("SELECT * FROM studinfo WHERE email = ? AND email != ?");
        $checkEmail->bind_param("ss", $email, $email); // Make sure the current email is not checked
        $checkEmail->execute();
        $result = $checkEmail->get_result();

        if ($result->num_rows > 0) {
            // If email exists, set error message
            $message = "Email already exists! Please use a different email.";
        } else {
            // Update user data if no email conflict
            $sql = "UPDATE studinfo SET first_name = ?, last_name = ?, email = ?, password = ?, role = ? WHERE email = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("ssssss", $fName, $lName, $email, $password, $role, $email);

            if ($stmt->execute()) {
                // If update is successful, set success message
                $message = "Profile updated successfully!";
            } else {
                // Set error message if update fails
                $message = "Error: " . $conn->error;
            }

            $stmt->close();
        }

        $checkEmail->close();
    }

    $conn->close();
}
?>

<!-- You can show the message in the popup here (if necessary) -->
