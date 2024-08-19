// script.js

function checkPassword() {
    const password = document.getElementById('password').value;
    if (password === 'password') {
        document.getElementById('login').classList.add('hidden');
        document.getElementById('escritorio').classList.remove('hidden');
    } else {
        document.getElementById('error-message').classList.remove('hidden');
    }
}

function openWindow(windowId) {
    document.getElementById(windowId).classList.remove('hidden');
}

function closeWindow(windowId) {
    document.getElementById(windowId).classList.add('hidden');
}

// Mover ventanas
function makeDraggable(element) {
    let isDragging = false;
    let offsetX, offsetY;

    const header = element.querySelector('.window-header');

    header.onmousedown = function(e) {
        isDragging = true;
        offsetX = e.clientX - element.getBoundingClientRect().left;
        offsetY = e.clientY - element.getBoundingClientRect().top;
        document.onmousemove = function(e) {
            if (isDragging) {
                element.style.left = `${e.clientX - offsetX}px`;
                element.style.top = `${e.clientY - offsetY}px`;
            }
        };
        document.onmouseup = function() {
            isDragging = false;
            document.onmousemove = document.onmouseup = null;
        };
    };
}

// Inicializar el arrastre en las ventanas
const windows = document.querySelectorAll('.window');
windows.forEach(makeDraggable);
