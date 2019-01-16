const BuildingUnit = function(team, settings) {

  let oldX = settings.x;
  let oldY = settings.y;
  settings.x = settings.x + ((settings.unwalkableGrid[0] - 1) / 2 * TILE_SIZE);
  settings.y = settings.y + ((settings.unwalkableGrid[1] - 1) / 2 * TILE_SIZE);

  let buildCompletePercentage = 0;
  let buildComplete = false;

  settings = extend(settings, {
    state: 'step0',
    healthbarY: TILE_SIZE * 1.2,
    startHealth: 0,
    unwalkableGrid: [2, 2],
    maxBuildDistance: 8 //Settings copied from Slime class
  });

  //Variables copied from Slime class
  let maxBuildDistanceSquared = Math.pow(settings.maxBuildDistance * TILE_SIZE, 2);
  let buildablePlots = [];

  // We use the oldX,oldY because the half-tile shift (for the image) uses the
  // wrong tile-index and we need the upper-left tile + unwalkableGrid
  Grid.updateWalkableGridForBuilding(oldX, oldY, settings.unwalkableGrid, false);

  this.setComplete = function() {
    buildCompletePercentage = 100;
    buildComplete = true;

    // "hack" to force health to be 100%
    this.addHealth(this.getMaxHealth());

    callbackList(this.getFollowers(), 'finishedBuilding', [this]);

    if (this._setComplete) {
      this._setComplete();
    }
  };

  this.isComplete = function() {
    return buildComplete;
  };

  this.calcBuildComplete = function() {
    if (buildComplete) {
      return;
    }

    buildCompletePercentage = Math.round(this.getHealth() / this.getMaxHealth() * 100);

    if (buildCompletePercentage === 100) {
      this.setComplete();

      Interface.selectionChanged(Selection.getSelection());
    }
  };

  this.addBuildPercentage = function(amount) {
    this.addHealth(amount);
    this.calcBuildComplete();

    this.setStateFixed();
  };

  this._doDamage = function(damage) {
    this.calcBuildComplete();

    this.setStateFixed();
  };

  this.setStateFixed = function() {
    if (this.getHealth() === this.getMaxHealth()) {
      this.setState('default');
      return;
    }

    let step = Math.max(0, Math.floor(this.getHealth() / this.getMaxHealth() * 5));
    this.setState((buildComplete ? 'damage' : 'step') + step);
  };

  this._remove = function() {
    Grid.updateWalkableGridForBuilding(oldX, oldY, settings.unwalkableGrid, true);
  };

  this._draw = function() {
    if (this.constructor === Slime || this.constructor === SlimeEnemy) {
      return;
    }

    if (!buildComplete) {
      let posNow = this.getPosition();
      drawStrokeCircle(gameContext, posNow.x, posNow.y - settings.healthbarY - 6, 3, 100.0, 'black', 5);
      drawStrokeCircle(gameContext, posNow.x, posNow.y - settings.healthbarY - 6, 3, buildCompletePercentage/100.0, 'orange', 5);
    }
  };

  Unit.call(this, team, settings);

  this.isBuilding = function() {
    return true;
  };

  //Functions below copied from Slime class
  this.buildPlot = function(centralUnit, buildingType) {
    findBuildablePlots();

    if (buildablePlots.length <= 0) {
      // No plots available
      return;
    }

    let plot = buildablePlots.shift();

    let extendedPlotArea = [settings.unwalkableGrid[0] + 1, settings.unwalkableGrid[1] + 1]
    if (!Grid.canPlaceBuildingAt(plot.x, plot.y, extendedPlotArea)) {
      return this.buildPlot(centralUnit, buildingType);
    }

    plot.centralUnit = centralUnit;

    Game.create(buildingType, team, plot);
  };

  function findBuildablePlots() {
    if (0 < buildablePlots.length) {
      return;
    }

    let worldDimensions = Grid.getWorldDimensions();
    let maxBuildDistance = settings.maxBuildDistance * TILE_SIZE;

    let minX = Math.max(0, settings.x - maxBuildDistance - 1) + TILE_HALF_SIZE;
    let maxX = Math.min(worldDimensions.cols * TILE_SIZE, settings.x + maxBuildDistance) - TILE_HALF_SIZE;
    let minY = Math.max(0, settings.y - maxBuildDistance - 1) + TILE_HALF_SIZE;
    let maxY = Math.min(worldDimensions.rows * TILE_SIZE, settings.y + maxBuildDistance) - TILE_HALF_SIZE;

    for (let dx = minX; dx <= maxX; dx += TILE_SIZE) {
      for (let dy = minY; dy <= maxY; dy += TILE_SIZE) {
        let distance = Math.pow(dx - settings.x, 2) + Math.pow(dy - settings.y, 2);
        if (distance <= maxBuildDistanceSquared && Grid.canPlaceBuildingAt(dx, dy, settings.unwalkableGrid)) {
          addPlotPosition(dx - TILE_HALF_SIZE, dy, distance);
        }
      }
    }

    if (0 < buildablePlots.length) {
      //sorts buildablePlots from nearest to farthest from centralUnit.
      buildablePlots.sort(function(a, b){
        if (a.distanceFromCentralUnit === b.distanceFromCentralUnit){
          return 0;
        } else if(a.distanceFromCentralUnit < b.distanceFromCentralUnit) {
          return -1;
        } else if (a.distanceFromCentralUnit > b.distanceFromCentralUnit) {
          return 1;
        }
      });

      //takes the 30 nearest plots and randomizes their order.
      buildablePlots = shuffle(buildablePlots.splice(0, 30));
    }

    //buildablePlots = shuffle(buildablePlots.splice(0, buildablePlots.length));
  }

  function addPlotPosition(x, y, distanceFromCentralUnit) {
    let length = buildablePlots.length;
    for (let i = 0; i < length; i++) {
      if (buildablePlots[i].x === x && buildablePlots[i].y === y) {
        return;
      }
    }

    buildablePlots.push({ x: x, y: y, distanceFromCentralUnit: distanceFromCentralUnit });
  }

};

BuildingUnit.prototype = Object.create(Unit.prototype);
BuildingUnit.prototype.constructor = BuildingUnit;
