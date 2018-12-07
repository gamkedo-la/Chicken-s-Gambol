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

  this.childUpdate = function(delta) {
    let target = this.getTarget();
    if (target) {
      if (canBuildBuilding(target)) {
        if (!target.isComplete()) {
          target.addBuildPercentage(settings.buildSpeed * delta);
        }
        else {
          this.unsetTarget();
        }

        return true;
      }

      if (target.constructor === SlimePatch) {
        harvested += target.collectSlime(settings.harvestSpeed * delta);
        console.log('harvested:', harvested);

        if (target.isReadyToRemove() && harvested < settings.harvestMax) {
          console.log('depleted slime patch, find a new slime patch!');
          // @todo find a new slime patch nearby
          this.unsetTarget();
        }

        if (settings.harvestMax <= harvested) {
          lastHarvestedPosition = this.getPosition();

          console.log('find a mudPit building nearby');
          // @todo find a mudPit building nearby
          this.unsetTarget();
        }

        return true;
      }

      if (target.constructor === MudPit) {
        // dump harvest, then return to patch (nearby)
        // find a slime-patch at or near lastHarvestedPosition
        return true;
      }
    }
    // if target, then we're already within action range
//    if target is new building: build, return true
//    if target == slime: harvest, return true

//    if has harvest-target (is separate 'target' property, because we need to continue harvesting, even after emptying the container)
//    if target === house; empty container, set target to closest slime patch near the harvest-target, return true
//    if harvest full; set target to home, return true
//    if target === slime patch; harvest, return true

    return false;
  };

  function canBuildBuilding(target) {
    if (!target.isComplete) {
      return false;
    }

    return (target.constructor === House || target.constructor === MudPit);// || target.constructor === Barracks);
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
