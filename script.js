// Función para verificar la contraseña y mostrar el escritorio
function checkPassword() {
    const password = document.getElementById('password').value;
    if (password === 'password') {
        document.getElementById('login').classList.add('hidden');
        document.getElementById('escritorio').classList.remove('hidden');
    } else {
        document.getElementById('error-message').classList.remove('hidden');
    }
}

// Función para abrir una ventana
function openWindow(windowId) {
    document.getElementById(windowId).classList.remove('hidden');
}

// Función para cerrar una ventana
function closeWindow(windowId) {
    document.getElementById(windowId).classList.add('hidden');
}

// Función para hacer una ventana arrastrable y gestionar su superposición
function makeDraggable(element) {
    let isDragging = false;
    let offsetX, offsetY;

    const header = element.querySelector('.window-header');
    let zIndexCounter = 10;

    header.onmousedown = function(e) {
        isDragging = true;
        offsetX = e.clientX - element.getBoundingClientRect().left;
        offsetY = e.clientY - element.getBoundingClientRect().top;

        zIndexCounter++;
        element.style.zIndex = zIndexCounter;

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

    header.ondragstart = function() {
        return false;
    };
}


// Inicializar el arrastre y la superposición en todas las ventanas
const windows = document.querySelectorAll('.window');
windows.forEach(makeDraggable);
