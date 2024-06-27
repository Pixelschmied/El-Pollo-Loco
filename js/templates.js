function introOverlayHTML() {
    return /*html*/`
    <div id="introOverlay">
        <div id="leftUiBtn">
            <div>
                <button class="button" role="button" onclick="playGame()">PLAY</button>
            </div>
            <div class="button" role="button" onclick="showSettings()">
                <img id="settingsIcon" src="img/icons/controller.png" alt="">
            </div>
            <div class="button" role="button">
                <img id="speakerIcon" src="img/icons/speaker-on.png" alt="">
            </div>
        </div>
        <div id="rightUiBtn">
            <button class="button" id="infoBtn" role="button">INFO</button>
        </div>
        <img src="img/9_intro_outro_screens/start/startscreen_2.png" alt="">
    </div>`;
}

function settingsMenuHTML() {
    return /*html*/`
    <div id="settingsOverlay">
        <div id="backBtnMenu">
            <button class="button" role="button" onclick="showMainMenu()">BACK</button>
        </div>
        <div id="keyCapContainer">
            <div class="keyRows">
                <span class="keyCap"><p>A</p></span>
                <p class="keySeperator">or</p>
                <span class="keyCap"><p>←</p></span>
                <p class="keyAction">Move Left</p>
            </div>
            <div class="keyRows">
                <span class="keyCap"><p>D</p></span>
                <p class="keySeperator">or</p>
                <span class="keyCap"><p>→</p></span>
                <p class="keyAction">Move Right</p>
            </div>
            <div class="keyRows">
                <span class="keyCap"><p>W</p></span>
                <p class="keySeperator">or</p>
                <span class="keyCap"><p>↑</p></span>
                <p class="keySeperator">or</p>
                <span class="keyCap spacebarKeyCap"><p>Spacebar</p></span>
                <p class="keyAction">Jump</p>
            </div>
            <div class="keyRows">
                <span class="keyCap"><p>E</p></span>
                <p class="keyAction">Throw Bottle</p>
            </div>
        </div>  
        <span id="overlayFilter"></span>
        <img src="img/5_background/first_half_background.png" alt="">
    </div>`;
}