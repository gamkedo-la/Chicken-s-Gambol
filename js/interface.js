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
      new Button(654, 7, 30, 22, true, () => console.log('music button'), false, Images.topButtonBg, undefined, "Toggle Music (To Do)"),
      new Button(692, 7, 30, 22, true, () => console.log('sound button'), false, Images.topButtonBg, undefined, "Toggle Sound (To Do)"),
      new Button(730, 7, 30, 22, false, PauseInterface.pauseGame, false, Images.topButtonBg, undefined, "Pause"),
      new Button(271, 451, 20, 22, false, Game.deleteSelection.bind(Game), false, Images.bottomButtonBg, undefined, "Delete Selection"),
      new Button(475, 451, 20, 22, false, Game.findIdleChicken.bind(Game), false, Images.bottomButtonBg, undefined, "Find Idle Chicken")
    ];

    buildingBuildButtons = [
      new Button(300, 422, 50, 50, false, Game.buildHouse.bind(Game, TEAM_PLAYER), false, Images.buildButtonBg, Sprites.buildButtonHouse, "House (Increase Unit Cap)"),
      new Button(358, 422, 50, 50, false, Game.buildMudPit.bind(Game, TEAM_PLAYER), false, Images.buildButtonBg, Sprites.buildButtonMudPit, "Slime Pit (Store Slime)"),
      new Button(416, 422, 50, 50, false, Game.buildBarracks.bind(Game, TEAM_PLAYER), false, Images.buildButtonBg, Sprites.buildButtonBarracks, "Barracks (Build Units)")
    ];

    unitBuildButtons = [
      new Button(300, 422, 50, 50, false, this.queueUnit.bind(this, Chicken), this.showButtonBuildProgress.bind(this, Chicken), Images.buildButtonBg, Sprites.buildButtonChicken, "Chicken (Build/Harvest)"),
      new Button(358, 422, 50, 50, false, this.queueUnit.bind(this, Goblin), this.showButtonBuildProgress.bind(this, Goblin), Images.buildButtonBg, Sprites.buildButtonGoblin, "Goblin (Combat)"),
      new Button(416, 422, 50, 50, false, this.queueUnit.bind(this, Pig), this.showButtonBuildProgress.bind(this, Pig), Images.buildButtonBg, Sprites.buildButtonPig, "Pig (Combat)")
    ];

    callbackList(unitBuildButtons, 'disable', []);
    callbackList(buildingBuildButtons, 'disable', []);
  };

  this.unInitialize = function() {
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
      setSelectionType('', false);

      return;
    }

    if (length === 1 && selection[0].constructor === Barracks && selection[0].isComplete()) {
      setSelectionType('units', selection[0].isPlayer(TEAM_PLAYER));

      return;
    }

    for (let i = 0; i < length; i++) {
      if (selection[i].constructor !== Chicken) {
        setSelectionType('', false);

        return;
      }
    }

    setSelectionType('buildings', selection[0].isPlayer(TEAM_PLAYER));
  };

  function setSelectionType(selectionType, isPlayer) {
    if (lastSelectionType === selectionType && isPlayer) {
      return;
    }

    if (!isPlayer || selectionType === '') {
      callbackList(buildingBuildButtons, 'disable', []);
      callbackList(unitBuildButtons, 'disable', []);

      lastSelectionType = '';

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
    drawTextWithShadow(gameContext, 658, 160, FONT_COLOR, UNITS_FONT, 'left', 'middle', 'Units');
    drawTextWithShadow(gameContext, 757, 160, FONT_COLOR, UNITS_FONT, 'right', 'middle', Game.getNumUnits(TEAM_PLAYER) + '/' + Game.getMaxNumUnits(TEAM_PLAYER));
    drawTextWithShadow(gameContext, 315, 403, FONT_COLOR, SLIME_FONT, 'left', 'middle', 'Slime');
    drawTextWithShadow(gameContext, 450, 403, FONT_COLOR, SLIME_FONT, 'right', 'middle', Game.getNumSlime(TEAM_PLAYER));

    //draw AI debug info
    if (DEBUG){
      drawText(gameContext, 10, 10, 'White', SLIME_FONT, 'left', 'middle', 'AI Slime: ' + Game.getNumSlime(TEAM_ENEMY));
      drawText(gameContext, 10, 30, 'White', SLIME_FONT, 'left', 'middle', 'AI Units: ' + Game.getNumUnits(TEAM_ENEMY));
      drawText(gameContext, 10, 50, 'White', SLIME_FONT, 'left', 'middle', 'AI Max Units: ' + Game.getMaxNumUnits(TEAM_ENEMY));
      drawText(gameContext, 10, 70, 'White', SLIME_FONT, 'left', 'middle', 'Time Since Last Wave: ' + Math.round(AIPlayer.getElapsedSinceLastWave() * 10) / 10.0);
    }
  };

})();
