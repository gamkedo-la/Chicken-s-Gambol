const Goblin = function(team, settings) {

  settings = extend(settings, {
    sprite: Sprites.goblin,
    actionRange: 14,
    attackRange: 180,
    clickRadius: 16,
    unitRanksSpacing: 36,
    footprints: Images.footprints,
    collisionRange: 26,
    speed: 1.75,
    damage: 2,
    maxHealth: 8,
    selectionY: TILE_HALF_SIZE / 2,
    deadBodySprite: Images.deadGoblinImg
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
