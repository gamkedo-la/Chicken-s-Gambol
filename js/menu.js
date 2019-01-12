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

  let creditsList =
["• Caspar \"SpadXIII\" Dunant: Project co-lead, initial implementation and setup,",
"unit selection and movement, scrolling view, main interface code, unit behavior",
"and collision, build and construction code, slime harvesting, level editor,",
"animation class, input handling, in-game debug view, CSS, win/loss code",
"• Marc Silva: Project co-lead, art and most animations for chicken, slime blob,",
"pig, and goblin characters, house art",
"• Vince McKeown: Art for grass, dirt, house and buildings (including damaged",
"and destroyed states), goblin sprite integration",
"• Brian Boucher: AI enemy army programming and related optimizations, group",
"selection by number key, slime patch organic randomization",
"• Vaan Hope Khani: Interface concept and texture, main menu code, compiled",
"credits, minimap boundary debug",
"• Christer \"McFunkypants\" Kaitila: Helper functions for AI,",
"footprints decal art and code, title screen, logo, additional chicken sounds,",
"pathfinding with preview arrows, defeated character poses and fade out code",
"• Terrence McDonnell: Mouse chicken cursor, scroll UI art, feedback cursors",
"• Stebs: Intro song, chicken idle sounds, and pig audio integration",
"• Kise: Minimap main functionality",
"• Trenton Pegeas: Snow tiles, barn barracks and build animation",
"• Chris Markle: Goblin attack, selection, walking, and spawning sounds",
"• Jaime Rivas: Particle effects base code",
"• Buddie Chapman: UI button support",
"• Ryan Malm: Bug fix in the audio integration",
"• Ryan Gaillard: Clicking on mini-map to jump view",
"• Chris DeLeon: Minimap shows box for screen area, credits integration"];

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
    else if (Input.isPressed(KEY.MOUSE_LEFT)) {
      if(currentPage === CREDITS_PAGE) {
        currentPage = MENU_PAGE;
        cursor1 = 0;
      } else if(pointingAt !== -1) {
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
    if(currentPage == CREDITS_PAGE) {
      drawFillRect(gameContext, 0, 0, gameCanvas.width, gameCanvas.height, "black", 0.2);
      let creditsX = 11;
      let creditsTopY = 0;
      let creditsLineSkipY = 19;
      for (let i = 0; i < creditsList.length; i++) {
        drawTextWithShadow(gameContext, creditsX, creditsTopY + creditsLineSkipY * i, MENU_COLOR, MENU_FONT, 'left', 'top', creditsList[i]);
      }
    } else {
      gameContext.drawImage(Images.startMenu, 0, 0); // logo and main menu bg

      for (let i = 0; i < menuPageText[currentPage].length; i++) {
        drawTextWithShadow(gameContext, itemsX, topItemY + rowHeight * i, MENU_COLOR, MENU_FONT, 'left', 'top', menuPageText[currentPage][i]);
      }

      drawImage(gameContext, Images.menuCursor, itemsX - 20, topItemY + (cursor1 * rowHeight) + wobble);
    }
  };

})();
