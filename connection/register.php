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
        // Check if the email already exists
        $checkEmail = $conn->prepare("SELECT * FROM studinfo WHERE email = ?");
        $checkEmail->bind_param("s", $email);
        $checkEmail->execute();
        $result = $checkEmail->get_result();

        if ($result->num_rows > 0) {
            // If email exists, set error message
            $message = "Email already exists! Please use a different email.";
        } else {
            // Insert user data if email is new
            $sql = "INSERT INTO studinfo (first_name, last_name, email, password, role) VALUES (?, ?, ?, ?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("sssss", $fName, $lName, $email, $password, $role);

            if ($stmt->execute()) {
                // If registration is successful, set success message
                $message = "Registration successful!";
            } else {
                // Set error message if registration fails
                $message = "Error: " . $conn->error;
            }

            $stmt->close();
        }

        $checkEmail->close();
    }

    $conn->close();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="registration.css">
    <title>Registration Status</title>
    <style>
        /* Popup container */
        .popup {
            display: none; /* Hidden by default */
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5); /* Black background with opacity */
            z-index: 1000; /* Sit on top */
            justify-content: center;
            align-items: center;
        }

        /* Popup content */
        .popup-content {
            background-color: white;
            padding: 20px;
            border-radius: 5px;
            text-align: center;
            max-width: 400px;
            margin: auto;
        }

        /* Close button */
        .close-btn {
            background-color: #f44336; /* Red */
            color: white;
            border: none;
            padding: 10px 15px;
            cursor: pointer;
            border-radius: 5px;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <!-- <div class="form-container">
        <div class="form-container sign-up">
            <form id="signupForm" method="POST" action="">
                <h1>Create Account</h1>
                <input type="text" name="fName" id="fName" placeholder="First Name" required>
                <input type="text" name="lName" id="lName" placeholder="Last Name" required>
                <input type="email" name="email" id="email" placeholder="Email" required>
                <input type="password" name="password" id="password" placeholder="Password" required>
                <input list="panel" name="categories" placeholder="Role" required>
                <datalist id="panel">
                    <option value="User">
                    <option value="Admin">
                </datalist>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    </div> -->

    <div class="popup" id="popup">
        <div class="popup-content">
            <p><?php echo $message; ?></p>
            <button class="close-btn" id="closePopup">Close</button>
        </div>
    </div>

    <script>
        // Show the popup if there is a message
        window.onload = function() {
            var message = "<?php echo $message; ?>";
            if (message) {
                document.getElementById('popup').style.display = 'flex'; // Show popup
            }
        }

        // Close the popup and refresh the page
        document.getElementById('closePopup').onclick = function() {
            document.getElementById('popup').style.display = 'none'; // Hide popup
            window.location.href = 'registration.php'; // Redirect to registration page
        }
    </script>
</body>
</html>
