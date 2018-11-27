const Goblin = function(settings) {

  settings = extend(settings, {
    sprite: Sprites.goblin,
    actionRangeSquared: 14,
    clickRadius: 16,
    unitRanksSpacing: 36,
    footprints: Images.footprints,
    softCollisionRange: 26,
    hardCollisionRange: 13,
    speed: 1.4
  });

  this.childUpdate = function() {

    return false;
  };

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