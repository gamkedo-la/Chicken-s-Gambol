let Game = new (function() {
  this.enemies = [];
  this.units = [];
  this.targets = [];

  let removeDeadUnits = false;

  this.scheduleRemoveDeadUnits = function() {
    removeDeadUnits = true;
  };

  this.createEnemy = function(Constructor, settings) {
    return create(this.enemies, Constructor, settings);
  };

  this.createUnit = function(Constructor, settings) {
    return create(this.units, Constructor, settings);
  };

  this.createTarget = function(settings) {
    return create(this.targets, FakeTarget, settings);
  };

  function create(collection, Constructor, settings) {
    let unit = new Constructor(settings);
    collection.push(unit);

    return unit;
  }

  this.update = function(delta) {

    updateGroundDecals(delta);

    callbackList(this.units, 'update', [delta]);
    callbackList(this.enemies, 'update', [delta]);
    callbackList(this.targets, 'update', [delta]);

    if (removeDeadUnits) {
      removeDeadUnits = false;
      removeRemovableUnitsFromList(this.units);
      removeRemovableUnitsFromList(this.enemies);
      removeRemovableUnitsFromList(this.targets);
    }

  };

  function removeRemovableUnitsFromList(list) {
    for (let i = list.length - 1; 0 < i; i--) {
      if (list[i].isReadyToRemove()) {
        list.splice(i, 1);
      }
    }
  }

  this.draw = function(interpolationPercentage) {
    drawGroundDecals();
    callbackList(this.enemies, 'draw', [interpolationPercentage]);
    callbackList(this.units, 'draw', [interpolationPercentage]);
  };

})();
