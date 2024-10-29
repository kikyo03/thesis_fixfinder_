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

// Zoom and Pan functionality
const map = document.querySelector('svg');
let scale = 1;
let isPanning = false;
let startX, startY;
let offsetX = 0, offsetY = 0;

map.addEventListener('mousedown', (event) => {
    isPanning = true;
    startX = event.clientX - offsetX;
    startY = event.clientY - offsetY;
});

map.addEventListener('mouseup', () => {
    isPanning = false;
});

map.addEventListener('mousemove', (event) => {
    if (isPanning) {
        offsetX = event.clientX - startX;
        offsetY = event.clientY - startY;
        map.style.transform = `scale(${scale}) translate(${offsetX}px, ${offsetY}px)`;
    }
});

document.addEventListener('wheel', function (event) {
    event.preventDefault();
    const zoomSpeed = 0.1;

    if (event.deltaY < 0) {
        // Zoom in
        scale += zoomSpeed;
    } else {
        // Zoom out
        scale -= zoomSpeed;
        scale = Math.max(scale, 0.5); // Set a minimum zoom limit
    }

    map.style.transform = `scale(${scale}) translate(${offsetX}px, ${offsetY}px)`;
});
