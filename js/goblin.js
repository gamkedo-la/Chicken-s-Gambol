const Goblin = function(settings) {

  settings = extend(settings, {
    sprite: Sprites.goblin,
    actionRangeSquared: 14,
    clickRadius: 16,
    unitRanksSpacing: 36,
    footprints: Images.footprints,
    collisionRange: 26,
    speed: 1.75,
    selectionY: TILE_HALF_SIZE / 2
  });

  MovingUnit.call(this, settings);
};

Goblin.prototype = Object.create(MovingUnit.prototype);
Goblin.prototype.constructor = Goblin;

const GoblinEnemy = function(settings) {

  settings = extend(settings, {
    sprite: Sprites.goblinEnemy
  });

  Goblin.call(this, settings);
};

GoblinEnemy.prototype = Object.create(Goblin.prototype);
GoblinEnemy.prototype.constructor = GoblinEnemy;
