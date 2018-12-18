const House = function(team, settings) {

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

  BuildingUnit.call(this, team, settings);
};

House.prototype = Object.create(BuildingUnit.prototype);
House.prototype.constructor = House;

const HouseEnemy = function(team, settings) {

  settings = extend(settings, {
    sprite: Sprites.houseEnemy
  });

  House.call(this, team, settings);
};

HouseEnemy.prototype = Object.create(House.prototype);
HouseEnemy.prototype.constructor = HouseEnemy;

