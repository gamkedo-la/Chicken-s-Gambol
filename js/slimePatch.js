const SlimePatch = function(settings) {

  settings = extend(settings, {
    sprite: Sprites.slimePatch,
    collisionRange: 19
  });

  let unwalkableGrid = settings.unwalkableGrid || [1, 1];

  // We use the oldX,oldY because the half-tile shift (for the image) uses the
  // wrong tile-index and we need the upper-left tile + unwalkableGrid
  Grid.updateWalkableGridForBuilding(settings.x, settings.y, unwalkableGrid);

  Unit.call(this, settings);
};

SlimePatch.prototype = Object.create(Unit.prototype);
SlimePatch.prototype.constructor = SlimePatch;

const SlimePatchEnemy = function(settings) {

  settings = extend(settings, {
    sprite: Sprites.slimePatchEnemy
  });

  SlimePatch.call(this, settings);
};

SlimePatchEnemy.prototype = Object.create(SlimePatch.prototype);
SlimePatchEnemy.prototype.constructor = SlimePatchEnemy;

