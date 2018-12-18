const MudPit = function(team, settings) {

  settings = extend(settings, {
    sprite: Sprites.mudPit,
    clickRadius: 40,
    unwalkableGrid: [2,2]
  });

  BuildingUnit.call(this, team, settings);
};

MudPit.prototype = Object.create(BuildingUnit.prototype);
MudPit.prototype.constructor = MudPit;

const MudPitEnemy = function(team, settings) {

  settings = extend(settings, {
    sprite: Sprites.mudPitEnemy
  });

  MudPit.call(this, team, settings);
};

MudPitEnemy.prototype = Object.create(MudPit.prototype);
MudPitEnemy.prototype.constructor = MudPitEnemy;

