const House = function(settings) {

  settings = extend(settings, {
    sprite: Sprites.house,
    clickRadius: 40,
    unwalkableGrid: [2,2]
  });

  BuildingUnit.call(this, settings);
};

House.prototype = Object.create(BuildingUnit.prototype);
House.prototype.constructor = House;

const HouseEnemy = function(settings) {

  settings = extend(settings, {
    sprite: Sprites.HouseEnemy
  });

  House.call(this, settings);
};

HouseEnemy.prototype = Object.create(House.prototype);
HouseEnemy.prototype.constructor = HouseEnemy;

