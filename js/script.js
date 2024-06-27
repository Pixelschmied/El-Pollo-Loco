function init() {
    showMainMenu();
    initGame();
}

function playGame() {
    let introOverlay = document.getElementById('introOverlay');
    if (introOverlay) {
        introOverlay.classList.add('dNone');
    }
}

function showSettings() {
    let introOverlay = document.getElementById('introOverlay');
    if (introOverlay) {
        introOverlay.classList.add('dNone');
    }
    let overlayContainer = document.getElementById('canvasOverlay');
    overlayContainer.innerHTML = settingsMenuHTML();
}

function showMainMenu() {
    let overlayContainer = document.getElementById('canvasOverlay');
    overlayContainer.innerHTML = introOverlayHTML();
}