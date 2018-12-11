const Barracks = function(settings) {

  settings = extend(settings, {
    sprite: Sprites.barracks,
    clickRadius: 40,
    unwalkableGrid: [2,2]
  });

  BuildingUnit.call(this, settings);
};

Barracks.prototype = Object.create(BuildingUnit.prototype);
Barracks.prototype.constructor = Barracks;

const BarracksEnemy = function(settings) {

  settings = extend(settings, {
    sprite: Sprites.barracksEnemy
  });

  Barracks.call(this, settings);
};

BarracksEnemy.prototype = Object.create(Barracks.prototype);
BarracksEnemy.prototype.constructor = BarracksEnemy;

