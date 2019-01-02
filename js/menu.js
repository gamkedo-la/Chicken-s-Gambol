const Menu = new (function() {
    //-----BEGIN GLOBAL SETTINGS-----//
    const MENU_ROW0 = 150;
    const MENU_ROW1 = 300;
    const MENU_ROW2 = 500;

    let menuColumnPos = [250, 300, 350, 400];

    let wobble = 10;
    let wobbleSpeed = 0.25;
    let cursor1 = 0;
    let cursor2 = 0;

    let classListMenu = ["Play", "Setting", "Help" , "Credits"];
    let classListGame = ["New Game", "Continue", "Select Chapter", "etc"];
    let classListLevels = ["Chapter 1", "Chapter 2", "Chapter 3", "etc"];
    let classListSettings = ["Volume", "Speed", "Controls", "etc"];
    let classListHelp= ["How to play","Control layout", "Shopping", "etc"];
    let classListCredits= ["Credits"];

    const MENU_NUM = 4;

    let INDEX = 0;


    let LEVELS_CLASS_INDEX = 0;

    const MENU_CLASS = 0;
    const SETTINGS_CLASS = 1;
    const HELP_CLASS = 2;
    const CREDITS_CLASS = 3;
    const LEVELS_CLASS = 4;
//-----END GLOBAL SETTINGS-----//
this.Cycle = function (inDir) {
    switch(cursor1) {
        case MENU_CLASS:
            INDEX=classListMenu[cursor1];
            if (INDEX >= MENU_NUM) {
                INDEX = 0;
            }
            if (INDEX < 0) {
                INDEX = MENU_NUM-1;
            }
            break;

        case SETTINGS_CLASS:
            INDEX=classListSettings[cursor1];
            if (INDEX >= MENU_NUM) {
                INDEX = 0;
            }
            if (INDEX < 0) {
                INDEX = NUM-1;
            }
            break;

        case HELP_CLASS:
            INDEX=classListHelp[cursor1];
            if (INDEX >= MENU_NUM) {
                INDEX = 0;
            }
            if (INDEX < 0) {
                INDEX = MENU_NUM-1;
            }
            break;

        case LEVELS_CLASS:
            INDEX=classListLevels[cursor1];
            if (INDEX >= MENU_NUM) {
                INDEX = 0;
            }
            if (INDEX < 0) {
                INDEX = MENU_NUM-1;
            }
            break;
     }
};           


this.update = function(){
            //Wobble the cursors back and forth
    if (wobble > 13 || wobble < 9) {
      wobbleSpeed *= -1;
    }
        wobble += wobbleSpeed;

    if (Input.isPressed(KEY.UP)) {
        console.log("cursor UP", classListMenu[cursor1]);
            cursor1--;
    }       INDEX--;
    if (Input.isPressed(KEY.DOWN)) {
        console.log("cursor DOWN", classListMenu[cursor1]);
            cursor1++;
    }       INDEX++;

    if (cursor1 >= MENU_NUM){
      cursor1 = MENU_NUM - 1;
      INDEX = MENU_NUM - 1;
    }
    else if (cursor1 < 0){
    cursor1 = 0;
    INDEX =0;
    }

};
this.drawMenu = function() {
    drawImage(gameContext, Images.startMenu, 368, 240);
    drawText(gameContext,260, 40,FONT_COLOR, SLIME_FONT, 'left', 'middle',"Chickens Gambol");
    drawText(gameContext,263, 40,SHADOW_COLOR, SLIME_FONT, 'left', 'middle',"Chickens Gambol");

        //Draw menu options
    drawText(gameContext,MENU_ROW1, menuColumnPos[0],SHADOW_COLOR, SLIME_FONT, 'left', 'middle',"Play");
    drawText(gameContext,MENU_ROW1, menuColumnPos[1],SHADOW_COLOR, SLIME_FONT, 'left', 'middle',"Settings");
    drawText(gameContext,MENU_ROW1, menuColumnPos[2],SHADOW_COLOR, SLIME_FONT, 'left', 'middle',"Help");
    drawText(gameContext,MENU_ROW1, menuColumnPos[3],SHADOW_COLOR, SLIME_FONT, 'left', 'middle',"Credits");

        //Display previous score
    drawText(gameContext,MENU_ROW0, menuColumnPos[4],FONT_COLOR, SLIME_FONT, 'left', 'middle',"Score: " );

        //Draw cursor
    drawImage(gameContext,Images.arrow,MENU_ROW1 -20 ,menuColumnPos[cursor1] - wobble + 8);
 };

this.drawSettings = function() {
    drawImage(gameContext, Images.startMenu, 368, 240);
    drawText(gameContext,260, 40,FONT_COLOR, SLIME_FONT, 'left', 'middle',"Chickens Gambol");
    drawText(gameContext,263, 40,SHADOW_COLOR, SLIME_FONT, 'left', 'middle',"Chickens Gambol");

        //Draw menu options
    drawText(gameContext,MENU_ROW1, menuColumnPos[0],SHADOW_COLOR, SLIME_FONT, 'left', 'middle',"Volume");
    drawText(gameContext,MENU_ROW1, menuColumnPos[1],SHADOW_COLOR, SLIME_FONT, 'left', 'middle',"Speed");
    drawText(gameContext,MENU_ROW1, menuColumnPos[2],SHADOW_COLOR, SLIME_FONT, 'left', 'middle',"Controls");
    drawText(gameContext,MENU_ROW1, menuColumnPos[3],SHADOW_COLOR, SLIME_FONT, 'left', 'middle',"etc");

        //Display previous score
    drawText(gameContext,MENU_ROW0, menuColumnPos[4],FONT_COLOR, SLIME_FONT, 'left', 'middle',"Score: " );

        //Draw cursor
    drawImage(gameContext,Images.arrow,MENU_ROW1 -20 ,menuColumnPos[cursor1] - wobble + 8);
 };

 this.drawHelp = function() {
    drawImage(gameContext, Images.startMenu, 368, 240);
    drawText(gameContext,260, 40,FONT_COLOR, SLIME_FONT, 'left', 'middle',"Chickens Gambol");
    drawText(gameContext,263, 40,SHADOW_COLOR, SLIME_FONT, 'left', 'middle',"Chickens Gambol");

        //Draw menu options
    drawText(gameContext,MENU_ROW1, menuColumnPos[0],SHADOW_COLOR, SLIME_FONT, 'left', 'middle',"How to play");
    drawText(gameContext,MENU_ROW1, menuColumnPos[1],SHADOW_COLOR, SLIME_FONT, 'left', 'middle',"Control Layout");
    drawText(gameContext,MENU_ROW1, menuColumnPos[2],SHADOW_COLOR, SLIME_FONT, 'left', 'middle',"Help");
    drawText(gameContext,MENU_ROW1, menuColumnPos[3],SHADOW_COLOR, SLIME_FONT, 'left', 'middle',"Credits");

        //Display previous score
    drawText(gameContext,MENU_ROW0, menuColumnPos[4],FONT_COLOR, SLIME_FONT, 'left', 'middle',"Score: " );

        //Draw cursor
    drawImage(gameContext,Images.arrow,MENU_ROW1 -20 ,menuColumnPos[cursor1] - wobble + 8);
 };




this.drawCredits = function() {
    drawImage(gameContext, Images.startMenu, 368, 240);
    drawText(gameContext,260, 40,FONT_COLOR, SLIME_FONT, 'left', 'middle',"Chickens Gambol");
    drawText(gameContext,263, 40,SHADOW_COLOR, SLIME_FONT, 'left', 'middle',"Chickens Gambol");

        //Draw menu options
    drawText(gameContext,MENU_ROW1, menuColumnPos[0],SHADOW_COLOR, SLIME_FONT, 'left', 'middle',"Play");
    drawText(gameContext,MENU_ROW1, menuColumnPos[1],SHADOW_COLOR, SLIME_FONT, 'left', 'middle',"Settings");
    drawText(gameContext,MENU_ROW1, menuColumnPos[2],SHADOW_COLOR, SLIME_FONT, 'left', 'middle',"Help");
    drawText(gameContext,MENU_ROW1, menuColumnPos[3],SHADOW_COLOR, SLIME_FONT, 'left', 'middle',"Credits");

        //Display previous score
    drawText(gameContext,MENU_ROW0, menuColumnPos[4],FONT_COLOR, SLIME_FONT, 'left', 'middle',"Score: " );

        //Draw cursor
    drawImage(gameContext,Images.arrow,MENU_ROW1 -20 ,menuColumnPos[cursor1] - wobble + 8);
 };
})();
