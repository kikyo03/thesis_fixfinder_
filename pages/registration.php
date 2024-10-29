<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
    <link rel="stylesheet" href="../css/registration.css">
    <title>FixFinder Login | Signup</title>
</head>
<body>
    <div class="container" id="container">
        <!-- Sign-up form -->
        <div class="form-container sign-up">
            <form id="signupForm" method="POST" action="register.php">
                <h1>Create Account</h1>
                <span>Register Now! and connect with us.</span>
                <input type="text" name="fName" id="fName" placeholder="First Name" required>
                <input type="text" name="lName" id="lName" placeholder="Last Name" required>
                <input type="email" name="email" id="email" placeholder="Email" required>
                <input type="password" name="password" id="password" placeholder="Password" required>
                
                <!-- Role selection with unique ID -->
                <select name="role" id="roleSelectSignup" required>
                    <option value="" disabled selected>Select your role</option>
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                </select>
                
                <button type="submit">Sign Up</button>
            </form>
        </div>
        
        <!-- Login form -->
        <div class="form-container sign-in">
            <form id="loginForm" method="POST" action="register.php">
                <h1>Login</h1> 
                <span>To keep connected with us, please login.</span>
                <input type="email" name="email" id="email" placeholder="Email" required>
                <input type="password" name="password" id="password" placeholder="Password" required>
                
                <!-- Role selection with unique ID -->
                <select name="role" id="roleSelectLogin" required>
                    <option value="" disabled selected>Select your role</option>
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                </select>

                <button type="submit">Login</button>
            </form>
        </div>

        <div class="toggle-container">
            <div class="toggle">
                <div class="toggle-panel toggle-left">
                    <h1>Welcome Back Dycians!</h1>
                    <p>Login here, to use FixFinder's features and stay connected with us!</p>
                    <button class="hidden" id="login">Login</button>
                </div>
                <div class="toggle-panel toggle-right">
                    <h1>Hello, Dycians!</h1>
                    <p>Register here, with your personal details to use FixFinder's features and connect with us.</p>
                    <button class="hidden" id="register">Sign Up</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Script to handle form switching and role-based redirection -->
    <script src="../script/script.js"></script>
</body>
</html>
