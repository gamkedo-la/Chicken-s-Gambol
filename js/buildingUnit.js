const BuildingUnit = function(team, settings) {

  let oldX = settings.x;
  let oldY = settings.y;
  settings.x = settings.x + ((settings.unwalkableGrid[0] - 1) / 2 * TILE_SIZE);
  settings.y = settings.y + ((settings.unwalkableGrid[1] - 1) / 2 * TILE_SIZE);

  let buildCompletePercentage = 0;

  settings = extend(settings, {
    state: 'step0',
    healthbarY: TILE_SIZE * 1.2,
    unwalkableGrid: [2, 2]
  });

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
    console.log('set damage' + step);
    this.setState('damage' + step);
  };

  this._remove = function() {
    Grid.updateWalkableGridForBuilding(oldX, oldY, settings.unwalkableGrid, true);
  };

  Unit.call(this, team, settings);

  this.isBuilding = function() {
    return true;
  };
};

BuildingUnit.prototype = Object.create(Unit.prototype);
BuildingUnit.prototype.constructor = BuildingUnit;
