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
    buildSpeed: 5,
    speed: 1.4,
    damage: 3,
    maxHealth: 10,
    selectionY: TILE_HALF_SIZE / 2,
    deadBodySprite: Images.deadChickenImg
  });

  let harvested = 0;
  let lastHarvestedPosition;

  this.finishedBuilding = function() {
    this.unsetTarget();
  };

  this.childUpdate = function(delta) {
    let target = this.getTarget();
    if (target) {
      if (this.canBuildBuilding(target)) {
        target.addBuildPercentage(settings.buildSpeed * delta);
        lastHarvestedPosition = undefined;

        return true;
      }

      if (target.constructor === SlimePatch) {
        let returnSlime = false;
        harvested += target.collectSlime(settings.harvestSpeed * delta);

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

      if (target.constructor === MudPit && lastHarvestedPosition) {
        Game.addSlime(Math.round(harvested), this.getTeam());

        harvested = 0;

        this.setTarget(this.findSlimePatch(lastHarvestedPosition));

        lastHarvestedPosition = undefined;

        return true;
      }
    }

    return false;
  };

  this.canBuildBuilding = function(target) {
    if (!target.isComplete || target.isComplete == undefined) {
      return false;
    }

    return !target.isComplete() && (target.constructor === House || target.constructor === MudPit || target.constructor === Barracks);
  }

   this.findMudPit = function(position) {
    return this.findNearbyitemInList(Game.units, position, MudPit);
  }

  this.findSlimePatch = function(position) {
    return this.findNearbyitemInList(Game.units, position, SlimePatch, 90000);
  }

  this.findNearbyitemInList = function(list, position, type, maxDistanceSquared) {
    let item, distance;

    let l = list.length;

    for (let i = 0; i < l; i++) {
      let listItem = list[i];

      if (listItem.constructor !== type) {
        continue;
      }

      if (listItem.getTeam() !== team) {
        continue;
      }

      if (item === undefined) {
        distance = distanceBetweenPointsSquared(position, listItem.getPosition());
        if (maxDistanceSquared && maxDistanceSquared < distance) {
          continue;
        }

        item = listItem;
        continue;
      }

      let distance2 = distanceBetweenPointsSquared(position, listItem.getPosition());

      if (maxDistanceSquared && maxDistanceSquared < distance && distance2 < distance) {
        item = listItem;
        distance = distance2;
      }
    }

    return item;
  }
  
  this.getHarvestSpeed = function(){
	  return settings.harvestSpeed;
  }

  MovingUnit.call(this, team, settings);
};

Chicken.prototype = Object.create(MovingUnit.prototype);
Chicken.prototype.constructor = Chicken;

const ChickenEnemy = function(team, settings) {

  settings = extend(settings, {
    sprite: Sprites.chickenEnemy
  });
  
  this.findSlimePatchEnemy = function(position, list) {
    return this.findNearbyitemInList(list, position, SlimePatchEnemy, 9000000);
  }
  
  function findMudPitEnemy(position) {
    return this.findNearbyitemInList(Game.units, position, MudPitEnemy, 9000000);
  }

  Chicken.call(this, team, settings);
  
  this.childUpdate = function(delta) {
	console.log(this.harvested);
    let target = this.getTarget();
    if (target) {
      if (this.canBuildBuilding(target)) {
        target.addBuildPercentage(settings.buildSpeed * delta);
        lastHarvestedPosition = undefined;

        return true;
      }

      if (target.constructor === SlimePatchEnemy) {
        let returnSlime = false;
		//console.log(ChickenEnemy.settings.harvestSpeed);
        this.harvested += target.collectSlime(this.getHarvestSpeed(this) * delta);

        if (target.isReadyToRemove() && this.harvested < settings.harvestMax) {
//          console.log('not enough');
          this.setTarget(findSlimePatchEnemy(this.getPosition()));
          if (!this.getTarget()) {
//            console.log('but not found a new patch');
            returnSlime = true;
          }
//          else {
//            console.log('but found a new patch');
//          }
        }

        if (returnSlime || settings.harvestMax <= this.harvested) {
//          console.log('return slime', returnSlime, 'or max <= carrying', settings.harvestMax, this.harvested);
          lastHarvestedPosition = this.getPosition();
          this.setTarget(findMudPitEnemy(this.getPosition()));
        }

        return true;
      }

      if (target.constructor === MudPitEnemy && lastHarvestedPosition) {
        Game.addSlime(Math.round(this.harvested), this.getTeam());

        this.harvested = 0;

        this.setTarget(findSlimePatchEnemy(lastHarvestedPosition));

        lastHarvestedPosition = undefined;

        return true;
      }
    }

    return false;
  };
};

ChickenEnemy.prototype = Object.create(Chicken.prototype);
ChickenEnemy.prototype.constructor = ChickenEnemy;
