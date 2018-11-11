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

  this.setUnitSelection = function(unit) {
    this.clearSelection();
    this.addUnitToSelection(unit);
  };

  this.addUnitToSelection = function(unit) {
    if (selection.length) {
      if (unitIsInList(selection[0], Game.enemies)) {
        this.clearSelection();
      }
    }
    selection.push(unit);
    unit.select();
  };

  this.removeUnitFromSelection = function(unit) {
    let l = selection.length;
    for (let i = 0; i < l; i++) {
      if (selection[i] === unit) {
        unit.deselect();
        selection.splice(i, 1);
        return;
      }
    }
  };

  this.unitIsInSelection = function(unit) {
    return unitIsInList(unit, selection);
  };

  function handleLassoSelect() {
    if (!Input.isDown(KEY.CTRL)) {
      Selection.clearSelection();
    }

    let length = Game.units.length;
    for (let i = 0; i < length; i++) {
      let target = Game.units[i];
      if (target.isInBox(mouseLassoPosition1, mouseLassoPosition2)) {
        Selection.addUnitToSelection(target);
      }
    }
  }

  function handleLeftClick() {
    hasEnemySelected = false;
    if (Selection.clickedOnItem(Game.units, Input.isDown(KEY.CTRL))) {
      return;
    }

    if (Selection.clickedOnItem(Game.enemies)) {
      hasEnemySelected = true;
      return;
    }

    Selection.clearSelection();
  }

  this.clickedOnItem = function(list, canAppend) {
    let mousePosition = Input.getMousePosition();
    let length = list.length;
    for (let i = 0; i < length; i++) {
      let target = list[i];
      if (target.isClickPositionHit && target.isClickPositionHit(mousePosition)) {
        if (canAppend) {
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

        return true;
      }
    }
    return false;
  };

  this.getClickedUnit = function(list) {
    let mousePosition = Input.getMousePosition();
    let length = list.length;
    for (let i = 0; i < length; i++) {
      let target = list[i];
      if (target.isClickPositionHit && target.isClickPositionHit(mousePosition)) {
        return target;
      }
    }
  };

  this.update = function(delta) {
    if (Input.isPressed(KEY.MOUSE_LEFT)) {
      if(minimap.mouseInputCheckForMinimap() == false) { // is the mouse over the minimap? if so don't drag select
        mouseLassoing = true;
        mouseLassoPosition1 = Input.getMousePosition();
      }
    }
    if (mouseLassoing && !Input.isDown(KEY.MOUSE_LEFT)) {
      mouseLassoing = false;
      mouseLassoPosition2 = Input.getMousePosition();
      if (minLassoDistanceSquared < distanceBetweenPointsSquared(mouseLassoPosition1, mouseLassoPosition2)) {
        handleLassoSelect.call(this);
      }
      else {
        handleLeftClick.call(this);
      }
    }

    if (!hasEnemySelected && Input.isPressed(KEY.MOUSE_RIGHT) && selection.length) {
      let target = this.getClickedUnit(Game.enemies);
      if (!target) {
        // make a fake target that doesn't move
        target = Game.createTarget(Input.getMousePosition());
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

    let length = hotkeyGroup.length;
    for (let i = 0; i < length; i++) {
      let target = hotkeyGroup[i];
      this.addUnitToSelection(target);
    }
  };

})();
