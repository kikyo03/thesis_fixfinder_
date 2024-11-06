// Toggle for switching between Login and Sign-Up forms
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }

// Login form submission and redirection based on role
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    const role = document.getElementById("roleSelectLogin").value; // Access selected role in login form // 

    if (role === "Admin") {
        window.location.href = "../pages/admin.html"; // Replace with actual admin page URL 
    } else if (role === "User") {
        window.location.href = "../pages/index.html"; // Replace with actual user page URL 
    } else {
        alert("Please select a valid role.");
    }
});
