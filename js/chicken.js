const Chicken = function(settings) {

  settings = extend(settings, {
    sprite: Sprites.chicken,
    clickRadius: 56
  });


  Unit.call(this, settings);
};

Chicken.prototype = Object.create(Unit.prototype);
Chicken.prototype.constructor = Chicken;
