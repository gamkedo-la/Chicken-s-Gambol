const Menu = new (function() {
  //-----BEGIN GLOBAL SETTINGS-----//
  let MENU_COLOR = "russet";
  let MENU_FONT = "24px compass";
  let MENU_ROW = [340, 335, 335, 340, 340];
  let menuColumnPos = [260, 300, 340, 380, 420];
  let mouseColumnPos = [260, 300, 340, 380, 420];

  let wobble = 10;
  let wobbleSpeed = 0.25;
  let cursor1 = 0;
  let currentPage = 0;

  let classListMenu = ["Play", "Options", "Help", "Credits"];
  let classListLevels = [];
  let classListSettings = ["Sounds", "Music", "Back"];
  let classListHelp = ["How to play", "Control layout", "Back"];
  let classListCredits = ['Caspar Dunant', "Back"];

  let classListPause = ["Continue", "Save", "Quit"];

  const MENU_PAGE = 0;
  const LEVELS_PAGE = 1;
  const SETTINGS_PAGE = 2;
  const HELP_PAGE = 3;
  const CREDITS_PAGE = 4;

  let menuPageText = [
    classListMenu,
    classListLevels,
    classListSettings,
    classListHelp,
    classListCredits
  ];

  let pausePageText = [classListPause];
//-----END GLOBAL SETTINGS-----//

  this.initialize = function() {
    let length = levels.length;

    for (let i = 0; i < length; i++) {
      classListLevels.push(levels[i].name);
    }

    classListLevels.push('Back');
  };

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
    switch (menuPageText[currentPage][cursor1]) {
      case "Play":
        currentPage = LEVELS_PAGE;
        cursor1 = 0;
        break;
      case "Options":
        currentPage = SETTINGS_PAGE;
        cursor1 = 0;
        break;
      case "Help":
        currentPage = HELP_PAGE;
        cursor1 = 0;
        break;
      case "Credits":
        currentPage = CREDITS_PAGE;
        cursor1 = 0;
        break;

      case "Sounds":
        console.log("TODO implement sounds change");
        break;
      case "Music":
        console.log("TODO implement music change");
        break;

      case "How to play":
        //Handle help screen differently;
        console.log("TODO implement how to play");
        break;
      case "Control layout":
        //Handle Control layout screen differently;
        console.log("TODO implement control layout");
        break;
      case "Back":
        currentPage = MENU_PAGE;
        cursor1 = 0;
        break;
      default:
        if (currentPage === LEVELS_PAGE) {
          gameInitialize(cursor1);
        }
        break;
    }
  };

  this.draw = function() {
    drawImage(gameContext, Images.startMenu, 368, 240);
    drawTextWithShadow(gameContext, 240, 40, FONT_COLOR, MENU_FONT, 'left', 'middle', "Chickens Gambol");

    for (let i = 0; i < menuPageText[currentPage].length; i++) {
      drawTextWithShadow(gameContext, MENU_ROW[i], menuColumnPos[i], MENU_COLOR, SLIME_FONT, 'left', 'middle', menuPageText[currentPage][i]);
    }

    //Display previous score
    //drawText(gameContext,MENU_ROW0, menuColumnPos[4],FONT_COLOR, SLIME_FONT, 'left', 'middle',"Score: " );

    //Draw cursor
    drawImage(gameContext, Images.menuCursor, MENU_ROW[0] - 20, menuColumnPos[cursor1] - wobble + 8);
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
