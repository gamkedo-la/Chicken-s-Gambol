let Game = new (function() {
  this.enemies = [];
  this.enemyBuildings = [];
  this.units = [];
  this.buildings = [];
  this.targets = [];
  this.buildActionConstructor = false;
  let buildButton = false;
  let buildPreviewImage = false;
  let placedBuilding = false;

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
    Interface.addUnit();
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

  this.buildButton = function(Constructor, previewImage, button) {
    buildPreviewImage = previewImage;
    buildButton = button;
    this.buildActionConstructor = Constructor;
    placedBuilding = false;
  };

  this.cancelBuildButton = function(Constructor) {
    buildButton.deactivate();
    this.buildActionConstructor = false;
    placedBuilding = false;
    buildPreviewImage = false;
    buildButton = false;
  };

  this.hasActiveBuildButton = function() {
    return this.buildActionConstructor !== false;
  };

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

      let c = selection[i].constructor;
      if (c === Chicken || c === Goblin/* || c === Pig*/) {
        Interface.subUnit();
      }
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

    // @todo instead of totally random, cycle through the idle chickens? do they have to register themselves perhaps? (a FIFO?)
    let randomIndex = randomInt(0, idleChickens.length - 1);
    Selection.setUnitSelection(idleChickens[randomIndex]);
  };

  function getUnitAtPosition(mousePosition, list) {
    let length = list.length;
    for (let i = 0; i < length; i++) {
      let target = list[i];
      if (target.isClickPositionHit && target.isClickPositionHit(mousePosition)) {
        return target;
      }
    }
  }

  this.findUnitAtPosition = function(position) {
    let target = getUnitAtPosition(position, this.units);
    if (!target) {
      target = getUnitAtPosition(position, this.buildings);
    }
    if (!target) {
      target = getUnitAtPosition(position, this.enemies);
    }
    if (!target) {
      target = getUnitAtPosition(position, this.enemyBuildings);
    }

    return target;
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

    if (this.hasActiveBuildButton() && Input.isPressed(KEY.MOUSE_LEFT)) {
      let mousePos = Input.getMousePosition();
      let settings = {
        x: mousePos.x,
        y: mousePos.y
      };

      Grid.normalizeCoords(settings);
      let building = this.createBuilding(this.buildActionConstructor, settings);
      callbackList(Selection.getSelection(), 'setTarget', [building]);
      placedBuilding = true;
    }
    else if (placedBuilding) {
      this.cancelBuildButton();
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

    if (this.hasActiveBuildButton() && buildPreviewImage) {
      let position = Input.getMousePosition();
      Grid.normalizeCoords(position);
      drawImage(gameContext, buildPreviewImage, position.x + TILE_HALF_SIZE, position.y + TILE_HALF_SIZE);
    }
  };

})();
