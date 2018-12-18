const BuildingUnit = function(team, settings) {

  let oldX = settings.x;
  let oldY = settings.y;
  settings.x = settings.x + TILE_HALF_SIZE;
  settings.y = settings.y + TILE_HALF_SIZE;

  let buildCompletePercentage = 0;

  settings = extend(settings, {
    state: 'step0',
    healthbarY: TILE_SIZE * 1.2
  });

  let unwalkableGrid = settings.unwalkableGrid || [2, 2];

  // We use the oldX,oldY because the half-tile shift (for the image) uses the
  // wrong tile-index and we need the upper-left tile + unwalkableGrid
  Grid.updateWalkableGridForBuilding(oldX, oldY, unwalkableGrid);

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

  this.addBuildPercentage = function(percentage) {
    buildCompletePercentage = Math.min(100, buildCompletePercentage + percentage);

    if (buildCompletePercentage === 100) {
      this.setComplete();
      return;
    }

    let step = Math.floor(buildCompletePercentage / 20);
    this.setState('step' + step);
  };

  Unit.call(this, team, settings);

  this.isBuilding = function() {
    return true;
  };
};

BuildingUnit.prototype = Object.create(Unit.prototype);
BuildingUnit.prototype.constructor = BuildingUnit;
