document.getElementById('secondFloor').style.display = 'none';

function showFloor(floor) {
    const firstFloor = document.getElementById('firstFloor');
    const secondFloor = document.getElementById('secondFloor');
    
    if (floor === 1) {
        firstFloor.style.display = 'block';
        secondFloor.style.display = 'none';
    } else if (floor === 2) {
        firstFloor.style.display = 'none';
        secondFloor.style.display = 'block';
    }
}

// Common function to handle hover and click events for paths
function addPathListeners(paths, svgId) {
    const nameLabel = document.getElementById('name');
    const slidingColumn = document.getElementById('slidingColumn');

    paths.forEach(path => {
        // Hover effect
        path.addEventListener('mouseover', () => {
            nameLabel.style.opacity = '1';
            nameLabel.querySelector('#namep').innerText = `${svgId} - ${path.id}`;
        });

        // Mouse move to follow cursor
        path.addEventListener('mousemove', (e) => {
            nameLabel.style.left = `${e.pageX + 10}px`;
            nameLabel.style.top = `${e.pageY - 20}px`;
        });

        // Mouse leave to hide label
        path.addEventListener('mouseout', () => {
            nameLabel.style.opacity = '0';
        });

        // Click to show sliding column
        path.addEventListener('click', () => {
            slidingColumn.classList.add('show');
            document.getElementById('pins').innerHTML = `<div class="pin">You clicked on: ${svgId} - ${path.id}</div>`;
        });
    });
}

// Apply listeners for both first and second floors
addPathListeners(document.querySelectorAll('#firstFloor .allPaths'), 'First Floor');
addPathListeners(document.querySelectorAll('#secondFloor .allPaths'), 'Second Floor');

// Close button functionality
document.getElementById("closeButton").addEventListener("click", function () {
    document.getElementById("slidingColumn").classList.remove("show");
});

// const map = document.querySelector('svg');
// let scale = 1;

// document.addEventListener('wheel', (event) => {
//     event.preventDefault();
//     const zoomSpeed = 0.1;

//     if (event.deltaY < 0) {
//         // Zoom in
//         scale += zoomSpeed;
//     } else {
//         // Zoom out
//         scale = Math.max(scale - zoomSpeed, 0.5); // Set a minimum zoom limit
//     }

//     // Center the map by scaling around the center point
//     map.style.transformOrigin = "center center";
//     map.style.transform = `scale(${scale})`;
// });


/* Add event listeners for each icon
const cautionIcon = document.getElementById('cautionIcon');
cautionIcon.addEventListener('click', () => {
    alert('Caution icon clicked!');
});

const cleaningIcon = document.getElementById('cleaningIcon');
cleaningIcon.addEventListener('click', () => {
    alert('Cleaning icon clicked!');
});

const electricalIcon = document.getElementById('electricalIcon');
electricalIcon.addEventListener('click', () => {
    alert('Electrical icon clicked!');
});

const itIcon = document.getElementById('itIcon');
itIcon.addEventListener('click', () => {
    alert('IT icon clicked!');
});
const RepairIconIcon = document.getElementById('RepairIcon');
RepairIcon.addEventListener('click', () => {
    alert('Repair icon clicked!');
});
const RequestIconIcon = document.getElementById('RequestIcon');
RequestIcon.addEventListener('click', () => {
    alert('Request icon clicked!');
}); */

const map = document.querySelector('svg');

// Center the map without zoom or pan
map.style.transformOrigin = "center center";
map.style.transform = "scale(.9)";

let selectedIcon = null;
let copyElement = null;

const icons = document.querySelectorAll('#slidingColumn img');

icons.forEach(icon => {
    icon.addEventListener('click', function() {
        selectedIcon = icon; // Store the clicked icon
        copyElement = icon.cloneNode(true); // Create a copy of the icon
        copyElement.style.position = 'absolute';
        copyElement.style.cursor = 'pointer';
        copyElement.style.zIndex = '10';
        document.getElementById('canvas').appendChild(copyElement); // Add the copy to the canvas

        // Ask the user to click on the canvas
        alert("Click anywhere on the canvas to place the icon.");
        document.getElementById('canvas').addEventListener('click', placeIcon);
    });
});




