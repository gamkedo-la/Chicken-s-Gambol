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

  let lastSelectionType = '';

  let buttons, buildingBuildButtons, unitBuildButtons;

  this.initialize = function() {
    buttons = [
      new Button(654, 7, 30, 22, () => console.log('music button'), false, Images.topButtonBg),
      new Button(692, 7, 30, 22, () => console.log('sound button'), false, Images.topButtonBg),
      new Button(730, 7, 30, 22, () => console.log('menu button'), false, Images.topButtonBg),
      new Button(271, 451, 20, 22, Game.deleteSelection.bind(Game), false, Images.bottomButtonBg),
      new Button(475, 451, 20, 22, Game.findIdleChicken.bind(Game), false, Images.bottomButtonBg)
    ];

    buildingBuildButtons = [
      new Button(300, 422, 50, 50, Game.buildHouse.bind(Game), false, Images.buildButtonBg, Sprites.buildButtonHouse),
      new Button(358, 422, 50, 50, Game.buildMudPit.bind(Game), false, Images.buildButtonBg, Sprites.buildButtonMudPit),
      new Button(416, 422, 50, 50, Game.buildBarracks.bind(Game), false, Images.buildButtonBg, Sprites.buildButtonBarracks)
    ];

    unitBuildButtons = [
      new Button(300, 422, 50, 50, this.queueUnit.bind(this, Chicken), this.showButtonBuildProgress.bind(this, Chicken), Images.buildButtonBg, Sprites.buildButtonChicken),
      new Button(358, 422, 50, 50, this.queueUnit.bind(this, Goblin), this.showButtonBuildProgress.bind(this, Goblin), Images.buildButtonBg, Sprites.buildButtonGoblin),
//      new Button(416, 422, 50, 50, this.queueUnit.bind(this, Pig), this.showButtonBuildProgress.bind(this, Pig), Images.buildButtonBg, Sprites.buildButtonPig)
    ];

    callbackList(unitBuildButtons, 'disable', []);
    callbackList(buildingBuildButtons, 'disable', []);
  };

  this.queueUnit = function(constructor, button) {
    let selection = Selection.getSelection();

    if (!selection[0]) {
      return;
    }

    selection[0].queueUnit(constructor, button);
  };

  this.showButtonBuildProgress = function(constructor, button) {
    let selection = Selection.getSelection();

    if (!selection[0]) {
      return;
    }

    selection[0].showButtonBuildProgress(constructor, button);
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

    if (length === 1 && selection[0].constructor === Barracks && selection[0].isComplete()) {
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
    drawText(gameContext, 757, 160, FONT_COLOR, UNITS_FONT, 'right', 'middle', Game.getNumUnits() + '/' + Game.getMaxNumUnits());
    drawText(gameContext, 315, 403, FONT_COLOR, SLIME_FONT, 'left', 'middle', 'Slime');
    drawText(gameContext, 450, 403, FONT_COLOR, SLIME_FONT, 'right', 'middle', Game.getNumSlime());
    resetShadow();
  };

})();
