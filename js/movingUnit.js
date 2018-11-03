const MovingUnit = function(settings) {

  let footprints = false;
  if (settings.footprints) {
    //console.log("This unit leaves footprints!");
    footprints = settings.footprints;
  }

  const speed = settings.speed || 0;
  const rotationEase = settings.rotationEase || 0.6;
  const unitRanksSpacing = settings.unitRanksSpacing || clickRadius * 2.25;

  let footprintPositions = false;
  const footprintMax = settings.footprintMax || 50;
  const footprintSpacing = settings.footprintSpacing || 8;
  const footprintSpacingSquared = footprintSpacing * footprintSpacing;

  let vx = settings.vx || 0;
  let vy = settings.vy || 0;
  let angle = 0;
  let unitsAlongSide = 0;
  let formationIndex = 0;

  let target;

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

  this.getTargetPosition = function() {
    // @todo figure out how to position the formation relative to the approach-angle
    let targetPosition = target.getPosition();
    let rowNum = formationIndex % unitsAlongSide;
    let colNum = Math.floor(formationIndex / unitsAlongSide);
    targetPosition.x = targetPosition.x + colNum * unitRanksSpacing;
    targetPosition.y = targetPosition.y + rowNum * unitRanksSpacing;

    return targetPosition;
  };

  this._update = function(delta) {
    if (target) {
      let targetPosition = this.getTargetPosition();
      let newVs = rotateToTarget(vx, vy, speed, rotationEase, targetPosition, this.getPosition());
      angle = newVs.angle;
      if (0 < newVs.dist && speed < newVs.dist) {
        vx = newVs.vx;
        vy = newVs.vy;
        this.sprite.setState(getMoveStateByAngle());
      }
      else {
        this.x = targetPosition.x;
        this.y = targetPosition.y;
        vx = 0;
        vy = 0;
        if (target.constructor === FakeTarget) {
          this.unsetTarget();
          this.sprite.setState('default');
        }
      }
    }

    this.x += vx;
    this.y += vy;

    if (footprints) {
      this.updateFootprints();
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
    if (!footprintPositions) { // first frame init
      footprintPositions = [this.getPosition()];
    }

    let pos = this.getPosition();
    let dist = distanceBetweenPointsSquared(pos, footprintPositions[footprintPositions.length - 1]);

    if (footprintSpacingSquared <= dist) {
      //console.log("time for a new footprint because dist =" + dist);
      pos.angle = angle;
      footprintPositions.push(pos);
      if (footprintMax <= footprintPositions.length) {
        footprintPositions.shift();
      }
    }
  };

  this.drawFootprints = function() {
    //console.log("drawing footprints!");
    if (!footprintPositions) {
      return;
    }

    let length = footprintPositions.length;
    for (let i = 0; i < length; i++) {
      drawImageRotatedAlpha(gameContext, footprints, footprintPositions[i].x, footprintPositions[i].y, footprintPositions[i].angle, i / length);
    }
  };

  this._draw = function(interpolationPercentage) {
    if (footprints) {
      this.drawFootprints();
    }

    if (DEBUG) {
      drawLines(gameContext, 'red', 1, [
        { x: this.x, y: this.y },
        { x: this.x + Math.cos(angle) * 20, y: this.y + Math.sin(angle) * 20 }
      ]);
    }
  };

  Unit.call(this, settings);
};

MovingUnit.prototype = Object.create(Unit.prototype);
MovingUnit.prototype.constructor = MovingUnit;
