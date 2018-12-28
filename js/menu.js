const Menu = new (function() {
const MENU_ROW0 = 150;
const MENU_ROW1 = 300;
const MENU_ROW2 = 500;

let menuColumnPos = [250, 300, 350, 400, 450];

let wobble = 10;
let wobbleSpeed = 0.25;
let cursor1 = 0;
let cursor2 = 0;

//-----BEGIN GLOBAL SETTINGS-----//
let classIndexP1 = 0;
let classIndexP2 = 0;
let rightHandIndexP1 = 0;
let rightHandIndexP2 = 0;
let leftHandIndexP1 = 0;
let leftHandIndexP2 = 0;
let controlIndexP1 = 0;
let controlIndexP2 = 0;

let classListGame = ["New Game", "Continue", "Choose Level"];
const CLASS_NEWGAME = 0;
const CLASS_CONTINUE = 1;
const CLASS_LEVELS= 2;


let classListLevels = ["Level 1", "Level 2", "Level 3"];
const CLASS_LEVEL1 = 0;
const CLASS_LEVEL2 = 1;
const CLASS_LEVEL3 = 2;


let classListSettings = ["Volume", "Speed", "Controls"];
const CLASS_VOLUME = 0;
const CLASS_SPEED = 1;
const CLASS_CONTROLS = 2;

let classListHelp= ["Layout", "How to play", "Shopping"];
const CLASS_VOLUME = 0;
const CLASS_SPEED = 1;
const CLASS_CONTROLS = 2;


const MENU_CLASS = 0;
const MENU_HAND_RIGHT = 1;
const MENU_HAND_LEFT = 2;
const MENU_CONTROL = 3;
const MENU_NUM = 4;
//-----END GLOBAL SETTINGS-----//

this.draw = function() {
    console.log("menu Started");
    drawImage(gameContext, Images.startMenu, 368, 240);

        //Wobble the cursors back and forth
    if (wobble > 13 || wobble < 9) {
      wobbleSpeed *= -1;
    }
    wobble += wobbleSpeed;

        //Draw menu options
    drawText(gameContext,MENU_ROW1, menuColumnPos[0],FONT_COLOR, UNITS_FONT, 'left', 'middle',"Play:");
    drawText(gameContext,MENU_ROW2, menuColumnPos[0],FONT_COLOR, UNITS_FONT, 'left', 'middle',classListGame[classListGame] );

    drawText(gameContext,MENU_ROW1, menuColumnPos[1],FONT_COLOR, UNITS_FONT, 'left', 'middle',"Settings:");
    drawText(gameContext,MENU_ROW2, menuColumnPos[1],FONT_COLOR, UNITS_FONT, 'left', 'middle',classListSettings[classListSettings] );

    drawText(gameContext,MENU_ROW1, menuColumnPos[2],FONT_COLOR, UNITS_FONT, 'left', 'middle',"Help:");
    drawText(gameContext,MENU_ROW2, menuColumnPos[2],leftHandListP1[leftHandIndexP1] );

    drawText(gameContext,MENU_ROW1, menuColumnPos[3],FONT_COLOR, UNITS_FONT, 'left', 'middle',"Credits:");
    drawText(gameContext,MENU_ROW2, menuColumnPos[3],leftHandListP2[leftHandIndexP2] );

        if(classIndexP1 != CLASS_P1_PALADIN){
            drawText(gameContext,MENU_ROW1, menuColumnPos[3],controlledByP1[controlIndexP1] );
        } else {
            drawText(gameContext,MENU_ROW1, menuColumnPos[3],controlledByP1Pali[controlIndexP1] );
        }
    drawText(gameContext,MENU_ROW2, menuColumnPos[3],controlledByP2[controlIndexP2] );
        
        //Display previous score only if both players have died
    
            drawText(gameContext,MENU_ROW0, menuColumnPos[4],FONT_COLOR, UNITS_FONT, 'left', 'middle',"1st Score :" );
        
        //Draw cursor
    drawImage(gameContext,Images.arrow,MENU_ROW1 -20 ,menuColumnPos[cursor1] - wobble);
 }
})(); 