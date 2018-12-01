const Slime = function(settings) {

  let oldX = settings.x;
  let oldY = settings.y;
  settings.x = settings.x + TILE_HALF_SIZE;
  settings.y = settings.y + TILE_HALF_SIZE;

  settings = extend(settings, {
    sprite: Sprites.slime,
    collisionRange: 46
  });

  let unwalkableGrid = settings.unwalkableGrid || [2, 2];

  // We use the oldX,oldY because the half-tile shift (for the image) uses the
  // wrong tile-index and we need the upper-left tile + unwalkableGrid
  Grid.updateWalkableGridForBuilding(oldX, oldY, unwalkableGrid);

  this._update = function(delta) {
    // grows slime patches
  };

  Unit.call(this, settings);
};

Slime.prototype = Object.create(Unit.prototype);
Slime.prototype.constructor = Slime;

const SlimeEnemy = function(settings) {

  settings = extend(settings, {
    sprite: Sprites.slimeEnemy
  });

  Slime.call(this, settings);
};

SlimeEnemy.prototype = Object.create(Slime.prototype);
SlimeEnemy.prototype.constructor = SlimeEnemy;

