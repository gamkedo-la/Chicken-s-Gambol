const Chicken = function(settings) {

  settings = extend(settings, {
    sprite: Sprites.chicken,
    actionRangeSquared: 14,
    clickRadius: 16,
    unitRanksSpacing: 36,
    footprints: Images.footprints,
    collisionRange: 26,
    harvestSpeed: 5,
    harvestMax: 25,
    buildSpeed: 5,
    speed: 1.4
  });

  let harvested = 0;
  let lastHarvestedPosition;

  this.finishedBuilding = function() {
    this.unsetTarget();
  };

  this.childUpdate = function(delta) {
    let target = this.getTarget();
    if (target) {
      if (canBuildBuilding(target)) {
        target.addBuildPercentage(settings.buildSpeed * delta);
        lastHarvestedPosition = undefined;

        return true;
      }

      if (target.constructor === SlimePatch) {
        let returnSlime = false;
        harvested += target.collectSlime(settings.harvestSpeed * delta);

        if (target.isReadyToRemove() && harvested < settings.harvestMax) {
          this.setTarget(findSlimePatch(this.getPosition()));
          if (!this.getTarget()) {
            returnSlime = true;
          }
        }

        if (returnSlime || settings.harvestMax <= harvested) {
          lastHarvestedPosition = this.getPosition();
          this.setTarget(findMudPit(this.getPosition()));
        }

        return true;
      }

      if (target.constructor === MudPit && lastHarvestedPosition) {
        Game.addSlime(Math.round(harvested));

        harvested = 0;

        this.setTarget(findSlimePatch(lastHarvestedPosition));

        lastHarvestedPosition = undefined;

        return true;
      }
    }

    return false;
  };

  function canBuildBuilding(target) {
    if (!target.isComplete) {
      return false;
    }

    if (target.isComplete()) {
      return false;
    }

    return (target.constructor === House || target.constructor === MudPit || target.constructor === Barracks);
  }

  function findMudPit(position) {
    return findNearbyitemInList(Game.buildings, position, MudPit);
  }

  function findSlimePatch(position) {
    return findNearbyitemInList(Game.buildings, position, SlimePatch, 90000);
  }

  function findNearbyitemInList(list, position, type, maxDistanceSquared) {
    let item, distance;

    let l = list.length;

    for (let i = 0; i < l; i++) {
      let listItem = list[i];

      if (listItem.constructor !== type) {
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

  MovingUnit.call(this, settings);
};

Chicken.prototype = Object.create(MovingUnit.prototype);
Chicken.prototype.constructor = Chicken;

const ChickenEnemy = function(settings) {

  settings = extend(settings, {
    sprite: Sprites.chickenEnemy
  });

  Chicken.call(this, settings);
};

ChickenEnemy.prototype = Object.create(Chicken.prototype);
ChickenEnemy.prototype.constructor = ChickenEnemy;
