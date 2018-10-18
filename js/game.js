let Game = new (function() {
  let enemies = [];
  let units = [];
  let selection = [];

  this.createEnemy = function(Constructor, settings) {
    return create(enemies, Constructor, settings);
  };

  this.createUnit = function(Constructor, settings) {
    return create(units, Constructor, settings);
  };

  function create(collection, Constructor, settings) {
    let unit = new Constructor(settings);
    collection.push(unit);

    return unit;
  }

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
      if (this.unitIsInList(selection[0], enemies)) {
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
    return this.unitIsInList(unit, selection);
  };

  this.unitIsInList = function(unit, list) {
    let l = list.length;
    for (let i = 0; i < l; i++) {
      if (list[i] === unit) {
        return true;
      }
    }
    return false;
  };

  this.update = function(delta) {
    callbackList(units, 'update', [delta]);
    callbackList(enemies, 'update', [delta]);

    if (Input.isPressed(KEY.MOUSE_LEFT)) {
      handleLeftClick.call(this);
    }
  };

  function handleLeftClick() {
    if (this.clickedOnItem(units, Input.isDown(KEY.CTRL))) {
      return;
    }

    if (this.clickedOnItem(enemies)) {
      return;
    }

    this.clearSelection();
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

  this.draw = function(interpolationPercentage) {
    callbackList(enemies, 'draw', [interpolationPercentage]);
    callbackList(units, 'draw', [interpolationPercentage]);
  };

  function callbackList(items, callback, arguments) {
    let l = items.length;
    for (let i = 0; i < l; i++) {
      if (items[i][callback] === undefined) {
        continue;
      }

      items[i][callback].call(items[i], arguments);
    }
  }
})();
