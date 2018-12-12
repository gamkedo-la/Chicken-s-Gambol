const Barracks = function(settings) {

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

  this.queueUnit = function(constructor, button) {
    // Immediately deactivate button, because it's not a toggle
    button.deactivate();

    if (settings.maxQueue <= queue.length) {
      return;
    }

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
    counts[constructor.name]--;

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

    let count = counts[constructor.name] || 0;
    if (count <= 0) {
      return;
    }

    let bounds = button.getBounds();

    drawText(gameContext, bounds.x + bounds.w - 2, bounds.y + bounds.h - 2, FONT_COLOR, BUTTON_COUNT_FONT, 'right', 'bottom', count);

    if (queue[0] === constructor) {
      let percentage = buildTimeoutRemaining / settings.buildTimeout;
      drawFillRect(gameContext, bounds.x, bounds.y + bounds.h - 4, bounds.w * percentage, 4, FONT_COLOR);
    }
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

