const Chicken = function(settings) {

  settings = extend(settings, {
    sprite: Sprites.chicken,
    clickRadius: 16,
    unitRanksSpacing: 36,
    footprints: Images.footprints,
    softCollisionRange: 26,
    hardCollisionRange: 13,
    speed: 1.4
  });

  Unit.call(this, settings);
};

Chicken.prototype = Object.create(Unit.prototype);
Chicken.prototype.constructor = Chicken;

const ChickenEnemy = function(settings) {

  settings = extend(settings, {
    sprite: Sprites.chickenEnemy,
    footprints: Images.footprints
  });

  Chicken.call(this, settings);
};

ChickenEnemy.prototype = Object.create(Chicken.prototype);
ChickenEnemy.prototype.constructor = ChickenEnemy;
