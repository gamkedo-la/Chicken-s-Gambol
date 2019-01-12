let Game = new (function() {
  this.units = [];
  this.buildActionConstructor = false;
  let buildPreviewImage = false;
  let buildPreviewImageInvalid = false;
  let placedBuilding = false;

  let removeDeadUnits = false;

  let numUnits = 0;
  let numUnitsAI = 0;
  let maxNumUnits = MIN_NUM_UNITS;
  let maxNumUnitsAI = MIN_NUM_UNITS;
  let absoluteMinNumUnits = MIN_NUM_UNITS;
  let absoluteMaxNumUnits = ABS_MIN_NUM_UNITS;

  let numSlime = STARTING_AMOUNT_SLIME;
  let numSlimeAI = STARTING_AMOUNT_SLIME;

  this.initialize = function() {
    this.buildActionConstructor = false;
    buildPreviewImage = false;
    buildPreviewImageInvalid = false;
    removeDeadUnits = false;

    numUnits = 0;
    numUnitsAI = 0;
    maxNumUnits = MIN_NUM_UNITS;
    maxNumUnitsAI = MIN_NUM_UNITS;

    numSlime = STARTING_AMOUNT_SLIME;
    numSlimeAI = STARTING_AMOUNT_SLIME;
  };

  this.unInitialize = function() {
    this.units = [];
  };

  this.scheduleRemoveDeadUnits = function() {
    removeDeadUnits = true;
  };

  this.createTarget = function(settings) {
    return this.create(FakeTarget, TEAM_NONE, settings);
  };

  this.create = function(Constructor, team, settings) {
    let unit = new Constructor(team, settings);
    this.units.push(unit);

    let c = unit.constructor;
    if (c === Chicken || c === Goblin || c === Pig || c === ChickenEnemy || c === GoblinEnemy || c === PigEnemy) {
      this.addUnit(team);
    }

    return unit;
  };

  this.addUnit = function(team) {
    if (team === TEAM_PLAYER){
      numUnits++;
    } else if (team === TEAM_ENEMY){
      numUnitsAI++;
    }
  };

  this.subUnit = function(team) {
    if (team === TEAM_PLAYER){
      numUnits--;
    } else if (team === TEAM_ENEMY){
      numUnitsAI--;
    }
  };

  this.getNumUnits = function(team) {
    if (team === TEAM_PLAYER){
      return numUnits;
    } else if (team === TEAM_ENEMY){
      return numUnitsAI;
    }
  };

  this.addMaxNumUnits = function(amount, team) {
    if (team === TEAM_PLAYER){
      maxNumUnits = Math.min(absoluteMaxNumUnits, amount + maxNumUnits);
    } else if (team === TEAM_ENEMY){
      maxNumUnitsAI = Math.min(absoluteMaxNumUnits, amount + maxNumUnitsAI);
    }
  };

  this.subMaxNumUnits = function(amount, team) {
    if (team === TEAM_PLAYER){
      maxNumUnits = Math.max(absoluteMinNumUnits, maxNumUnits - amount);
    } else if (team === TEAM_ENEMY){
      maxNumUnitsAI = Math.max(absoluteMinNumUnits, maxNumUnitsAI - amount);
    }
  };

  this.getMaxNumUnits = function(team) {
    if (team === TEAM_PLAYER){
      return maxNumUnits;
    } else if (team === TEAM_ENEMY){
      return maxNumUnitsAI;
    }
  };

  this.addSlime = function(amount, team) {
    if (team === TEAM_PLAYER){
      numSlime += amount;
    } else if (team === TEAM_ENEMY){
      numSlimeAI += amount;
    }

  };

  this.subSlime = function(amount, team) {
    if (team === TEAM_PLAYER){
      numSlime -= amount;
    } else if (team === TEAM_ENEMY){
      numSlimeAI -= amount;
    }
  };

  this.getNumSlime = function(team) {
    if (team === TEAM_PLAYER){
      return numSlime;
    } else if (team === TEAM_ENEMY){
      return numSlimeAI;
    }
  };

  this.canCreateUnit = function(team = TEAM_PLAYER) {
    if (team === TEAM_PLAYER){
      return numUnits < maxNumUnits;
    } else if (team === TEAM_ENEMY){
      return numUnitsAI < maxNumUnitsAI;
    }
  };

  this.hasAmountOfSlimeAvailable = function(amount, team) {
    if (team === TEAM_PLAYER){
      return amount <= numSlime;
    } else if (team === TEAM_ENEMY){
      return amount <= numSlimeAI;
    }
  };

  this.buildButton = function(Constructor, previewImage, team) {

    if (!this.hasAmountOfSlimeAvailable(COSTS[Constructor.name], team)) {
      return;
    }

    this.subSlime(COSTS[Constructor.name], team);

    if (team === TEAM_PLAYER){
      buildPreviewImage = previewImage;
      buildPreviewImageInvalid = createTintedSprite(buildPreviewImage, 'red', .3);
      this.buildActionConstructor = Constructor;
      placedBuilding = false;
    }
  };

  this.cancelBuildButton = function(Constructor) {
    this.buildActionConstructor = false;
    placedBuilding = false;
    buildPreviewImage = false;
    buildPreviewImageInvalid = false;
  };

  this.hasActiveBuildButton = function() {
    return this.buildActionConstructor !== false;
  };

  this.buildHouse = function(team) {
    if (team === TEAM_PLAYER){
      this.buildButton(House, Images.housePreview, team);
    } else if (team === TEAM_ENEMY){
      this.buildButton(HouseEnemy, Images.housePreview, team);
    }
  };

  this.buildMudPit = function(team) {
    if (team === TEAM_PLAYER){
      this.buildButton(MudPit, Images.mudPitPreview, team);
    } else if (team === TEAM_ENEMY){
      this.buildButton(MudPitEnemy, Images.mudPitPreview, team);
    }
  };

  this.buildBarracks = function(team) {
    if (team === TEAM_PLAYER){
      this.buildButton(Barracks, Images.barracksPreview, team);
    } else if (team === TEAM_ENEMY){
      this.buildButton(BarracksEnemy, Images.barracksPreview, team);
    }
  };

  this.deleteSelection = function() {
    let selection = Selection.getSelection();

    if (selection.length === 0) {
      return;
    }

    // We can only delete player units or buildings, not enemies or slime
    if (selection[0].getTeam() === TEAM_ENEMY) {
      return;
    }

    let length = selection.length;
    for (let i = 0; i < length; i++) {
      selection[i].remove();

      let c = selection[i].constructor;
      if (c === Chicken || c === Goblin || c === Pig) {
        Game.subUnit(selection[0].getTeam());
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
    return getUnitAtPosition(position, this.units);
  };

  this.update = function(delta) {
    updateGroundDecals(delta);

    callbackList(this.units, 'update', [delta]);

    if (removeDeadUnits) {
      removeDeadUnits = false;
      removeRemovableUnitsFromList(this.units);

      checkGameWinLoseState(this.units);
    }

    let mousePos = Input.getMousePosition();
    if (Input.isPressed(KEY.MOUSE_LEFT) || Input.isPressed(KEY.MOUSE_RIGHT)) {
      if (!Interface.hasMouseOver(mousePos)) {
        clickParticles();
      }
    }

    if (this.hasActiveBuildButton() && Input.isPressed(KEY.MOUSE_LEFT)) {
      let settings = {
        x: mousePos.x,
        y: mousePos.y
      };

      Grid.normalizeCoords(settings);
      let building = this.create(this.buildActionConstructor, TEAM_PLAYER, settings);
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

  function checkGameWinLoseState(list) {
    let hasPlayer = false;
    let hasPlayerSlime = false;
    let hasEnemy = false;
    let hasEnemySlime = false;

    let length = list.length;
    for (let i = 0; i < length; i++) {
      let unit = list[i];
      hasPlayer = hasPlayer || unit.isPlayer(TEAM_PLAYER);
      hasEnemy = hasEnemy || unit.isEnemy(TEAM_ENEMY);
      hasPlayerSlime = hasPlayerSlime || unit.constructor === Slime;
      hasEnemySlime = hasEnemySlime || unit.constructor === SlimeEnemy;

      if (hasPlayer && hasPlayerSlime && hasEnemy && hasEnemySlime) {
        return;
      }
    }

    gameIsStarted = false;

    if (hasPlayer) {
      console.log('Player won! Enemy defeated');

      return;
    }

    console.log('Enemy won! Player defeated...')
  }

  this.canBuildAtMousePosition = function(team) {
    if (!this.hasActiveBuildButton() || !buildPreviewImage) {
      return false;
    }

    if (team === undefined) {
      team = TEAM_PLAYER;
    }

    let mousePosition = Input.getMousePosition();

    let length = this.units.length;
    for (let i = 0; i < length; i++) {
      let unit = this.units[i];

      if (unit.getTeam() !== team) {
        continue;
      }

      if (!unit.isBuilding() || unit.constructor === SlimePatch || unit.constructor === SlimePatchEnemy) {
        continue;
      }

      let d = distanceBetweenPointsSquared(mousePosition, unit.getPosition());
      if (MAX_BUILD_DISTANCE_SQUARED < d) {
        continue;
      }

      // @todo how to grab the unwalkableGrid from building?
      if (Grid.canPlaceBuildingAt(mousePosition.x, mousePosition.y, [2, 2])) {
        return true;
      }
    }

    return false;
  };

  function sortUnits(a, b) {
    let aIsSlimePatch = (a.constructor === SlimePatch || a.constructor === SlimePatchEnemy);
    let bIsSlimePatch = (b.constructor === SlimePatch || b.constructor === SlimePatchEnemy);

    if (aIsSlimePatch || bIsSlimePatch) {
      if (!aIsSlimePatch) {
        return 1;
      }
      else if (!bIsSlimePatch) {
        return -1;
      }
      else {
        return 0;
      }
    }

    return a.getPosition().y - b.getPosition().y;
  }

  this.draw = function(interpolationPercentage) {
    drawGroundDecals();
    this.units.sort(sortUnits);
    callbackList(this.units, 'draw', [interpolationPercentage]);

    if (this.hasActiveBuildButton() && buildPreviewImage) {
      let position = Input.getMousePosition();
      Grid.normalizeCoords(position);
      drawImage(gameContext, this.canBuildAtMousePosition() ? buildPreviewImage : buildPreviewImageInvalid, position.x + TILE_HALF_SIZE, position.y + TILE_HALF_SIZE);
    }
  };

})();
