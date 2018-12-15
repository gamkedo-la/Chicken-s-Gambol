const House = function(settings) {

  settings = extend(settings, {
    sprite: Sprites.house,
    clickRadius: 40,
    unwalkableGrid: [2,2],
    providesNumUnits: 5
  });

  this._setComplete = function() {
    Game.addMaxNumUnits(settings.providesNumUnits);
  };

  this._remove = function() {
    Game.subMaxNumUnits(settings.providesNumUnits);
  };

  BuildingUnit.call(this, settings);
};

House.prototype = Object.create(BuildingUnit.prototype);
House.prototype.constructor = House;

const HouseEnemy = function(settings) {

  settings = extend(settings, {
    sprite: Sprites.houseEnemy
  });

  House.call(this, settings);
};

HouseEnemy.prototype = Object.create(House.prototype);
HouseEnemy.prototype.constructor = HouseEnemy;

