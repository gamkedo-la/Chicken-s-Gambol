const MenuEditor = new (function() {
  let itemsX = 340;
  let topItemY = 260;
  let itemsWidth = 300;
  let rowHeight = 40;

  let wobble = 12;
  let wobbleSpeed = 0.25;
  let cursor1 = 0;
  let currentPage = 0;
  let pointingAt = -1;

  let classListMenu = ["Empty level", "Levels"];
  let classListLevels = [];

  const MENU_PAGE = 0;
  const LEVELS_PAGE = 1;

  let menuPageText = [
    classListMenu,
    classListLevels,
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
    else if (Input.isPressed(KEY.MOUSE_LEFT)) {
      if(pointingAt !== -1) {
        this.checkState();
      }
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
      case "Empty level":
        gameInitialize(-1);
        break;
      case "Levels":
        currentPage = LEVELS_PAGE;
        cursor1 = 0;
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
    gameContext.drawImage(Images.startMenu, 0, 0); // logo and main menu bg

    for (let i = 0; i < menuPageText[currentPage].length; i++) {
      drawTextWithShadow(gameContext, itemsX, topItemY + rowHeight * i, MENU_COLOR, MENU_FONT, 'left', 'top', menuPageText[currentPage][i]);
    }

    drawImage(gameContext, Images.menuCursor, itemsX - 20, topItemY + (cursor1 * rowHeight) + wobble);
  };

})();
