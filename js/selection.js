let Selection = new (function() {

  let selection = [];
  let hotkey1Group = [];
  let hotkey2Group = [];
  let hotkey3Group = [];
  let hotkey4Group = [];
  let hasEnemySelected = false;

  const minLassoDistanceSquared = 100;
  let mouseLassoing = false;
  let mouseLassoPosition1;
  let mouseLassoPosition2;

  this.clearSelection = function() {
    let length = selection.length;
    for (let i = 0; i < length; i++) {
      if (selection[i].deselect) {
        selection[i].deselect();
      }
    }

    selection = [];
  };

  function selectionChanged() {
    Interface.selectionChanged(selection);
  }

  this.setUnitSelection = function(unit) {
    this.clearSelection();
    this.addUnitToSelection(unit);
  };

  this.addUnitToSelection = function(unit) {
    if (!unit.canSelect()) {
      return;
    }

    if (selection.length) {
      if (selection[0].isEnemy(TEAM_PLAYER)) {
        this.clearSelection();
      }
    }
    selection.push(unit);
    unit.select();

    if (unit.constructor === Pig) {
      pig_select_sound.play();
    }
  };

  this.removeUnitFromSelection = function(unit) {
    let l = selection.length;
    for (let i = 0; i < l; i++) {
      if (selection[i] === unit) {
        unit.deselect();
        selection.splice(i, 1);
        selectionChanged();
        return;
      }
    }
  };

  this.unitIsInSelection = function(unit) {
    return unitIsInList(unit, selection);
  };

  this.getSelection = function() {
    return selection;
  };

  this.hasOnlySelected = function(constructor) {
    let length = selection.length;
    if (length <= 0) {
      return false;
    }

    for (let i = 0; i < length; i++) {
      if (selection[i].constructor !== constructor) {
        return false;
      }
    }

    return true;
  };

  function handleLassoSelect() {
    if (!Input.isDown(KEY.CTRL)) {
      Selection.clearSelection();
    }

    let madeSelection = false;
    let length = Game.units.length;
    for (let i = 0; i < length; i++) {
      let target = Game.units[i];
      if (target.isPlayer(TEAM_PLAYER) && !target.isBuilding() && target.isInBox(mouseLassoPosition1, mouseLassoPosition2)) {
        Selection.addUnitToSelection(target);
        madeSelection = true;
      }
    }

    if (madeSelection) {
      Selection.removeEnemiesAndBuildingsFromSelection();
      selectionChanged();
    }
  }

  function handleLeftClick() {
    hasEnemySelected = false;
    if (this.clickedOnItem(Input.isDown(KEY.CTRL))) {
      return;
    }

    Selection.clearSelection();
    selectionChanged();
  }

  this.clickedOnItem = function(canAppend) {
    if (canAppend === undefined) {
      canAppend = false;
    }

    let mousePosition = Input.getMousePosition();
    let length = Game.units.length;
    for (let i = 0; i < length; i++) {
      let target = Game.units[i];
      if (target.isClickPositionHit && target.isClickPositionHit(mousePosition)) {
        hasEnemySelected = hasEnemySelected || target.isEnemy(TEAM_PLAYER);
        if (canAppend && !target.isBuilding() && !hasEnemySelected) {
          this.removeEnemiesAndBuildingsFromSelection();

          if (this.unitIsInSelection(target)) {
            this.removeUnitFromSelection(target);
          }
          else {
            this.addUnitToSelection(target);
          }
        }
        else {
          this.setUnitSelection(target);
        }

        selectionChanged();
        return true;
      }
    }
    return false;
  };

  this.removeEnemiesAndBuildingsFromSelection = function() {
    for (let i = selection.length - 1; 0 <= i; i--) {
      let target = selection[i];
      if (target.isBuilding() || target.isEnemy(TEAM_PLAYER)) {
        target.deselect();
        selection.splice(i, 1);
      }
    }
  };

  this.update = function(delta) {
    if (Game.hasActiveBuildButton()) {
      return;
    }
    let mousePos = Input.getMousePosition();

    if (Input.isPressed(KEY.MOUSE_LEFT)) {
      if (!Minimap.hasMouseOver(mousePos) && !Interface.hasMouseOver(mousePos)) {
        mouseLassoing = true;
        mouseLassoPosition1 = Input.getMousePosition();
      }
    }
    if (mouseLassoing && !Input.isDown(KEY.MOUSE_LEFT)) {
      mouseLassoing = false;
      if (minLassoDistanceSquared < distanceBetweenPointsSquared(mouseLassoPosition1, mousePos)) {
        handleLassoSelect.call(this);
      }
      else {
        handleLeftClick.call(this);
      }
    }

    if (!hasEnemySelected && Input.isPressed(KEY.MOUSE_RIGHT) && selection.length) {
      let target = Game.findUnitAtPosition(mousePos);
      if (!target) {
        // make a fake target that doesn't move
        target = Game.createTarget(mousePos);
      }
      let unitsAlongSide = Math.floor(Math.sqrt(selection.length + 2));
      callbackList(selection, 'setTarget', [target, unitsAlongSide]);
    }
  };

  this.draw = function(interpolationPercentage) {
    if (!mouseLassoing) {
      return;
    }

    mouseLassoPosition2 = Input.getMousePosition();
    drawStrokeRect(
      gameContext,
      mouseLassoPosition1.x, mouseLassoPosition1.y,
      mouseLassoPosition2.x - mouseLassoPosition1.x,
      mouseLassoPosition2.y - mouseLassoPosition1.y,
      LASSO_COLOR,
      2
    );
  };

  this.addSelectionToHotkeyGroup = function(hotkey) {
    let hotkeyGroup = [];

    let length = selection.length;
    for (let i = 0; i < length; i++) {
      hotkeyGroup.push(selection[i]);
    }

    switch (hotkey) {
      case 1:
        hotkey1Group = [];
        hotkey1Group = hotkeyGroup;
        break;
      case 2:
        hotkey2Group = [];
        hotkey2Group = hotkeyGroup;
        break;
      case 3:
        hotkey3Group = [];
        hotkey3Group = hotkeyGroup;
        break;
      case 4:
        hotkey4Group = [];
        hotkey4Group = hotkeyGroup;
        break;
    }
  };

  this.selectHotKeyGroup = function(hotkey) {
    let hotkeyGroup = [];
    this.clearSelection();

    switch (hotkey) {
      case 1:
        hotkeyGroup = hotkey1Group;
        break;
      case 2:
        hotkeyGroup = hotkey2Group;
        break;
      case 3:
        hotkeyGroup = hotkey3Group;
        break;
      case 4:
        hotkeyGroup = hotkey4Group;
        break;
    }

    for (let i = hotkeyGroup.length - 1; 0 <= i; i--) {
      let target = hotkeyGroup[i];

      // Remove dead units from selection-groups
      if (target.isReadyToRemove()) {
        hotkeyGroup.splice(i, 1);
      }
    }

    selection = hotkeyGroup.slice();
    selectionChanged();
  };

})();
