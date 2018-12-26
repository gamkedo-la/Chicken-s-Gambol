const Slime = function(team, settings) {

  settings = extend(settings, {
    sprite: Sprites.slime,
    state: 'default',
    clickRadius: 40,
    canSelect: false,
    collisionRange: 46,
    showHealthbar: true,
    patchGrowTimeoutSeconds: 10,
    maxGrowDistance: 8,
    unwalkableGrid: [3, 2],
    maxHealth: 500
  });

  let maxGrowDistanceSquared = Math.pow(settings.maxGrowDistance * TILE_SIZE, 2);

  let growablePatches = [];
  let patchGrowTimeoutRemaining = 1;

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
          addPatchPosition(dx - TILE_HALF_SIZE, dy, distance);
        }
      }
    }

    if (0 < growablePatches.length) {
      // @todo make this basic shuffle more intelligent: nearer spots should be picked first
	  growablePatches.sort(function(a, b){
		if (a.distanceFromSlime === b.distanceFromSlime){
		  return 0;
		} else if(a.distanceFromSlime < b.distanceFromSlime) {
		  return -1;
		} else if (a.distanceFromSlime > b.distanceFromSlime) {
		  return 1;
		}
	  });
    }
  }

  this.readdPatchPosition = function(x, y) {
    if (growablePatches.length === 0) {
      patchGrowTimeoutRemaining = settings.patchGrowTimeoutSeconds;
    }

    addPatchPosition(x, y);
  };

  this._update = function(delta) {
    patchGrowTimeoutRemaining -= delta;
    if (patchGrowTimeoutRemaining <= 0) {
      patchGrowTimeoutRemaining += settings.patchGrowTimeoutSeconds;
      growPatch(this);
    }
  };

  function addPatchPosition(x, y, distanceFromSlime) {
    let length = growablePatches.length;
    for (let i = 0; i < length; i++) {
      if (growablePatches[i].x === x && growablePatches[i].y === y) {
        return;
      }
    }

    growablePatches.push({ x: x, y: y, distanceFromSlime: distanceFromSlime });
  }

  function growPatch(slime) {
    findGrowablePatches();

    if (growablePatches.length <= 0) {
      // All possible patches are placed!
      return;
    }

    let patch = growablePatches.shift();

    if (!Grid.isWalkableCoords(patch.x, patch.y)) {
      return growPatch(slime);
    }

    patch.slime = slime;

    Game.create(SlimePatch, team, patch);
  }

  this._draw = function() {
    if (DEBUG) {
      drawStrokeCircle(gameContext, this.x, this.y, settings.maxGrowDistance * TILE_SIZE, 100, 'cyan', 1);

      let len = growablePatches.length;
      for (let i = 0; i < len; i++) {
        drawFillRect(gameContext, growablePatches[i].x - 1, growablePatches[i].y - 1, 3, 3, 'cyan', 1);
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

