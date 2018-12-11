const Barracks = function(settings) {

  settings = extend(settings, {
    sprite: Sprites.barracks,
    clickRadius: 40,
    unwalkableGrid: [2,2],
    buildTimeout: 2 // 10
  });

  let queue = [];
  let buildTimeoutRemaining = 0;

  this.queueUnit = function(constructor, button) {
    if (queue.length === 0) {
      buildTimeoutRemaining = settings.buildTimeout;
    }
    queue.push(constructor);
    button.deactivate();
  };

  this._update = function (delta) {
    if (queue.length === 0) {
      return;
    }

    buildTimeoutRemaining -= delta;

    if (0 < buildTimeoutRemaining) {
      return;
    }

    let constructor = queue.shift();

    // @todo which location?
    let unitSettings = {
      x: 100,
      y: 100
    };
//    Game.createUnit(constructor, unitSettings);
    console.log('create ', constructor);

    if (queue.length === 0) {
      buildTimeoutRemaining = 0;
      return;
    }

    buildTimeoutRemaining += settings.buildTimeout;
  };

  this.showButtonBuildProgress = function(constructor, button) {
    if (queue.length === 0) {
      return;
    }

    if (0 < buildTimeoutRemaining) {
//      console.log('time remaining', Math.round(buildTimeoutRemaining / settings.buildTimeout * 100));
    }

    // @todo show build-percentags
    // @todo show remaining count
  };

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

