let zIndexCounter = 10; // Inicializa el contador del z-index

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
    const windowElement = document.getElementById(windowId);
    windowElement.classList.remove('hidden');
    bringToFront(windowElement);
}

// Función para cerrar una ventana
function closeWindow(windowId) {
    const windowElement = document.getElementById(windowId);
    windowElement.classList.add('hidden');
    windowElement.classList.remove('maximized'); // Asegura que la ventana no esté maximizada
}

// Función para minimizar una ventana
function minimizeWindow(windowId) {
    const windowElement = document.getElementById(windowId);
    windowElement.classList.add('minimized');
    bringToFront(windowElement);
    updateTaskbar();
}

// Función para restaurar una ventana minimizada
function restoreWindow(windowId) {
    const windowElement = document.getElementById(windowId);
    windowElement.classList.remove('minimized');
    windowElement.classList.remove('hidden');
    bringToFront(windowElement);
    updateTaskbar();
}

// Función para maximizar/restaurar una ventana
function toggleMaximizeWindow(windowId) {
    const windowElement = document.getElementById(windowId);
    
    if (windowElement.classList.contains('maximized')) {
        // Restaurar tamaño
        windowElement.classList.remove('maximized');
        windowElement.style.top = '20%';
        windowElement.style.left = '20%';
        windowElement.style.width = '60vw';
        windowElement.style.height = '60vh';
    } else {
        // Maximizar
        windowElement.classList.add('maximized');
        windowElement.style.top = '0';
        windowElement.style.left = '0';
        windowElement.style.width = '100vw';
        windowElement.style.height = '100vh';
    }

    bringToFront(windowElement);
}

// Función para llevar una ventana al frente (actualiza el z-index)
function bringToFront(element) {
    zIndexCounter++;
    element.style.zIndex = zIndexCounter;
}

// Función para actualizar la barra de tareas con ventanas minimizadas
function updateTaskbar() {
    const minimizedWindows = document.querySelectorAll('.window.minimized');
    const taskbar = document.getElementById('barra-inicio');
    taskbar.innerHTML = ''; // Limpiar la barra de inicio

    minimizedWindows.forEach(win => {
        const icon = document.createElement('div');
        icon.className = 'taskbar-icon';
        icon.innerHTML = `<p>${win.getAttribute('data-title')}</p>`;
        icon.onclick = () => restoreWindow(win.id);
        taskbar.appendChild(icon);
    });
}

// Función para hacer una ventana arrastrable y manejar la superposición
function makeDraggable(element) {
    let isDragging = false;
    let offsetX, offsetY;

    const header = element.querySelector('.window-header');

    header.onmousedown = function (e) {
        isDragging = true;
        offsetX = e.clientX - element.getBoundingClientRect().left;
        offsetY = e.clientY - element.getBoundingClientRect().top;

        bringToFront(element);

        document.onmousemove = function (e) {
            if (isDragging && !element.classList.contains('maximized')) {
                element.style.left = `${e.clientX - offsetX}px`;
                element.style.top = `${e.clientY - offsetY}px`;
            }
        };

        document.onmouseup = function () {
            isDragging = false;
            document.onmousemove = document.onmouseup = null;
        };
    };

    header.ondragstart = function () {
        return false;
    };
}

// Inicializa el comportamiento de arrastrar y superposición en todas las ventanas
const windows = document.querySelectorAll('.window');
windows.forEach(makeDraggable);
