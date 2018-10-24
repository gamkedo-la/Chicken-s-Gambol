let Selection = new (function(){

  let selection = [];

  const minLassoDistanceSquared = 100;
  let mouseLassoing = false;
  let mouseLassoPosition1;
  let mouseLassoPosition2;

  this.clearSelection = function() {
    for (let i = 0; i < selection.length; i++) {
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
        target.select();
        Selection.addUnitToSelection(target);
      }
    }
  }

  function handleLeftClick() {
    if (Selection.clickedOnItem(Game.units, Input.isDown(KEY.CTRL))) {
      return;
    }

    if (Selection.clickedOnItem(Game.enemies)) {
      return;
    }

    Selection.clearSelection();
  }

  this.clickedOnItem = function(list, canAppend) {
    let mousePosition = Input.getMousePosition();
    for (let i = 0; i < list.length; i++) {
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
    for (let i = 0; i < list.length; i++) {
      let target = list[i];
      if (target.isClickPositionHit && target.isClickPositionHit(mousePosition)) {
        return target;
      }
    }
  };

  this.update = function(delta) {
    if (Input.isPressed(KEY.MOUSE_LEFT)) {
      mouseLassoing = true;
      mouseLassoPosition1 = Input.getMousePosition();
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

    if (Input.isPressed(KEY.MOUSE_RIGHT) && selection.length) {
      let target = this.getClickedUnit(Game.enemies);
      if (target) {
        // @todo make the selection attack the unit!
      }
      else {
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

})();
