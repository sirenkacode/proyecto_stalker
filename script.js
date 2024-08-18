// script.js

function checkPassword() {
    var password = document.getElementById('password').value;
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
