let Game = new (function() {
  this.enemies = [];
  this.enemyBuildings = [];
  this.units = [];
  this.buildings = [];
  this.targets = [];

  let removeDeadUnits = false;

  this.scheduleRemoveDeadUnits = function() {
    removeDeadUnits = true;
  };

  this.createEnemy = function(Constructor, settings) {
    return create(this.enemies, Constructor, settings);
  };

  this.createEnemyBuilding = function(Constructor, settings) {
    return create(this.enemyBuildings, Constructor, settings);
  };

  this.createUnit = function(Constructor, settings) {
    return create(this.units, Constructor, settings);
  };

  this.createBuilding = function(Constructor, settings) {
    return create(this.buildings, Constructor, settings);
  };

  this.createTarget = function(settings) {
    return create(this.targets, FakeTarget, settings);
  };

  function create(collection, Constructor, settings) {
    let unit = new Constructor(settings);
    collection.push(unit);

    return unit;
  }

  this.deleteSelection = function() {
    let selection = Selection.getSelection();

    if (selection.length === 0) {
      // We can only delete units or buildings, not enemies or enemy buildings
      return;

    }
    if (!unitIsInList(selection[0], this.units) && !unitIsInList(selection[0], this.buildings)) {
      return;

    }

    let length = selection.length;
    for (let i = 0; i < length; i++) {
      selection[i].remove();
    }

    Selection.clearSelection();
  };

  this.findIdleChicken = function() {
    let idleChickens = [];

    let length = this.units.length;

    for (let i = 0; i < length; i++) {
      let unit = this.units[i];

      if (unit.constructor !== Chicken) {
        continue;
      }

      if (unit.getState() !== 'default') {
        continue;
      }

      idleChickens.push(unit);
    }

    if (idleChickens.length === 0) {
      return;
    }

    Selection.clearSelection();
    let randomIndex = randomInt(0, idleChickens.length - 1);
    Selection.addUnitToSelection(idleChickens[randomIndex]);
  };

  this.update = function(delta) {
    updateGroundDecals(delta);

    callbackList(this.units, 'update', [delta]);
    callbackList(this.buildings, 'update', [delta]);
    callbackList(this.enemies, 'update', [delta]);
    callbackList(this.enemyBuildings, 'update', [delta]);
    callbackList(this.targets, 'update', [delta]);

    if (removeDeadUnits) {
      removeDeadUnits = false;
      removeRemovableUnitsFromList(this.units);
      removeRemovableUnitsFromList(this.buildings);
      removeRemovableUnitsFromList(this.enemies);
      removeRemovableUnitsFromList(this.enemyBuildings);
      removeRemovableUnitsFromList(this.targets);
    }
  };

  function removeRemovableUnitsFromList(list) {
    for (let i = list.length - 1; 0 <= i; i--) {
      if (list[i].isReadyToRemove()) {
        list.splice(i, 1);
      }
    }
  }

  this.draw = function(interpolationPercentage) {
    drawGroundDecals();
    callbackList(this.enemies, 'draw', [interpolationPercentage]);
    callbackList(this.enemyBuildings, 'draw', [interpolationPercentage]);
    callbackList(this.units, 'draw', [interpolationPercentage]);
    callbackList(this.buildings, 'draw', [interpolationPercentage]);
  };

})();
