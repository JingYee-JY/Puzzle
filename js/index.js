import  * as Game from "./game.js";

window.onload = init;

const mainMenuScreen = document.getElementById("main_screen"),
gameScreen = document.getElementById("game_screen");


function init(){
    const startButton = document.getElementById("start_button");
    
    
        console.log(startButton, mainMenuScreen)
        startButton.ontouchstart = startGame;
        startButton.onclick = startGame;
}


function startGame()
{
    mainMenuScreen.classList.add("hide");
    gameScreen.classList.remove("hide")
    Game.initGrid();
    Game.generateRandomTile();

}


document.addEventListener('dblclick', function(event) {
    event.preventDefault();
}, { passive: false });
