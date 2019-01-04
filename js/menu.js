const Menu = new (function() {
    //-----BEGIN GLOBAL SETTINGS-----//
    let MENU_ROW = [340, 330, 340, 333];
    let menuColumnPos = [250, 300, 350, 400];

    let wobble = 10;
    let wobbleSpeed = 0.25;
    let cursor1 = 0;
    let cursor2 = 0;
    let currentPage = 0;

    let classListMenu = ["Play", "Settings", "Help" , "Credits"];
    let classListGame = ["New Game", "Continue", "Select Chapter", "Back"];
    let classListLevels = ["Chapter 1", "Chapter 2", "Chapter 3", "Back"];
    let classListSettings = ["Volume", "Controls","Back"];
    let classListHelp= ["How to play", "Control layout", "", "Back"];
    let classListCredits= ['Caspar Dunant' , "Back"];


    const MENU_PAGE = 0;
    const SETTINGS_PAGE = 1;
    const HELP_PAGE = 2;
    const CREDITS_PAGE = 3;
    const LEVELS_PAGE = 4;

    let menuPageText = [classListMenu, classListSettings, classListHelp, classListCredits, classListLevels];
//-----END GLOBAL SETTINGS-----//

this.update = function(){
     //Wobble the cursors back and forth
    if (wobble > 13 || wobble < 9) {
        wobbleSpeed *= -1;
    }
        wobble += wobbleSpeed;

    if (Input.isPressed(KEY.SPACE) || Input.isPressed(KEY.ENTER)) {
            this.checkState();
        }

    if (Input.isPressed(KEY.UP)) {
        cursor1--;
        if (cursor1 < 0){
            cursor1 = 0;
        }
    }     
    if (Input.isPressed(KEY.DOWN)) {
        cursor1++;
        if (cursor1 >= menuPageText[currentPage].length){
            cursor1 = menuPageText[currentPage].length - 1;
        }
    }
};

this.checkState = function(){
    if (menuPageText[currentPage][cursor1] === "Play"){
        gameIsStarted = true;
    }  
    if (menuPageText[currentPage][cursor1] === "Settings"){
        currentPage = SETTINGS_PAGE; 
    } 
    if (menuPageText[currentPage][cursor1] === "Help"){
        currentPage  = HELP_PAGE;
    } 
    if (menuPageText[currentPage][cursor1] === "Credits"){
        currentPage  = CREDITS_PAGE;    
    } 

    if (menuPageText[currentPage][cursor1] === "Volume"){
        console.log("TODO implement volume change");   
    } 
    if (menuPageText[currentPage][cursor1] === "Controls"){ 
        console.log("TODO Added Controls change"); 
    }

    if (menuPageText[currentPage][cursor1] === "How to play"){ 
        //Handle help screen differently;
    }  
    if (menuPageText[currentPage][cursor1] === "Control layout"){
        //Handle Control layout screen differently;
    }
    if (menuPageText[currentPage][cursor1] === "Back"){
        currentPage  = MENU_PAGE;
    }  

    if (cursor1 >= menuPageText[currentPage].length){//if we're going to shorter menu
        cursor1 = menuPageText[currentPage].length - 1;
    }
}


this.draw = function() {
    drawImage(gameContext, Images.startMenu, 368, 240);
    drawText(gameContext,260, 40,FONT_COLOR, SLIME_FONT, 'left', 'middle',"Chickens Gambol");
    drawText(gameContext,263, 40,SHADOW_COLOR, SLIME_FONT, 'left', 'middle',"Chickens Gambol");

    for (let i=0; i<menuPageText[currentPage].length; i++){
     drawText(gameContext,MENU_ROW[i], menuColumnPos[i],SHADOW_COLOR, SLIME_FONT, 'left', 'middle',menuPageText[currentPage][i]); 
    }
     /*   //Draw menu options
    drawText(gameContext,MENU_ROW1, menuColumnPos[0],SHADOW_COLOR, SLIME_FONT, 'left', 'middle',"Play");
    drawText(gameContext,MENU_ROW1, menuColumnPos[1],SHADOW_COLOR, SLIME_FONT, 'left', 'middle',"Settings");
    drawText(gameContext,MENU_ROW1, menuColumnPos[2],SHADOW_COLOR, SLIME_FONT, 'left', 'middle',"Help");
    drawText(gameContext,MENU_ROW1, menuColumnPos[3],SHADOW_COLOR, SLIME_FONT, 'left', 'middle',"Credits");

        //Display previous score
    drawText(gameContext,MENU_ROW0, menuColumnPos[4],FONT_COLOR, SLIME_FONT, 'left', 'middle',"Score: " );
    */
        //Draw cursor
    drawImage(gameContext,Images.arrow,MENU_ROW[0]-20 ,menuColumnPos[cursor1] - wobble + 8);
 };


})();
