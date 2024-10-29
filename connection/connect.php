<?php

$host = "localhost";
$user = "root";
$pass = "";
$db = "fixfinder";

// Create connection
$conn = new mysqli($host, $user, $pass, $db);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error); // Stop script if connection fails
} else {
    // Optionally, you can print this for debugging, but it should be removed in production
    // echo "Connected successfully"; 
}

?>
