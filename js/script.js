let soundMuted = false;
let openedBefore = false;
const buttonClickSound = new Audio('assets/audio/ui/buttonclick2.mp3');
const backgroundMusic = new Audio('assets/audio/music/music.mp3');
backgroundMusic.loop = true;
backgroundMusic.volume = 0.5;

/**
 * Initialize the application.
 */
function init() {
    setSoundSettings();
    showMainMenu();
    initGame();
}

/**
 * Set the sound settings based on local storage.
 */
function setSoundSettings() {
    const soundMutedStorage = localStorage.getItem('soundMuted');
    if (soundMutedStorage) {
        soundMuted = JSON.parse(soundMutedStorage);
    }
}

/**
 * Start the game.
 */
function playGame() {
    playButtonClickSound();
    world.gameStarted = true;
    backgroundMusic.volume = 0.1;
    clearOverlay();
}

/**
 * Show the settings menu.
 */
function showSettings() {
    playButtonClickSound();
    hideElementById('introOverlay');
    setOverlayContent('canvasOverlay', settingsMenuHTML());
}

/**
 * Show the lose overlay.
 */
function showLoseOverlay() {
    setOverlayContent('canvasOverlay', loseOverlayHTML());
}

/**
 * Show the win overlay.
 */
function showWinOverlay() {
    setOverlayContent('canvasOverlay', winOverlayHTML());
}

/**
 * Clear the overlay.
 */
function clearOverlay() {
    gameStarted = true;
    setOverlayContent('canvasOverlay', '');
}

/**
 * Check if the canvas overlay is opened.
 * @returns {boolean} True if the canvas overlay is opened, otherwise false.
 */
function canvasOpened() {
    const overlayContainer = document.getElementById('canvasOverlay');
    return overlayContainer.innerHTML.trim() !== '';
}

/**
 * Show the main menu.
 */
function showMainMenu() {
    if (world) {
        world.gameStarted = true;
    }
    backgroundMusic.volume = 0.2;
    playBackgroundMusic();
    if (openedBefore) {
        playButtonClickSound();
    }
    setOverlayContent('canvasOverlay', introOverlayHTML());
    if (soundMuted) {
        setSpeakerIcon('speakerIcon', 'assets/images/hud/speakerOff.png');
    }
    openedBefore = true;
}

/**
 * Toggle the sound on and off.
 */
function toggleSound() {
    let speakerIcon = document.getElementById('speakerIcon');
    playButtonClickSound(true);
    if (soundMuted) {
        backgroundMusic.play();
        speakerIcon.src = 'assets/images/hud/speakerOn.png';
        soundMuted = false;
        localStorage.setItem('soundMuted', JSON.stringify(soundMuted));
    } else {
        backgroundMusic.pause();
        speakerIcon.src = 'assets/images/hud/speakerOff.png';
        soundMuted = true;
        localStorage.setItem('soundMuted', JSON.stringify(soundMuted));
    }
}

/**
 * Play the button click sound.
 * @param {boolean} [forcePlay=false] - Force play the sound even if muted.
 */
function playButtonClickSound(forcePlay = false) {
    if (forcePlay || !soundMuted) {
        buttonClickSound.volume = 0.5;
        buttonClickSound.currentTime = 0;
        buttonClickSound.play();
    }
}

/**
 * Play the background music if not muted.
 */
function playBackgroundMusic() {
    if (!soundMuted) {
        backgroundMusic.play();
    }
}

/**
 * Check if an element exists by its ID.
 * @param {string} id - The ID of the element.
 * @returns {boolean} True if the element exists, otherwise false.
 */
function checkIfElementExists(id) {
    const element = document.getElementById(id);
    return element !== null;
}

/**
 * Set the application to fullscreen.
 */
function fullscreen() {
    const el = document.getElementById('canvas');
    if (el.webkitRequestFullScreen) {
        el.webkitRequestFullScreen();
    } else {
        el.mozRequestFullScreen();
    }
}

/**
 * Hide an element by its ID.
 * @param {string} id - The ID of the element.
 */
function hideElementById(id) {
    const element = document.getElementById(id);
    if (element) {
        element.classList.add('dNone');
    }
}

/**
 * Set the content of an overlay container.
 * @param {string} containerId - The ID of the overlay container.
 * @param {string} content - The HTML content to set.
 */
function setOverlayContent(containerId, content) {
    const overlayContainer = document.getElementById(containerId);
    if (overlayContainer) {
        overlayContainer.innerHTML = content;
    }
}

/**
 * Set the speaker icon.
 * @param {string} elementId - The ID of the speaker icon element.
 * @param {string} src - The source of the new icon image.
 */
function setSpeakerIcon(elementId, src) {
    const speakerIcon = document.getElementById(elementId);
    if (speakerIcon) {
        speakerIcon.src = src;
    }
}

/**
 * Enable the sound.
 * @param {HTMLElement} speakerIcon - The speaker icon element.
 */
function enableSound(speakerIcon) {
    backgroundMusic.play();
    setSpeakerIconSrc(speakerIcon, 'assets/images/hud/speakerOn.png');
    soundMuted = false;
    localStorage.setItem('soundMuted', JSON.stringify(soundMuted));
}

/**
 * Disable the sound.
 * @param {HTMLElement} speakerIcon - The speaker icon element.
 */
function disableSound(speakerIcon) {
    backgroundMusic.pause();
    setSpeakerIconSrc(speakerIcon, 'assets/images/hud/speakerOff.png');
    soundMuted = true;
    localStorage.setItem('soundMuted', JSON.stringify(soundMuted));
}

/**
 * Set the source of the speaker icon.
 * @param {HTMLElement} speakerIcon - The speaker icon element.
 * @param {string} src - The source of the new icon image.
 */
function setSpeakerIconSrc(speakerIcon, src) {
    if (speakerIcon) {
        speakerIcon.src = src;
    }
}
