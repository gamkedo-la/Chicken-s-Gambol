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
    let INDEX_PAGE=0

    let LEVELS_INDEX = 0;

    const MENU_PAGE = 0;
    const SETTINGS_PAGE = 1;
    const HELP_PAGE = 2;
    const CREDITS_PAGE = 3;
    const LEVELS_PAGE = 4;
//-----END GLOBAL SETTINGS-----//
this.cycle = function (INDEX_PAGE) {
    switch(cursor1) {
        case MENU_PAGE:
            INDEX=classListMenu[cursor1];
            if (INDEX >= MENU_NUM) {
                INDEX = 0;
            }
            else if (INDEX < 0) {
                INDEX = MENU_NUM-1;
            }
            break;

        case SETTINGS_PAGE:
            INDEX=classListSettings[cursor1];
            if (INDEX >= MENU_NUM) {
                INDEX = 0;
            }
            else if (INDEX < 0) {
                INDEX = NUM-1;
            }
            break;

        case HELP_PAGE:
            INDEX=classListHelp[cursor1];
            if (INDEX >= MENU_NUM) {
                INDEX = 0;
            }
            else if (INDEX < 0) {
                INDEX = MENU_NUM-1;
            }
            break;

        case LEVELS_PAGE:
            INDEX=classListLevels[cursor1];
            if (INDEX >= MENU_NUM) {
                INDEX = 0;
            }
            else if (INDEX < 0) {
                INDEX = MENU_NUM-1;
            }
            break;
     }
};           
this.checkState = function(){
    if (classListMenu[cursor1] === 0){
        gameIsStarted = true;
    }
    
}

this.update = function(){
            //Wobble the cursors back and forth
    if (wobble > 13 || wobble < 9) {
        wobbleSpeed *= -1;
    }
        wobble += wobbleSpeed;

    if (Input.isPressed(KEY.UP)) {
            cursor1--;
         if (Input.isDown(KEY.ENTER)) {
            this.cycle();
            this.cycle();
            this.checkState();
        }
            console.log("cursor UP", classListMenu[cursor1]);
    }      
    if (Input.isPressed(KEY.DOWN)) {
            cursor1++;
        if (Input.isDown(KEY.ENTER)) {
            this.cycle();
            this.cycle();
            this.checkState();
        }
            
        console.log("cursor DOWN", classListMenu[cursor1]);
    }      

    if (cursor1 >= MENU_NUM){
      cursor1 = MENU_NUM - 1;
      
    }
    else if (cursor1 < 0){
    cursor1 = 0;
    
    }

};
this.draw = function() {
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
        for (i=0; i<classListMenu[i]; i++){
    drawText(gameContext,MENU_ROW1, menuColumnPos[i],SHADOW_COLOR, SLIME_FONT, 'left', 'middle',classListMenu[i]);
        }

        //Display previous score
    drawText(gameContext,MENU_ROW0, menuColumnPos[4],FONT_COLOR, SLIME_FONT, 'left', 'middle',"Score: " );

        //Draw cursor
    drawImage(gameContext,Images.arrow,MENU_ROW1 -20 ,menuColumnPos[cursor1] - wobble + 8);
 };
})();
