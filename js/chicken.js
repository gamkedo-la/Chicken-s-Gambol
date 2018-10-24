const Chicken = function(settings) {

  settings = extend(settings, {
    sprite: Sprites.chicken,
    clickRadius: 16,
    speed: 5
  });

  Unit.call(this, settings);
};

Chicken.prototype = Object.create(Unit.prototype);
Chicken.prototype.constructor = Chicken;

const ChickenEnemy = function(settings) {

  settings = extend(settings, {
    sprite: Sprites.chickenEnemy
  });

  Chicken.call(this, settings);
};

ChickenEnemy.prototype = Object.create(Chicken.prototype);
ChickenEnemy.prototype.constructor = ChickenEnemy;
