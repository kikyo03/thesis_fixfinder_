// Navigate to Edit Profile page
function navigateToEditProfile() {
    window.location.href = 'edit_profile.html';
}

// Navigate back to the Dashboard page
function navigateToDashboard() {
    window.location.href = 'admin.html';
}

function previewImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profileImage').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

function previewImage(event) {
    const image = document.getElementById('profileImage');
    image.src = URL.createObjectURL(event.target.files[0]);
}


