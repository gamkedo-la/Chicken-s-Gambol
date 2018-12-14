const SlimePatch = function(settings) {

  settings = extend(settings, {
    sprite: Sprites.slimePatch,
    clickRadius: 18,
    collisionRange: 19,
    slimeAmount: 30,
    slime: undefined,
    selectionY: TILE_HALF_SIZE / 2
  });

  let slimeAmount = settings.slimeAmount || 30;

  let unwalkableGrid = settings.unwalkableGrid || [1, 1];

  // We use the oldX,oldY because the half-tile shift (for the image) uses the
  // wrong tile-index and we need the upper-left tile + unwalkableGrid
  Grid.updateWalkableGridForBuilding(settings.x, settings.y, unwalkableGrid);

  this.collectSlime = function(amount) {
    slimeAmount -= amount;
    if (slimeAmount <= 0) {
      amount += slimeAmount;

      if (settings.slime && settings.slime.addPatchPosition) {
        settings.slime.addPatchPosition(settings.x, settings.y);
      }

      this.remove();
    }

    return amount;
  };

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

