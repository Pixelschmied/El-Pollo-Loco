let canvas;
let canvasHeight = 540;
let canvasWidth = 960;
let world;
let keyboard = new Keyboard();
let lockedKeyE = false;

/**
 * Initialize the game.
 */
function initGame() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    addTouchListeners();
}

/**
 * Reset the game to its initial state.
 */
function resetGame() {
    clearAllIntervals();
    resetGameVariables();
    clearCanvas();
    clearOverlay();
    initGame();
    world.gameStarted = true;
}

/**
 * Clear all intervals.
 */
function clearAllIntervals() {
    let highestIntervalId = window.setInterval(() => {}, Number.MAX_SAFE_INTEGER);
    for (let i = 0; i <= highestIntervalId; i++) {
        window.clearInterval(i);
    }
}

/**
 * Reset game-related variables.
 */
function resetGameVariables() {
    world = null;
    DrawableObject.coinsPlaced = 0;
    DrawableObject.lastBottleLocation = 200;
    DrawableObject.bottleCount = 0;
    DrawableObject.coinCount = 0;
    Character.life = 5;
    Endboss.life = 5;
}

/**
 * Clear the canvas.
 */
function clearCanvas() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/**
 * Go back to the main menu overlay.
 */
function backToMenuOverlay() {
    resetGame();
    showMainMenu();
    world.gameStarted = false;
}

/**
 * Add event listeners for keyboard input.
 */
window.addEventListener('keydown', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);

/**
 * Handle key down events.
 * @param {KeyboardEvent} e - The keyboard event.
 */
function handleKeyDown(e) {
    if (!canvasOpened()) {
        switch (e.key) {
            case 'ArrowLeft':
            case 'a':
                keyboard.left = true;
                break;
            case 'ArrowRight':
            case 'd':
                keyboard.right = true;
                break;
            case 'ArrowUp':
            case 'w':
            case ' ':
                keyboard.up = true;
                break;
            case 'e':
                if (!lockedKeyE) {
                    keyboard.e = true;
                    lockedKeyE = true;
                    setTimeout(() => {
                        keyboard.e = false;
                    }, 100);
                }
                break;
        }
    }
}

/**
 * Handle key up events.
 * @param {KeyboardEvent} e - The keyboard event.
 */
function handleKeyUp(e) {
    switch (e.key) {
        case 'ArrowLeft':
        case 'a':
            keyboard.left = false;
            break;
        case 'ArrowRight':
        case 'd':
            keyboard.right = false;
            break;
        case 'ArrowUp':
        case 'w':
        case ' ':
            keyboard.up = false;
            break;
        case 'e':
            keyboard.e = false;
            lockedKeyE = false;
            break;
    }
}

/**
 * Add touch listeners for mobile input.
 */
function addTouchListeners() {
    addTouchListener("leftBtn", () => { keyboard.left = true; }, () => { keyboard.left = false; });
    addTouchListener("rightBtn", () => { keyboard.right = true; }, () => { keyboard.right = false; });
    addTouchListener("jumpBtn", () => { keyboard.up = true; }, () => { keyboard.up = false; });
    addTouchListener("throwBtn", () => { keyboard.e = true; }, () => { keyboard.e = false; });
}

/**
 * Add touch listener to a specific element.
 * @param {string} elementId - The ID of the element.
 * @param {Function} startCallback - The callback function for touchstart event.
 * @param {Function} endCallback - The callback function for touchend event.
 */
function addTouchListener(elementId, startCallback, endCallback) {
    const element = document.getElementById(elementId);
    if (!element) {
        console.error(`Element with ID ${elementId} not found`);
        return;
    }

    element.addEventListener('touchstart', event => {
        event.preventDefault();
        startCallback();
    });

    element.addEventListener('touchend', event => {
        event.preventDefault();
        endCallback();
    });
}
