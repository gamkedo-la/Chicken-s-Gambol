const Menu = (function() {
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

let classListP1 = ["New Game", "Load", "Save"];
const CLASS_P1_WARRIOR = 0;
const CLASS_P1_BERSERKER = 1;
const CLASS_P1_PALADIN = 2;
const CLASS_P1_NUM = 3;

let classListP2 = ["Level 1", "Level 2", "Level 3"];
const CLASS_P2_ROGUE = 0;
const CLASS_P2_ASSASSIN = 1;
const CLASS_P2_MAGE = 2;
const CLASS_P2_NUM = 3;

let rightHandListP1 = ["Spear", "Sword", "Vampire Axe"];
const RIGHT_P1_SPEAR = 0;
const RIGHT_P1_SWORD = 1;
const RIGHT_P1_AXE = 2;
const RIGHT_P1_NUM = 3;

let rightHandListP2 = ["Bow", "Fire Staff", "Dagger"];
const RIGHT_P2_BOW = 0;
const RIGHT_P2_STAFF = 1;
const RIGHT_P2_DAGGER = 2;
const RIGHT_P2_NUM = 3;

let leftHandListP1 = ["Shield", "Throwing Axe", "Horn"];
const LEFT_P1_SHIELD = 0;
const LEFT_P1_AXE = 1;
const LEFT_P1_HORN = 2;
const LEFT_P1_NUM = 3;

let leftHandListP2 = ["Grapple Hook", "Shurikens", "Healing Scroll"];
const LEFT_P2_HOOK = 0;
const LEFT_P2_SHURIKENS = 1;
const LEFT_P2_SCROLL = 2;
const LEFT_P2_NUM = 3;

let controlledByP1 = ["WASD / YU / Space", "AI Controlled", "None"];
let controlledByP1Pali = ["WASD / YU", "AI Controlled", "None"];
let controlledByP2 = ["Arrows / Mouse", "AI Controlled", "None"];
const CONTROL_HUMAN = 0;
const CONTROL_AI = 1;
const CONTROL_NONE = 2;
const CONTROL_NUM = 3;

const MENU_CLASS = 0;
const MENU_HAND_RIGHT = 1;
const MENU_HAND_LEFT = 2;
const MENU_CONTROL = 3;
const MENU_NUM = 4;
//-----END GLOBAL SETTINGS-----//

this.draw = function() {
    drawImage(gameContext, Images.startMenu, 0, 0);

        //Wobble the cursors back and forth
    if (wobble > 13 || wobble < 9) {
      wobbleSpeed *= -1;
    }
    wobble += wobbleSpeed;
        
        //Draw menu collumn titles
    drawText(gameContext,"1P" ,MENU_ROW1, 220);
    drawText(gameContext,"CPU" ,MENU_ROW2, 220);
        
        //Draw menu options
    drawText(gameContext,"Play:" ,MENU_ROW0, menuColumnPos[0]);
    drawText(gameContext,classListP1[classIndexP1] ,MENU_ROW1, menuColumnPos[0]);
    drawText(gameContext,classListP2[classIndexP2] ,MENU_ROW2, menuColumnPos[0]);
    drawText(gameContext,"Settings:" ,MENU_ROW0, menuColumnPos[1]);
    drawText(gameContext,rightHandListP1[rightHandIndexP1] ,MENU_ROW1, menuColumnPos[1]);
    drawText(gameContext,rightHandListP2[rightHandIndexP2] ,MENU_ROW2, menuColumnPos[1]);
    drawText(gameContext,"Help:" ,MENU_ROW0, menuColumnPos[2]);
    drawText(gameContext,leftHandListP1[leftHandIndexP1] ,MENU_ROW1, menuColumnPos[2]);
    drawText(gameContext,leftHandListP2[leftHandIndexP2] ,MENU_ROW2, menuColumnPos[2]);
    drawText(gameContext,"Credits:" ,MENU_ROW0, menuColumnPos[3]);
        if(classIndexP1 != CLASS_P1_PALADIN){
            drawText(gameContext,controlledByP1[controlIndexP1] ,MENU_ROW1, menuColumnPos[3]);
        } else {
            drawText(gameContext,controlledByP1Pali[controlIndexP1] ,MENU_ROW1, menuColumnPos[3]);
        }
    drawText(gameContext,controlledByP2[controlIndexP2] ,MENU_ROW2, menuColumnPos[3]);
        
        //Display previous score only if both players have died
    
            drawText(gameContext,"1st Score :" ,MENU_ROW0, menuColumnPos[4]);
            drawText(gameContext,"2nd Score:", MENU_ROW1, menuColumnPos[4]);
            drawText(gameContext,"3rd Score:", MENU_ROW2, menuColumnPos[4]);
        
        
        //Draw cursor
    drawImage(gameContext,Images.chicken,MENU_ROW1 -20 ,menuColumnPos[cursor1] - wobble);
   drawImage(gameContext,Images.chicken,MENU_ROW2 -20 ,menuColumnPos[cursor2] - wobble);
 }
})(); 