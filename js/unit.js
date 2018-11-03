const Unit = function(settings) {

  let sprite = false;
  if (settings.sprite) {
    sprite = new Sprite(settings.sprite);
  }

  let footprints = false;
  if (settings.footprints) {
    //console.log("This unit leaves footprints!");
    footprints = settings.footprints;
  }

  const speed = settings.speed || 0;
  const rotationEase = settings.rotationEase || 0.6;
  const clickRadius = settings.clickRadius;
  const clickRadiusSquared = clickRadius * clickRadius;
  const unitRanksSpacing = settings.unitRanksSpacing || clickRadius * 2.25;
  const softCollisionRange = settings.softCollisionRange || clickRadius * 1.3;
  const hardCollisionRange = settings.hardCollisionRange || clickRadius;

  let x = settings.x;
  let y = settings.y;
  let vx = settings.vx || 0;
  let vy = settings.vy || 0;
  let angle = 0;
  let unitsAlongSide = 0;
  let formationIndex = 0;

  let readyToRemove = false;
  let enabled = true;
  let isSelected = false;

  let followers = [];
  let target;

  this.addFollower = function(unit) {
    followers.push(unit);
  };

  this.removeFollower = function(unit) {
    let l = followers.length;
    for (let i = 0; i < l; i++) {
      if (followers[i] === unit) {
        followers.splice(i, 1);
        return;
      }
    }
  };

  this.setTarget = function(unit, _unitsAlongSide, _formationIndex) {
    if (!unit) {
      return;
    }

    if (unit.addFollower) {
      unit.addFollower(this);
    }

    if (target) {
      this.unsetTarget();
    }

    target = unit;
    unitsAlongSide = _unitsAlongSide;
    formationIndex = _formationIndex;
  };

  this.unsetTarget = function() {
    if (target && target.removeFollower) {
      target.removeFollower(this);
    }
    target = undefined;
  };

  this.select = function() {
    isSelected = true;
  };

  this.deselect = function() {
    isSelected = false;
  };

  this.getPosition = function() {
    return {
      x: x,
      y: y
    };
  };

  this.getCollisionRanges = function() {
    return {
      soft: softCollisionRange,
      hard: hardCollisionRange
    };
  };

  this.isReadyToRemove = function() {
    return readyToRemove;
  };

  this.isInBox = function(point1, point2) {
    return ((x - point1.x) * (x - point2.x) < 0) &&
      ((y - point1.y) * (y - point2.y) < 0);
  };

  this.disable = function() {
    enabled = false;
  };

  this.enable = function() {
    enabled = true;
  };

  this.isClickPositionHit = function(clickPosition) {
    return distanceBetweenPointsSquared(this.getPosition(), clickPosition) < clickRadiusSquared;
  };

  this.getTargetPosition = function() {
    // @todo figure out how to position relative to the approach-angle
    let targetPosition = target.getPosition();
    let rowNum = formationIndex % unitsAlongSide;
    let colNum = Math.floor(formationIndex / unitsAlongSide);
    targetPosition.x = targetPosition.x + colNum * unitRanksSpacing;
    targetPosition.y = targetPosition.y + rowNum * unitRanksSpacing;

    return targetPosition;
  };

  this.update = function(delta) {
    if (!enabled) {
      return;
    }

    // https://github.com/adityaravishankar/command-and-conquer/blob/master/js/cnc.js#L2581
    if (target) {
      let targetPosition = this.getTargetPosition();
      let newVs = rotateToTarget(vx, vy, speed, rotationEase, targetPosition, this.getPosition());
      angle = newVs.angle;
      if (0 < newVs.dist && speed < newVs.dist) {
        vx = newVs.vx;
        vy = newVs.vy;
        sprite.setState(getMoveStateByAngle());
      }
      else {
        x = targetPosition.x;
        y = targetPosition.y;
        vx = 0;
        vy = 0;
        if (target.constructor === FakeTarget) {
          this.unsetTarget();
          sprite.setState('default');
        }
      }
    }

    x = x + vx;
    y = y + vy;

    if (sprite) {
      sprite.update(delta);
    }

    if (footprints) {
      this.updateFootprints();
    }

    if (readyToRemove) {
      Game.scheduleRemoveDeadUnits();
    }
  };

  function getMoveStateByAngle() {
    if (angle < 0) {
      angle += ANGLE360;
    }
    if (ANGLE35 < angle && angle < ANGLE145) {
      return 'moveDown';
    }

    if (ANGLE145 <= angle && angle <= ANGLE235) {
      return 'moveLeft';
    }

    if (ANGLE235 < angle && angle < ANGLE305) {
      return 'moveUp';
    }

    return 'moveRight';
  }

  this.updateFootprints = function() {
    //console.log("updating footprints!");

    if (!this.footprintPositions) { // first frame init
      this.footprintPositions = [this.getPosition()];
      this.footprintMax = 50;
      this.footprintSpacingSquared = 8 * 8; // pixels
    }

    let pos = this.getPosition();
    let dist = distanceBetweenPointsSquared(pos, this.footprintPositions[this.footprintPositions.length - 1]);

    if (dist >= this.footprintSpacingSquared) {
      //console.log("time for a new footprint because dist =" + dist);
      this.footprintPositions.push(pos);
      if (this.footprintPositions.length >= this.footprintMax) {
        this.footprintPositions.shift();
      }
    }
  };

  this.drawFootprints = function() {
    //console.log("drawing footprints!");
    if (!this.footprintPositions) {
      return;
    }
    for (let i = 0; i < this.footprintPositions.length; i++) {
      gameContext.globalAlpha = i / this.footprintPositions.length;
      drawImage(gameContext, footprints, this.footprintPositions[i].x, this.footprintPositions[i].y);
    }
    gameContext.globalAlpha = 1;
  };

  this.draw = function(interpolationPercentage) {
    let gridBounds = Grid.getBounds();
    if (!this.isInBox(gridBounds.topLeft, gridBounds.bottomRight)) {
      return;
    }

    if (footprints) {
      this.drawFootprints();
    }

    if (sprite) {
      sprite.drawAt(this.getPosition());
    }

    if (DEBUG) {
      drawStrokeCircle(gameContext, x, y, clickRadius, 100, 'green', 1);
      drawStrokeCircle(gameContext, x, y, softCollisionRange, 100, 'red', 1);
      drawStrokeCircle(gameContext, x, y, hardCollisionRange, 100, 'red', 1);
      drawLines(gameContext, 'red', 1, [
        { x: x, y: y },
        { x: x + Math.cos(angle) * 20, y: y + Math.sin(angle) * 20 }
      ]);
    }
    if (isSelected) {
      drawStrokeCircle(gameContext, x, y, clickRadius, 100, SELECTED_COLOR, 2);
    }
  };

  this.minimapDraw = function(mapW, mapH, color) {
    let mapX = Grid.returnMinimapX(x, mapW);
    let mapY = Grid.returnMinimapY(y, mapH);
    drawFillRect(gameContext, mapX, mapY, 2, 2, color);
  }

};
