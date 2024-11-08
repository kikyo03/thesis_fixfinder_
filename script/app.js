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

function addPathListeners(paths, svgId) {
    const nameLabel = document.getElementById('name');
    const slidingColumn = document.getElementById('slidingColumn');

    paths.forEach(path => {
        path.addEventListener('mouseover', () => {
            nameLabel.style.opacity = '1';
            nameLabel.querySelector('#namep').innerText = `${svgId} - ${path.id}`;
        });

        path.addEventListener('mousemove', (e) => {
            nameLabel.style.left = `${e.pageX + 10}px`;
            nameLabel.style.top = `${e.pageY - 20}px`;
        });

        path.addEventListener('mouseout', () => {
            nameLabel.style.opacity = '0';
        });

        path.addEventListener('click', () => {
            slidingColumn.classList.add('show');
            document.getElementById('pins').innerHTML = `<div class="pin">You clicked on: ${svgId} - ${path.id}</div>`;
        });
    });
}

addPathListeners(document.querySelectorAll('#firstFloor .allPaths'), 'First Floor');
addPathListeners(document.querySelectorAll('#secondFloor .allPaths'), 'Second Floor');

document.getElementById("closeButton").addEventListener("click", function () {
    document.getElementById("slidingColumn").classList.remove("show");
});

let pinPositions = [];

function savePinPositions() {
    localStorage.setItem("pinPositions", JSON.stringify(pinPositions));
}

function loadPinPositions() {
    const savedPositions = JSON.parse(localStorage.getItem("pinPositions"));
    if (savedPositions) {
        savedPositions.forEach(position => {
            // Create a new pin element at the saved position
            const pinElement = document.createElement('div');
            pinElement.classList.add('pin');
            pinElement.style.position = 'absolute';
            pinElement.style.top = position.top;
            pinElement.style.left = position.left;
            pinElement.id = position.pinId; // Use saved pin ID
            document.getElementById("mapContainer").appendChild(pinElement);

            // Make the placed pin clickable for removal
            pinElement.addEventListener('click', () => {
                const removePin = window.confirm("Do you want to remove this pin?");
                if (removePin) {
                    document.getElementById("mapContainer").removeChild(pinElement);
                    // Also remove from saved pin positions
                    pinPositions = pinPositions.filter(p => p.pinId !== position.pinId);
                    savePinPositions(); // Update localStorage
                }
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const mapContainer = document.getElementById('mapContainer');

    function makeDraggable(pin) {
        let isDragging = false;
        let offsetX, offsetY;

        function onMouseMove(e) {
            if (isDragging) {
                pin.style.position = 'absolute';
                pin.style.left = `${e.clientX - offsetX}px`;
                pin.style.top = `${e.clientY - offsetY}px`;
            }
        }

        function onMouseUp() {
            isDragging = false;

            const action = window.confirm("Do you want to confirm this pin's location? Press Cancel to remove it or OK to place it.");
            
            if (action) {
                // Save the pin's position and ID in localStorage
                const pinId = `pin-${Date.now()}`; // Unique ID for each pin
                pinPositions.push({
                    pinId: pinId,
                    top: pin.style.top,
                    left: pin.style.left
                });
                savePinPositions(); // Update localStorage

                pin.style.position = "absolute";

                // Ask the user if they want to proceed to the report or status page after confirming
                const proceedTo = window.confirm("Do you want to proceed to the report page? Press OK for Reports or Cancel for Status.");
                if (proceedTo) {
                    window.location.href = '/pages/report.html'; // Redirect to the report page
                } else {
                    window.location.href = '/pages/status.html'; // Redirect to the status page
                }

                // Disable dragging after confirmation
                pin.removeEventListener('mousedown', onMouseDown);
                pin.removeEventListener('mousemove', onMouseMove);
                pin.removeEventListener('mouseup', onMouseUp);

                // Make the pin clickable after placement
                pin.addEventListener('click', () => {
                    const userAction = window.confirm("Do you want to remove this pin? Press OK to remove or Cancel to proceed to the report/status page.");
                    if (userAction) {
                        mapContainer.removeChild(pin); // Remove pin if user clicks OK
                        // Also remove from saved pin positions
                        pinPositions = pinPositions.filter(p => p.pinId !== pinId);
                        savePinPositions(); // Update localStorage
                    } else {
                        // Ask whether to go to reports or status
                        const goToPage = window.confirm("Do you want to go to the report page? Press OK for Reports or Cancel for Status.");
                        if (goToPage) {
                            window.location.href = '/pages/report.html'; // Redirect to the report page
                        } else {
                            window.location.href = '/pages/status.html'; // Redirect to the status page
                        }
                    }
                });
            } else {
                mapContainer.removeChild(pin); // Remove pin if canceled
            }

            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }

        function onMouseDown(e) {
            isDragging = true;
            offsetX = e.clientX - pin.getBoundingClientRect().left;
            offsetY = e.clientY - pin.getBoundingClientRect().top;

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        }

        pin.addEventListener('mousedown', onMouseDown);
    }

    function clonePin(pin, x, y) {
        const clone = pin.cloneNode(true);
        clone.style.position = 'absolute';
        clone.style.left = `${x}px`;
        clone.style.top = `${y}px`;
        mapContainer.appendChild(clone);

        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'X';
        clone.appendChild(closeBtn);

        closeBtn.addEventListener('click', () => {
            mapContainer.removeChild(clone);
        });

        makeDraggable(clone); // Enable dragging after placement
    }

    // Allow repeated placement of pins by reactivating click listeners after placing each pin
    function enablePinPlacement(icon) {
        icon.addEventListener('click', function (e) {
            const mapRect = mapContainer.getBoundingClientRect();
            const x = e.clientX - mapRect.left;
            const y = e.clientY - mapRect.top;
            clonePin(icon, x, y);  // Clone pin when clicked
        });
    }

    // Enable placement for each pin type
    enablePinPlacement(cautionIcon);
    enablePinPlacement(cleaningIcon);
    enablePinPlacement(electricalIcon);
    enablePinPlacement(itIcon);
    enablePinPlacement(repairIcon);
    enablePinPlacement(requestIcon);
});

// Load saved pins from localStorage when the page loads
window.onload = function() {
    loadPinPositions();
};
