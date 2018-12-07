const MudPit = function(settings) {

  settings = extend(settings, {
    sprite: Sprites.mudPit,
    clickRadius: 40,
    unwalkableGrid: [2,2]
  });

  BuildingUnit.call(this, settings);
};

MudPit.prototype = Object.create(BuildingUnit.prototype);
MudPit.prototype.constructor = MudPit;

const MudPitEnemy = function(settings) {

  settings = extend(settings, {
    sprite: Sprites.mudPitEnemy
  });

  MudPit.call(this, settings);
};

MudPitEnemy.prototype = Object.create(MudPit.prototype);
MudPitEnemy.prototype.constructor = MudPitEnemy;

