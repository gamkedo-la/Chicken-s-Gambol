const Menu = new (function() {
  //-----BEGIN GLOBAL SETTINGS-----//
  let MENU_COLOR = "russet";
  let MENU_FONT = "24px Monaco";
  let MENU_ROW = [340, 335, 335, 340, 340];
  let menuColumnPos = [260, 300, 340, 380, 420];
  let mouseColumnPos = [260, 300, 340, 380, 420];

  let wobble = 10;
  let wobbleSpeed = 0.25;
  let cursor1 = 0;
  let currentPage = 0;

  let classListMenu = ["Play", "Load", "Options", "Help", "Credits"];
  let classListResume = ["Load game", "Select Level", "Back"];
  let classListLevels = ["Level 1", "Level 2", "Level 3", "Back"];
  let classListSettings = ["Volume", "Controls", "Back"];
  let classListHelp = ["How to play", "Control layout", "Back"];
  let classListCredits = ['Caspar Dunant', "Back"];

  let classListPause = ["Continue", "Save", "Quit"];

  const MENU_PAGE = 0;
  const LOAD_PAGE = 1;
  const SETTINGS_PAGE = 2;
  const HELP_PAGE = 3;
  const CREDITS_PAGE = 4;
  //const LEVELS_PAGE = 5;

  let menuPageText = [
    classListMenu,
    classListResume,
    classListSettings,
    classListHelp,
    classListCredits,
    classListLevels
  ];

let pausePageText = [classListPause];
//-----END GLOBAL SETTINGS-----//

  this.update = function() {
    if (Input.isPressed(KEY.SPACE) || Input.isPressed(KEY.ENTER)) {
      this.checkState();
    }

    if (Input.isPressed(KEY.UP)) {
      cursor1--;
      if (cursor1 < 0) {
        cursor1 = menuPageText[currentPage].length - 1;
      }
    }
    if (Input.isPressed(KEY.DOWN)) {
      cursor1++;
      if (cursor1 >= menuPageText[currentPage].length) {
        cursor1 = 0;
      }
    }
  };

  this.checkState = function() {
    if (menuPageText[currentPage][cursor1] === "Play") {
      gameIsStarted = true;
    }
    if (menuPageText[currentPage][cursor1] === "Load") {
      currentPage = LOAD_PAGE;
      cursor1 = 0;
    }
    if (menuPageText[currentPage][cursor1] === "Options") {
      currentPage = SETTINGS_PAGE;
      cursor1 = 0;
    }
    if (menuPageText[currentPage][cursor1] === "Help") {
      currentPage = HELP_PAGE;
      cursor1 = 0;
    }
    if (menuPageText[currentPage][cursor1] === "Credits") {
      currentPage = CREDITS_PAGE;
      cursor1 = 0;
    }

    if (menuPageText[currentPage][cursor1] === "Volume") {
      console.log("TODO implement volume change");
    }
    if (menuPageText[currentPage][cursor1] === "Controls") {
      console.log("TODO Added Controls change");
    }

    if (menuPageText[currentPage][cursor1] === "How to play") {
      //Handle help screen differently;
    }
    if (menuPageText[currentPage][cursor1] === "Control layout") {
      //Handle Control layout screen differently;
    }
    if (menuPageText[currentPage][cursor1] === "Back") {
      currentPage = MENU_PAGE;
      cursor1 = 0;
    }

    if (cursor1 >= menuPageText[currentPage].length) {//if we're going to shorter menu
      cursor1 = menuPageText[currentPage].length - 1;
    }
  };


  this.draw = function() {
    drawImage(gameContext, Images.startMenu, 368, 240);
    drawText(gameContext, 240, 40, FONT_COLOR, MENU_FONT, 'left', 'middle', "Chickens Gambol");
    drawText(gameContext, 243, 40, SHADOW_COLOR, MENU_FONT, 'left', 'middle', "Chickens Gambol");

    for (let i = 0; i < menuPageText[currentPage].length; i++) {
      drawText(gameContext, MENU_ROW[i], menuColumnPos[i], MENU_COLOR, SLIME_FONT, 'left', 'middle', menuPageText[currentPage][i]);
    }
    
       //Display previous score
   //drawText(gameContext,MENU_ROW0, menuColumnPos[4],FONT_COLOR, SLIME_FONT, 'left', 'middle',"Score: " );

    //Draw cursor
    drawImage(gameContext, Images.pig, MENU_ROW[0] - 20, menuColumnPos[cursor1] - wobble + 8);
    //Wobble the cursors back and forth
    if (wobble > 13 || wobble < 9) {
      wobbleSpeed *= -1;
    }
    wobble += wobbleSpeed;

  };

this.pauseScreen = function() {
    
    for (let i = 0; i < pausePageText[currentPage].length; i++) {
      drawText(gameContext, MENU_ROW[i], menuColumnPos[i], SHADOW_COLOR, SLIME_FONT, 'left', 'middle', pausePageText[currentPage][i]);
    }    
  };
})();