/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let isPlacingIcon = false; // Flag to track if the icon is being placed
let currentPin = null; // Store the current pin being placed
let pinData = []; // Array to store pin data (coordinates and ID)

// Simulating a database save (replace with an actual API call in production)
function savePinToDatabase(pin) {
    // Here you can make an API call to save the pin's coordinates to the database
    pinData.push({
        id: pin.id,
        x: pin.style.left,
        y: pin.style.top,
    });
    console.log('Saved pin:', pinData);
}

// Function to handle pin placement
function placePin(event) {
    if (!currentPin) return; // Exit if no pin is being placed

    const rect = document.getElementById('canvas').getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    currentPin.style.left = `${x}px`;
    currentPin.style.top = `${y}px`;

    // Move the confirm and cancel buttons with the pin
    confirmButton.style.left = `${x + 30}px`;
    confirmButton.style.top = `${y + 30}px`;

    cancelButton.style.left = `${x + 70}px`;
    cancelButton.style.top = `${y + 30}px`;
}

// Function to handle confirming pin placement
function confirmPin() {
    // Save the pin's position to the database
    savePinToDatabase(currentPin);

    // Pin becomes clickable after confirmation
    currentPin.addEventListener('click', function () {
        const removeButton = document.createElement('button');
        removeButton.innerText = 'Remove';
        removeButton.style.position = 'absolute';
        removeButton.style.left = `${parseInt(currentPin.style.left) + 20}px`;
        removeButton.style.top = `${parseInt(currentPin.style.top) - 20}px`;

        removeButton.addEventListener('click', () => {
            currentPin.remove();  // Remove the pin from the canvas
            removeButton.remove(); // Remove the remove button
        });

        document.getElementById('canvas').appendChild(removeButton);
    });

    // Hide the confirm and cancel buttons after confirmation
    confirmButton.remove();
    cancelButton.remove();
    currentPin = null;  // Reset current pin
    isPlacingIcon = false;  // End the placement process
}

// Function to handle canceling pin placement
function cancelPin() {
    // Remove the pin and buttons if canceled
    currentPin.remove();
    confirmButton.remove();
    cancelButton.remove();
    currentPin = null;  // Reset current pin
    isPlacingIcon = false;  // End the placement process
}

// When a user clicks on a pin, ask them if they want to place a pin
function startPinPlacement(pin) {
    alert("You can now place the pin. Click 'OK' to continue.");
    
    currentPin = pin.cloneNode(true);  // Clone the pin icon to be placed
    currentPin.style.position = 'absolute';
    currentPin.style.cursor = 'pointer';
    currentPin.style.zIndex = '10';
    document.getElementById('canvas').appendChild(currentPin); // Add the pin to the canvas

    isPlacingIcon = true;

    // Create buttons for confirming or canceling pin placement
    const x = 0, y = 0; // Initial position
    currentPin.style.left = `${x}px`;
    currentPin.style.top = `${y}px`;

    confirmButton = document.createElement('button');
    confirmButton.innerText = 'Check';
    confirmButton.style.position = 'absolute';
    confirmButton.style.left = `${x + 30}px`;
    confirmButton.style.top = `${y + 30}px`;

    cancelButton = document.createElement('button');
    cancelButton.innerText = 'X';
    cancelButton.style.position = 'absolute';
    cancelButton.style.left = `${x + 70}px`;
    cancelButton.style.top = `${y + 30}px`;

    confirmButton.addEventListener('click', confirmPin);
    cancelButton.addEventListener('click', cancelPin);

    document.getElementById('canvas').appendChild(confirmButton);
    document.getElementById('canvas').appendChild(cancelButton);

    // Listen for the movement of the pin
    document.getElementById('canvas').addEventListener('mousemove', placePin);
}

// Example: When user clicks on a pin
const pins = document.querySelectorAll('.pin-icon'); // Assuming you have these pins in your HTML

pins.forEach(pin => {
    pin.addEventListener('click', function () {
        startPinPlacement(pin); // Start pin placement
    });
});

