const Slime = function(team, settings) {

  let oldX = settings.x;
  let oldY = settings.y;
  settings.x = settings.x + TILE_HALF_SIZE;
  settings.y = settings.y + TILE_HALF_SIZE;

  settings = extend(settings, {
    sprite: Sprites.slime,
    state: 'default',
    collisionRange: 46,
    showHealthbar: false,
    patchGrowTimeoutSeconds: 10,
    maxGrowDistance: 8
  });

  let maxGrowDistanceSquared = Math.pow(settings.maxGrowDistance * TILE_SIZE, 2);

  let growablePatches = [];
  let unwalkableGrid = settings.unwalkableGrid || [2, 2];
  let patchGrowTimeoutRemaining = 1;

  // We use the oldX,oldY because the half-tile shift (for the image) uses the
  // wrong tile-index and we need the upper-left tile + unwalkableGrid
  Grid.updateWalkableGridForBuilding(oldX, oldY, unwalkableGrid);

  function findGrowablePatches() {
    if (0 < growablePatches.length) {
      return;
    }

    let worldDimensions = Grid.getWorldDimensions();
    let maxGrowDistance = settings.maxGrowDistance * TILE_SIZE;

    let minX = Math.max(0, settings.x - maxGrowDistance - 1) + TILE_HALF_SIZE;
    let maxX = Math.min(worldDimensions.cols * TILE_SIZE, settings.x + maxGrowDistance) - TILE_HALF_SIZE;
    let minY = Math.max(0, settings.y - maxGrowDistance - 1) + TILE_HALF_SIZE;
    let maxY = Math.min(worldDimensions.rows * TILE_SIZE, settings.y + maxGrowDistance) - TILE_HALF_SIZE;

    for (let dx = minX; dx <= maxX; dx += TILE_SIZE) {
      for (let dy = minY; dy <= maxY; dy += TILE_SIZE) {
        let distance = Math.pow(dx - settings.x, 2) + Math.pow(dy - settings.y, 2);
        if (distance <= maxGrowDistanceSquared && Grid.isWalkableCoords(dx, dy)) {
          growablePatches.push({x: dx, y: dy});
        }
      }
    }

    // @todo make this basic shuffle more intelligent: nearer spots should be picked first
    growablePatches = shuffle(growablePatches);
  }

  this.addPatchPosition = function(x, y) {
    growablePatches.push({x: x, y: y});
  };

  this._update = function(delta) {
    patchGrowTimeoutRemaining -= delta;
    if (patchGrowTimeoutRemaining <= 0) {
      patchGrowTimeoutRemaining += settings.patchGrowTimeoutSeconds;
      growPatch();
    }
  };

  function growPatch() {
    findGrowablePatches();

    if (growablePatches.length <= 0) {
      // All possible patches are placed!
      return;
    }

    let patch = growablePatches.shift();

    if (!Grid.isWalkableCoords(patch.x, patch.y)) {
      return growPatch();
    }

    patch.slime = this;

    Game.create(SlimePatch, team, patch);
  }

  this._draw = function() {
    if (DEBUG) {
      drawStrokeCircle(gameContext, this.x, this.y, settings.maxGrowDistance * TILE_SIZE, 100, 'cyan', 1);

      let len = growablePatches.length;
      for (let i = 0; i < len; i++) {
        drawStrokeRect(gameContext, growablePatches[i][0], growablePatches[i][1], 2, 2, 'red', 1);
      }
    }
  };

  BuildingUnit.call(this, team, settings);
};

Slime.prototype = Object.create(BuildingUnit.prototype);
Slime.prototype.constructor = Slime;

const SlimeEnemy = function(team, settings) {

  settings = extend(settings, {
    sprite: Sprites.slimeEnemy
  });

  Slime.call(this, team, settings);
};

SlimeEnemy.prototype = Object.create(Slime.prototype);
SlimeEnemy.prototype.constructor = SlimeEnemy;

