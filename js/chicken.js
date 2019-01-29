const Chicken = function(team, settings) {

  settings = extend(settings, {
    sprite: Sprites.chicken,
    actionRange: 14,
    attackRange: 14,
    clickRadius: 16,
    unitRanksSpacing: 36,
    footprints: Images.footprints,
    collisionRange: 26,
    harvestSpeed: 5,
    harvestMax: 25,
    buildSpeed: 1,
    speed: 1.4,
    damage: 3,
    maxHealth: 10,
    selectionY: TILE_HALF_SIZE / 2,
    deadBodySprite: Images.deadChickenImg
  });

  let maxDistanceToFindBuildingOrSlimePatch = 90000;
  let harvested = 0;
  let lastHarvestedPosition;

  this.finishedBuilding = function() {
    this.unsetTarget();
    let newBuilding = this.findNearbyitemInList(
      Game.units,
      this.getPosition(),
      [
        House, Barracks, MudPit,
        HouseEnemy, BarracksEnemy, MudPitEnemy
      ],
      team,
      maxDistanceToFindBuildingOrSlimePatch,
      function(item) {
        return !item.isComplete() || item.isDamaged();
      }
    );

    if (newBuilding) {
      this.setTarget(newBuilding);
    }
  };

  this.childUpdate = function(delta) {
    let target = this.getTarget();
    if (target) {
      if (this.canBuildBuilding(target)) {
        target.addBuildPercentage(settings.buildSpeed * delta);
        lastHarvestedPosition = undefined;
        if(this.getState() != "build"){
          this.setState('build');
        }
        return true;
      }

      if (target.constructor === SlimePatch || target.constructor === SlimePatchEnemy) {
        let returnSlime = false;
        harvested += target.collectSlime(settings.harvestSpeed * delta);
        if(this.getState() != "harvest"){
          this.setState('harvest');
        }
        if (target.isReadyToRemove() && harvested < settings.harvestMax) {
//          console.log('not enough');
          this.setTarget(this.findSlimePatch(this.getPosition()));
          if (!this.getTarget()) {
//            console.log('but not found a new patch');
            returnSlime = true;
          }
//          else {
//            console.log('but found a new patch');
//          }
        }

        if (returnSlime || settings.harvestMax <= harvested) {
//          console.log('return slime', returnSlime, 'or max <= carrying', settings.harvestMax, harvested);
          lastHarvestedPosition = this.getPosition();
          this.setTarget(this.findMudPit(this.getPosition()));
        }

        return true;
      }

      if ((target.constructor === MudPit || target.constructor === MudPitEnemy) && lastHarvestedPosition) {
        Game.addSlime(Math.round(harvested), this.getTeam());

        harvested = 0;

        this.setTarget(this.findSlimePatch(lastHarvestedPosition));

        lastHarvestedPosition = undefined;

        return true;
      }
    }

    return false;
  };

  let buildingConstructors = [
    House, HouseEnemy,
    MudPit, MudPitEnemy,
    Barracks, BarracksEnemy
  ];

  this.canBuildBuilding = function(target) {
    if (!target.isComplete || target.isComplete === undefined) {
      return false;
    }

    return (!target.isComplete() || target.isDamaged()) && (buildingConstructors.indexOf(target.constructor) !== -1);
  };

  this.findMudPit = function(position) {
    if (this.constructor === ChickenEnemy){
      maxDistanceToFindBuildingOrSlimePatch = 9000000;
    }
    return this.findNearbyitemInList(Game.units, position, [MudPit, MudPitEnemy], team);
  };

  this.findSlimePatch = function(position) {
    if (this.constructor === ChickenEnemy){
      maxDistanceToFindBuildingOrSlimePatch = 9000000;
    }
    return this.findNearbyitemInList(Game.units, position, [SlimePatch, SlimePatchEnemy], team, maxDistanceToFindBuildingOrSlimePatch);
  };

  MovingUnit.call(this, team, settings);
};

Chicken.prototype = Object.create(MovingUnit.prototype);
Chicken.prototype.constructor = Chicken;

const ChickenEnemy = function(team, settings) {

  settings = extend(settings, {
    sprite: Sprites.chickenEnemy
  });

  Chicken.call(this, team, settings);
};

ChickenEnemy.prototype = Object.create(Chicken.prototype);
ChickenEnemy.prototype.constructor = ChickenEnemy;
