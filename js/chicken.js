const Chicken = function(settings) {

  settings = extend(settings, {
    sprite: Sprites.chicken,
    clickRadius: 56,
    speed: 5
  });


  Unit.call(this, settings);
};

Chicken.prototype = Object.create(Unit.prototype);
Chicken.prototype.constructor = Chicken;


const Chicken2 = function(settings) {

  settings = extend(settings, {
    sprite: Sprites.chicken2,
    clickRadius: 32,
    speed: 5
  });


  Unit.call(this, settings);
};

Chicken2.prototype = Object.create(Unit.prototype);
Chicken2.prototype.constructor = Chicken2;
