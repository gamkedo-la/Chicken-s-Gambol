const Chicken = function(settings) {

  settings = extend(settings, {
    sprite: Sprites.chicken,
    actionRangeSquared: 14,
    clickRadius: 16,
    unitRanksSpacing: 36,
    footprints: Images.footprints,
    softCollisionRange: 26,
    hardCollisionRange: 13,
    speed: 1.4
  });

  this.childUpdate = function() {
    // @todo replace pseudo-code with actual code
    // if target, then we're already within action range
//    if target is new building: build, return true
//    if target == slime: harvest, return true

//    if has harvest-target (is separate 'target' property)
//    if target === house; empty container, set target to closest slime patch near the harvest-target, return true
//    if harvest full; set target to home, return true
//    if target === slime patch; harvest, return true

    return false;
  };

  MovingUnit.call(this, settings);
};

Chicken.prototype = Object.create(MovingUnit.prototype);
Chicken.prototype.constructor = Chicken;

const ChickenEnemy = function(settings) {

  settings = extend(settings, {
    sprite: Sprites.chickenEnemy
  });

  Chicken.call(this, settings);
};

ChickenEnemy.prototype = Object.create(Chicken.prototype);
ChickenEnemy.prototype.constructor = ChickenEnemy;
