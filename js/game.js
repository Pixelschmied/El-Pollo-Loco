let canvas;
let canvasHeight = 540;
let canvasWidth = 960;
let world;
let keyboard = new Keyboard();
let lockedKeyE = false;

function initGame() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    addTouchListeners();
}

// KEYBOARD INPUT
window.addEventListener('keydown', (e) => {
    if (e.key == 'ArrowLeft') {
        keyboard.LEFT = true;
    }
    if (e.key == 'ArrowRight') {
        keyboard.RIGHT = true;
    }
    if (e.key == 'ArrowUp') {
        keyboard.UP = true;
    }
    if (e.key == 'a') {
        keyboard.LEFT = true;
    }
    if (e.key == 'd') {
        keyboard.RIGHT = true;
    }
    if (e.key == 'w') {
        keyboard.UP = true;
    }
    if (e.key == ' ') {
        keyboard.UP = true;
    }
    if (e.key == 'e' && !lockedKeyE) {
        keyboard.E = true;
        lockedKeyE = true;
        setTimeout(() => {
            keyboard.E = false;
        }, 100);
    }
})

window.addEventListener('keyup', (e) => {
    if (e.key == 'ArrowLeft') {
        keyboard.LEFT = false;
    }
    if (e.key == 'ArrowRight') {
        keyboard.RIGHT = false;
    }
    if (e.key == 'ArrowUp') {
        keyboard.UP = false;
    }
    if (e.key == 'a') {
        keyboard.LEFT = false;
    }
    if (e.key == 'd') {
        keyboard.RIGHT = false;
    }
    if (e.key == 'w') {
        keyboard.UP = false;
    }
    if (e.key == ' ') {
        keyboard.UP = false;
    }
    if (e.key == 'e') {
        keyboard.E = false;
        lockedKeyE = false;
    }
})

// TOUCH INPUT
function addTouchListeners() {
    function addTouchListener(elementId, startCallback, endCallback) {
        const element = document.getElementById(elementId);
        if (!element) {
            console.error(`Element with ID ${elementId} not found`);
            return;
        }

        element.addEventListener('touchstart', (event) => {
            event.preventDefault(); // Verhindert das Standardverhalten beim Touch-Event
            console.log(`${elementId} touchstart`);
            startCallback();
        });

        element.addEventListener('touchend', (event) => {
            event.preventDefault(); // Verhindert das Standardverhalten beim Touch-Event
            console.log(`${elementId} touchend`);
            endCallback();
        });
    }

    addTouchListener("leftBtn", () => { keyboard.LEFT = true; }, () => { keyboard.LEFT = false; });
    addTouchListener("rightBtn", () => { keyboard.RIGHT = true; }, () => { keyboard.RIGHT = false; });
    addTouchListener("jumpBtn", () => { keyboard.UP = true; }, () => { keyboard.UP = false; });
    addTouchListener("throwBtn", () => { keyboard.E = true; }, () => { keyboard.E = false; });
}

// TOUCH INPUT
//addTouchListeners() {
//    const leftBtn = document.getElementById("leftBtn");
//    leftBtn.addEventListener('touchstart', () => {
//    keyboard.LEFT = true;
//    })
//    leftBtn.addEventListener('touchend', () => {
//        keyboard.LEFT = false;
//    })
//    
//    const rightBtn = document.getElementById("rightBtn");
//    rightBtn.addEventListener('touchstart', () => {
//        keyboard.RIGHT = true;
//    })
//    rightBtn.addEventListener('touchend', () => {
//        keyboard.RIGHT = false;
//    })
//    
//    const jumpBtn = document.getElementById("jumpBtn");
//    jumpBtn.addEventListener('touchstart', () => {
//        keyboard.UP = true;
//    })
//    jumpBtn.addEventListener('touchend', () => {
//        keyboard.UP = false;
//    })
//    
//    const throwBtn = document.getElementById("throwBtn");
//    throwBtn.addEventListener('touchstart', () => {
//        keyboard.E = true;
//    })
//    throwBtn.addEventListener('touchend', () => {
//        keyboard.E = false;
//    })

