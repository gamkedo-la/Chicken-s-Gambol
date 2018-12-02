const Interface = new (function() {
  let topWidth = 121;
  let topHeight = 178;

  let bottomWidth = 242;
  let bottomHeight = 98;

  let topBounds = {
    x: gameCanvas.width - topWidth,
    y: 0,
    x2: gameCanvas.width + 1,
    y2: topHeight,
    w: topWidth,
    h: topHeight
  };

  let bottomBounds = {
    x: (gameCanvas.width / 2) - (bottomWidth / 2),
    y: gameCanvas.height - bottomHeight,
    x2: (gameCanvas.width / 2) + (bottomWidth / 2),
    y2: gameCanvas.height + 1,
    w: bottomWidth,
    h: bottomHeight
  };

  let numUnits = 0;
  let maxNumUnits = 5;

  let numSlime = 0;

  let lastSelectionType = '';

  let buttons, buildingBuildButtons, unitBuildButtons;

  this.initialize = function() {
    buttons = [
      new Button(654, 7, 30, 20, () => console.log('music button'), Images.topButtonBg),
      new Button(692, 7, 30, 20, () => console.log('sound button'), Images.topButtonBg),
      new Button(730, 7, 30, 20, () => console.log('menu button'), Images.topButtonBg),
      new Button(271, 451, 20, 20, Game.deleteSelection.bind(Game), Images.bottomButtonBg),
      new Button(475, 451, 20, 20, Game.findIdleChicken.bind(Game), Images.bottomButtonBg)
    ];

    buildingBuildButtons = [
      new Button(300, 422, 50, 50, Game.buildButton.bind(Game, House, Images.housePreview), Images.buildButtonBg, Sprites.buildButtonHouse)
    ];

    unitBuildButtons = [
      new Button(300, 422, 50, 50, () => console.log('build chicken'), Images.buildButtonBg, Sprites.buildButtonChicken)
    ];

    callbackList(unitBuildButtons, 'disable', []);
    callbackList(buildingBuildButtons, 'disable', []);
  };

  this.addUnit = function() {
    numUnits++;
  };
  this.subUnit = function() {
    numUnits--;
  };

  this.setNumMaxUnits = function(amount) {
    maxNumUnits = amount;
  };

  this.addSlime = function(amount) {
    numSlime += amount;
  };
  this.subSlime = function(amount) {
    numSlime -= amount;
  };

  this.hasMouseOver = function(mousePos) {
    return (topBounds.x < mousePos.sx && mousePos.sx <= topBounds.x2 &&
      topBounds.y <= mousePos.sy && mousePos.sy < topBounds.y2)
      ||
      (bottomBounds.x < mousePos.sx && mousePos.sx < bottomBounds.x2 &&
        bottomBounds.y < mousePos.sy && mousePos.sy <= bottomBounds.y2);
  };

  this.selectionChanged = function(selection) {
    let length = selection.length;
    if (length === 0) {
      setSelectionType('');

      return;
    }

    if (length === 1 && selection[0].constructor === House && selection[0].isComplete()) {
      setSelectionType('units');

      return;
    }

    for (let i = 0; i < length; i++) {
      if (selection[i].constructor !== Chicken) {
        setSelectionType('');

        return;
      }
    }

    setSelectionType('buildings');
  };

  function setSelectionType(selectionType) {
    if (lastSelectionType === selectionType) {
      return;
    }

    if (selectionType === 'buildings') {
      callbackList(buildingBuildButtons, 'enable', []);
      if (lastSelectionType === 'units') {
        callbackList(unitBuildButtons, 'disable', []);
      }
    }
    else if (selectionType === 'units') {
      callbackList(unitBuildButtons, 'enable', []);
      if (lastSelectionType === 'buildings') {
        callbackList(buildingBuildButtons, 'disable', []);
      }
    }
    else if (selectionType === '') {
      callbackList(buildingBuildButtons, 'disable', []);
      callbackList(unitBuildButtons, 'disable', []);
    }

    lastSelectionType = selectionType;
  }

  this.update = function(delta) {
    let args = [delta, Input.getMousePosition()];

    callbackList(buttons, 'update', args);
    callbackList(buildingBuildButtons, 'update', args);
    callbackList(unitBuildButtons, 'update', args);

    Minimap.update(delta);
  };

  this.draw = function() {
    // draw background
    drawImage(gameContext, Images.interfaceTopBg, 705, 93);
    drawImage(gameContext, Images.interfaceBottomBg, 384, 428);

    // draw Minimap
    Minimap.draw();

    // draw buttons
    callbackList(buttons, 'draw', []);
    callbackList(buildingBuildButtons, 'draw', []);
    callbackList(unitBuildButtons, 'draw', []);

    // draw containers
    drawImage(gameContext, Images.interfaceTopContainer, 705, 93);
    drawImage(gameContext, Images.interfaceBottomContainer, 384, 428);

    // draw  text
    setShadow(SHADOW_COLOR, 2, 2, 2);
    drawText(gameContext, 658, 160, FONT_COLOR, UNITS_FONT, 'left', 'middle', 'Units');
    drawText(gameContext, 757, 160, FONT_COLOR, UNITS_FONT, 'right', 'middle', numUnits + '/' + maxNumUnits);
    drawText(gameContext, 315, 403, FONT_COLOR, SLIME_FONT, 'left', 'middle', 'Slime');
    drawText(gameContext, 450, 403, FONT_COLOR, SLIME_FONT, 'right', 'middle', numSlime);
    resetShadow();
  };

})();
