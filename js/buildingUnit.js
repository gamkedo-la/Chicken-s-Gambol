const BuildingUnit = function(team, settings) {

  let oldX = settings.x;
  let oldY = settings.y;
  settings.x = settings.x + ((settings.unwalkableGrid[0] - 1) / 2 * TILE_SIZE);
  settings.y = settings.y + ((settings.unwalkableGrid[1] - 1) / 2 * TILE_SIZE);

  let buildCompletePercentage = 0;

  settings = extend(settings, {
    state: 'step0',
    healthbarY: TILE_SIZE * 1.2,
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
    this.setState('default');
    callbackList(this.getFollowers(), 'finishedBuilding', [this]);

    if (this._setComplete) {
      this._setComplete();
    }
  };

  this.isComplete = function() {
    return buildCompletePercentage === 100;
  };

  this.getBuildPercentage = function() {
    return buildCompletePercentage;
  }

  this.addBuildPercentage = function(percentage) {
    buildCompletePercentage = Math.min(100, buildCompletePercentage + percentage);

    if (buildCompletePercentage === 100) {
      this.setComplete();

      Interface.selectionChanged(Selection.getSelection());
      return;
    }

    let step = Math.min(4, Math.floor(buildCompletePercentage / 20));
    this.setState('step' + step);
  };

  this._doDamage = function(damage) {
    let step = Math.max(0, Math.floor((this.getHealth() / this.getMaxHealth()) * 5));
    this.setState('damage' + step);
  };

  this._remove = function() {
    Grid.updateWalkableGridForBuilding(oldX, oldY, settings.unwalkableGrid, true);
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
  }

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
