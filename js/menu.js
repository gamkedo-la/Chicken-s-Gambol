const Menu = new (function() {
    let textFontFace = "30px consolas";
    let textColour = "white";
    let textAlign = "left";

const MENU_ROW0 = 150;
const MENU_ROW1 = 300;
const MENU_ROW2 = 500;

let menuColumnPos = [250, 300, 350, 400, 450];

let wobble = 10;
let wobbleSpeed = 0.25;
let cursor1 = 0;
let cursor2 = 0;

//-----BEGIN GLOBAL SETTINGS-----//


let classListMenu = ["Play", "Setting", "Help" , "Credits"];
const CLASS_PLAY = 0;
const CLASS_SETTINGS = 1;
const CLASS_HELP= 2;
const CLASS_CREDITS= 3;
const MENU_NUM = 4;

let classListGame = ["New Game+", "Continue", "Select Chapter"];
const CLASS_NEWGAME = 0;
const CLASS_CONTINUE = 1;
const CLASS_LEVELS= 2;
const GAME_NUM = 4;

let classListLevels = ["Chapter 1", "Chapter 2", "Chapter 3"];
const CLASS_LEVEL1 = 0;
const CLASS_LEVEL2 = 1;
const CLASS_LEVEL3 = 2;
const LEVELS_NUM = 4;

let classListSettings = ["Volume", "Speed", "Controls"];
const CLASS_VOLUME = 0;
const CLASS_SPEED = 1;
const CLASS_CONTROLS = 2;
const SETTINGS_NUM = 4;

let classListHelp= ["Layout", "How to play", "Shopping"];
const CLASS_LAYOUT = 0;
const CLASS_HOWTOPLAY = 1;
const CLASS_SHOPPING = 2;
const HELP_NUM = 4;

let classListCredits= ["Credits"];


let MENU_CLASS_INDEX = 0;
let SETTINGS_CLASS_INDEX = 0;
let HELP_CLASS_INDEX = 0;
let CREDITS_CLASS_INDEX = 0;

const MENU_CLASS = 0;
const SETTINGS_CLASS = 1;
const HELP_CLASS = 2;
const CREDITS_CLASS = 3;

//-----END GLOBAL SETTINGS-----//

this.draw = function() {
    console.log("menu Started");
    drawImage(gameContext, Images.startMenu, 368, 240);
    drawText(gameContext,260, 40,FONT_COLOR, SLIME_FONT, 'left', 'middle',"Chickens Gambol");
    drawText(gameContext,263, 40,SHADOW_COLOR, SLIME_FONT, 'left', 'middle',"Chickens Gambol");

        //Wobble the cursors back and forth
    if (wobble > 13 || wobble < 9) {
      wobbleSpeed *= -1;
    }
        wobble += wobbleSpeed;
        //Draw menu options
    drawText(gameContext,MENU_ROW1, menuColumnPos[0],SHADOW_COLOR, SLIME_FONT, 'left', 'middle',"Play");
    
    drawText(gameContext,MENU_ROW1, menuColumnPos[1],SHADOW_COLOR, SLIME_FONT, 'left', 'middle',"Settings");
    
    drawText(gameContext,MENU_ROW1, menuColumnPos[2],SHADOW_COLOR, SLIME_FONT, 'left', 'middle',"Help",classListHelp[classListHelp]);

    drawText(gameContext,MENU_ROW1, menuColumnPos[3],SHADOW_COLOR, SLIME_FONT, 'left', 'middle',"Credits",classListCredits[classListCredits]);


        //Display previous score only if  player has lost
    
    drawText(gameContext,MENU_ROW0, menuColumnPos[4],FONT_COLOR, SLIME_FONT, 'left', 'middle',"Score: " );
        
        //Draw cursor
    drawImage(gameContext,Images.arrow,MENU_ROW1 -20 ,menuColumnPos[cursor1] - wobble - 8);
 }



this.MenuCycle = function (inDir) {
    switch(cursor1) {
        case MENU_CLASS:
            MENU_CLASS_INDEX+=inDir;
            if (MENU_CLASS_Index >= MENU_NUM) {
                MENU_CLASS_Index = 0;
            }
            if (MENU_CLASS_Index < 0) {
                MENU_CLASS_Index = MENU_NUM-1;
            }
            break;

        case SETTINGS_CLASS:
            SETTINGS_CLASS_INDEX+=inDir;
            if (SETTINGS_CLASS_INDEX >= SETTINGS_NUM) {
                SETTINGS_CLASS_INDEX = 0;
            }
            if (SETTINGS_CLASS_INDEX < 0) {
                SETTINGS_CLASS_INDEX = SETTINGS_NUM-1;
            }
            break;

        case HELP_CLASS:
            HELP_CLASS_INDEX+=inDir;
            if (HELP_CLASS_INDEX >= HELP_NUM) {
                HELP_CLASS_INDEX = 0;
            }
            if (HELP_CLASS_INDEX < 0) {
                HELP_CLASS_INDEX = HELP_NUM-1;
            }
            break;

        case LEVELS_CLASS:
            LEVELS_CLASS_INDEX+=inDir;
            if (LEVELS_CLASS_INDEX >= LEVELS_NUM) {
                LEVELS_CLASS_INDEX = 0;
            }
            if (LEVELS_CLASS_INDEX < 0) {
                LEVELS_CLASS_INDEX = LEVELS_NUM-1;
            }
            break;
    }
}



this.update = function(){
    if(keysPressed(KEY_DOWN)) {
            cursor1+10;
            if ( cursor1>= MENU_NUM){
                 cursor1 = MENU_NUM-1;
            }
        }
    if(keysPressed(KEY_UP)) {
            if ( cursor1 > 0){
                cursor1 -10;
            }
        }
 }
    function keyPressed(evt) {
        keySet(evt, true);

        evt.preventDefault();
        }

    function keyReleased(evt) {
    keySet(evt, false);
    }


})(); 