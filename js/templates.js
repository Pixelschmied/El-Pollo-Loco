/**
 * Generate HTML for the intro overlay.
 * @returns {string} The HTML string for the intro overlay.
 */
function introOverlayHTML() {
    return /*html*/`
    <div id="introOverlay">
        <div id="leftUiBtn">
            <div>
                <button class="button" role="button" onclick="playGame()">PLAY</button>
            </div>
            <div class="button" role="button" onclick="showSettings()">
                <img id="settingsIcon" src="assets/images/hud/controller.png" alt="">
            </div>
            <div class="button" role="button" onclick="toggleSound()">
                <img id="speakerIcon" src="assets/images/hud/speakerOn.png" alt="">
            </div>
        </div>
        <img src="assets/images/hud/introScreen.png" alt=""> 
    </div>`;
}

/**
 * Generate HTML for the settings menu.
 * @returns {string} The HTML string for the settings menu.
 */
function settingsMenuHTML() {
    return /*html*/`
    <div id="settingsOverlay">
        <div id="backBtnMenu">
            <button class="button" role="button" onclick="showMainMenu()">BACK</button>
        </div>
        <div id="keyCapContainer">
            <div class="keyRows">
                <p class="keyAction">Move Left</p>
                <span class="keyCap"><p>A</p></span>
                <p class="keySeperator">or</p>
                <span class="keyCap"><p>←</p></span>
            </div>
            <div class="keyRows">
                <p class="keyAction">Move Right</p>
                <span class="keyCap"><p>D</p></span>
                <p class="keySeperator">or</p>
                <span class="keyCap"><p>→</p></span>
            </div>
            <div class="keyRows">
                <p class="keyAction">Jump</p>
                <span class="keyCap"><p>W</p></span>
                <p class="keySeperator">or</p>
                <span class="keyCap"><p>↑</p></span>
                <p class="keySeperator">or</p>
                <span class="keyCap spacebarKeyCap"><p>Spacebar</p></span>
            </div>
            <div class="keyRows">
                <p class="keyAction">Throw Bottle</p>
                <span class="keyCap"><p>E</p></span>
            </div>
        </div>  
        <span id="overlayFilter"></span>
        <img src="assets/images/background/menuBackground.png" alt="">
    </div>`;
}

/**
 * Generate HTML for the lose overlay.
 * @returns {string} The HTML string for the lose overlay.
 */
function loseOverlayHTML() {
    return /*html*/`
    <div id="loseOverlay">
        <div id="loseTitleContainer">
            <h1 id="titleShadow" aria-hidden="true">GAME OVER</h1>
            <h1 id="pageTitle">GAME OVER</h1>
        </div>
        <div id="loseOverlayButtons">
            <button class="button" role="button" onclick="resetGame()">TRY AGAIN</button>
            <button class="button" role="button" onclick="backToMenuOverlay()">BACK TO MENU</button>
        </div>
    </div>`;
}

/**
 * Generate HTML for the win overlay.
 * @returns {string} The HTML string for the win overlay.
 */
function winOverlayHTML() {
    return /*html*/`
    <div id="winOverlay">
        <div id="winTitleContainer">
            <h1 id="titleShadow" aria-hidden="true">YOU WON</h1>
            <h1 id="pageTitle">YOU WON</h1>
        </div>
        <div id="loseOverlayButtons">
            <button class="button" role="button" onclick="resetGame()">PLAY AGAIN</button>
            <button class="button" role="button" onclick="backToMenuOverlay()">BACK TO MENU</button>
        </div>
    </div>`;
}
