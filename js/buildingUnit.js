const BuildingUnit = function(settings) {

  let oldX = settings.x;
  let oldY = settings.y;
  settings.x = settings.x + TILE_HALF_SIZE;
  settings.y = settings.y + TILE_HALF_SIZE;

  let unwalkableGrid = settings.unwalkableGrid || [2, 2];

  // We use the oldX,oldY because the half-tile shift (for the image) uses the
  // wrong tile-index
  Grid.updateWalkableGridForBuilding(oldX, oldY, unwalkableGrid);

  Unit.call(this, settings);
};

BuildingUnit.prototype = Object.create(Unit.prototype);
BuildingUnit.prototype.constructor = BuildingUnit;
