const SlimePatch = function(team, settings) {

  settings = extend(settings, {
    sprite: Sprites.slimePatch,
    state: 'default',
    showHealthbar: false,
    clickRadius: 18,
    canSelect: false,
    collisionRange: 0,
    slimeAmount: 30,
    slime: undefined,
    selectionY: TILE_HALF_SIZE / 2,
    canDamage: false
  });

  let slimeAmount = settings.slimeAmount || 30;

  this.collectSlime = function(amount) {
    slimeAmount -= amount;
    if (slimeAmount <= 0) {
      amount += slimeAmount;

      if (settings.slime && settings.slime.readdPatchPosition) {
        settings.slime.readdPatchPosition(settings.x, settings.y);
      }

      this.remove();
    }

    return amount;
  };

  Unit.call(this, team, settings);
};

SlimePatch.prototype = Object.create(Unit.prototype);
SlimePatch.prototype.constructor = SlimePatch;

const SlimePatchEnemy = function(team, settings) {

  settings = extend(settings, {
    sprite: Sprites.slimePatchEnemy
  });

  SlimePatch.call(this, team, settings);
};

SlimePatchEnemy.prototype = Object.create(SlimePatch.prototype);
SlimePatchEnemy.prototype.constructor = SlimePatchEnemy;

