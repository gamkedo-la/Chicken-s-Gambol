const Goblin = function(team, settings) {

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

  MovingUnit.call(this, team, settings);
};

Goblin.prototype = Object.create(MovingUnit.prototype);
Goblin.prototype.constructor = Goblin;

const GoblinEnemy = function(team, settings) {

  settings = extend(settings, {
    sprite: Sprites.goblinEnemy
  });

  Goblin.call(this, team, settings);
};

GoblinEnemy.prototype = Object.create(Goblin.prototype);
GoblinEnemy.prototype.constructor = GoblinEnemy;
