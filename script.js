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
    updateTaskbar(); // Actualiza la barra de tareas
}

// Función para minimizar una ventana
function minimizeWindow(windowId) {
    const windowElement = document.getElementById(windowId);
    windowElement.classList.add('minimized');
    windowElement.classList.add('hidden'); // Oculta la ventana
    bringToFront(windowElement);
    updateTaskbar(); // Actualiza la barra de tareas
}

// Función para restaurar una ventana minimizada
function restoreWindow(windowId) {
    const windowElement = document.getElementById(windowId);
    windowElement.classList.remove('minimized');
    windowElement.classList.remove('hidden'); // Muestra la ventana
    bringToFront(windowElement);
    updateTaskbar(); // Actualiza la barra de tareas
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
    updateTaskbar(); // Actualiza la barra de tareas
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
    const existingButtons = taskbar.querySelectorAll('.minimized-button');
    
    // Elimina botones de minimización existentes
    existingButtons.forEach(button => button.remove());
    
    minimizedWindows.forEach(window => {
        const button = document.createElement('button');
        button.className = 'minimized-button';
        button.textContent = window.dataset.title;
        button.onclick = () => restoreWindow(window.id);
        taskbar.appendChild(button);
    });
}

// Inicializa las ventanas con eventos de arrastrar y soltar
document.querySelectorAll('.window').forEach(windowElement => {
    let offsetX, offsetY;

    // Aplica el evento a toda la ventana en lugar de solo a la barra de título
    windowElement.addEventListener('mousedown', (e) => {
        bringToFront(windowElement);
        offsetX = e.clientX - windowElement.getBoundingClientRect().left;
        offsetY = e.clientY - windowElement.getBoundingClientRect().top;

        // Mueve la ventana con el ratón
        const onMouseMove = (e) => {
            windowElement.style.left = `${e.clientX - offsetX}px`;
            windowElement.style.top = `${e.clientY - offsetY}px`;
        };

        // Detiene el movimiento de la ventana cuando se suelta el ratón
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', onMouseMove);
        }, { once: true });
    });
});
