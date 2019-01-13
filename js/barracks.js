const Barracks = function(team, settings) {

  settings = extend(settings, {
    sprite: Sprites.barracks,
    clickRadius: 40,
    unwalkableGrid: [2,2],
    maxQueue: 10,
    buildTimeout: 2 // 10
  });

  let queue = [];
  let counts = [];
  let buildTimeoutRemaining = 0;

  this.queueUnit = function(constructor) {
    if (settings.maxQueue <= queue.length) {
      return;
    }

    if (!this.isComplete()){
      return;
    }

    // @todo check for available slime with Game.hasAmountOfSlimeAvailable

    if (queue.length === 0) {
      buildTimeoutRemaining = settings.buildTimeout;
    }
    queue.push(constructor);

    if (!counts[constructor.name]) {
      counts[constructor.name] = 0;
    }
    counts[constructor.name]++;
  };

  this._update = function (delta) {
    if (queue.length === 0) {
      return;
    }

    if (0 < buildTimeoutRemaining) {
      buildTimeoutRemaining -= delta;

      return;
    }

    if (!Game.canCreateUnit(this.getTeam())) {
      return;
    }

    if (!Game.hasAmountOfSlimeAvailable(COSTS[queue[0].name], this.getTeam())) {
      return;
    }

    let constructor = queue.shift();

    Game.subSlime(COSTS[constructor.name], this.getTeam());

    Game.create(constructor, team, getSpawnPosition());
    counts[constructor.name]--;

    if (queue.length === 0) {
      buildTimeoutRemaining = 0;
      return;
    }

    buildTimeoutRemaining += settings.buildTimeout;
  };

  function getSpawnPosition() {
    let spawnPosition = {
      x: settings.x + 48,
      y: settings.y + 48
    };

    let unit = Game.findUnitAtPosition(spawnPosition);
    if (unit) {
      // move unit away or pick a different spot?
    }

    return spawnPosition;
  }

  this.getQueue = function(){
    return queue;
  }

  this._draw = function() {
    if (DEBUG) {
      let p = getSpawnPosition();
      drawFillRect(gameContext, p.x - 2, p.y - 2, 4, 4, 'red');
    }
  };

  this.showButtonBuildProgress = function(constructor, button) {
    if (queue.length === 0) {
      return;
    }

    let count = counts[constructor.name] || 0;
    if (count <= 0) {
      return;
    }

    let bounds = button.getBounds();

    drawTextWithShadow(gameContext, bounds.x + bounds.w - 2, bounds.y + bounds.h - 2, FONT_COLOR, BUTTON_COUNT_FONT, 'right', 'bottom', count);

    if (queue[0] === constructor) {
      let percentage = buildTimeoutRemaining / settings.buildTimeout;
      drawFillRect(gameContext, bounds.x, bounds.y + bounds.h - 4, bounds.w * percentage, 4, FONT_COLOR);
    }
  };

  BuildingUnit.call(this, team, settings);
};

Barracks.prototype = Object.create(BuildingUnit.prototype);
Barracks.prototype.constructor = Barracks;

const BarracksEnemy = function(team, settings) {

  settings = extend(settings, {
    sprite: Sprites.barracksEnemy
  });

  Barracks.call(this, team, settings);
};

BarracksEnemy.prototype = Object.create(Barracks.prototype);
BarracksEnemy.prototype.constructor = BarracksEnemy;

