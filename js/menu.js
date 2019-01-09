const Menu = new (function() {
  let itemsX = 340;
  let topItemY = 260;
  let itemsWidth = 300;
  let rowHeight = 40;

  let wobble = 12;
  let wobbleSpeed = 0.25;
  let cursor1 = 0;
  let currentPage = 0;
  let pointingAt = -1;

  let classListMenu = ["Play", "Options", "Help", "Credits"];
  let classListLevels = [];
  let classListSettings = ["Sounds", "Music", "Back"];
  let classListHelp = ["How to play", "Control layout", "Back"];
  let classListCredits = ['Caspar Dunant', "Back"];

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
    else if (pointingAt !== -1 && Input.isPressed(KEY.MOUSE_LEFT)) {
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

    pointingAt = -1;
    let mousePos = Input.getMousePosition();
    for (let i = 0; i < menuPageText[currentPage].length; i++) {
      if (pointIsInBox(mousePos, {x: itemsX, y: topItemY + rowHeight * i}, {x: itemsX + itemsWidth, y: topItemY + rowHeight * i + rowHeight})) {
        cursor1 = i;
        pointingAt = i;
      }
    }


    //Wobble the cursors back and forth
    if (wobble < 8 || 16 < wobble) {
      wobbleSpeed = -wobbleSpeed;
    }
    wobble += wobbleSpeed;
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
        console.log("TODO implement how to play");
        break;
      case "Control layout":
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

    gameContext.drawImage(Images.startMenu,0,0); // logo and main menu bg

    for (let i = 0; i < menuPageText[currentPage].length; i++) {
      drawTextWithShadow(gameContext, itemsX, topItemY + rowHeight * i, FONT_COLOR, SLIME_FONT, 'left', 'top', menuPageText[currentPage][i]);
    }

    drawImage(gameContext, Images.menuCursor, itemsX - 20, topItemY + (cursor1 * rowHeight) + wobble);
  };

})();
