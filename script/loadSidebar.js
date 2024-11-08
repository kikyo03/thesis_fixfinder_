// Function to load the sidebar HTML into a target element on the page
function loadSidebar() {
    const sidebarContainer = document.getElementById("sidebar-container");
    
    // Check if the target element exists on the page
    if (!sidebarContainer) {
        console.error('Error: Sidebar container not found!');
        return;
    }
    
    // Fetch the sidebar HTML template
    fetch('../pages/sidebar.html')
        .then(response => {
            // Check if the request was successful
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            // Inject the fetched HTML into the sidebar container
            sidebarContainer.innerHTML = html;
            console.log('Sidebar loaded successfully!');
        })
        .catch(error => {
            console.error('Error loading the sidebar:', error);
        });
}

// Make sure loadSidebar is called once DOM is ready
document.addEventListener("DOMContentLoaded", function() {
    loadSidebar();
});
