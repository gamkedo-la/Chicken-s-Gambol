const Pig = function(team, settings) {

  settings = extend(settings, {
    sprite: Sprites.pig,
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

Pig.prototype = Object.create(MovingUnit.prototype);
Pig.prototype.constructor = Pig;

const PigEnemy = function(team, settings) {

  settings = extend(settings, {
    sprite: Sprites.pigEnemy
  });

  Pig.call(this, team, settings);
};

PigEnemy.prototype = Object.create(Pig.prototype);
PigEnemy.prototype.constructor = PigEnemy;
