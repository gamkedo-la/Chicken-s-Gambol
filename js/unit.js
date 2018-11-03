const Unit = function(settings) {

  this.sprite = false;
  if (settings.sprite) {
    this.sprite = new Sprite(settings.sprite);
  }

  const clickRadius = settings.clickRadius;
  const clickRadiusSquared = clickRadius * clickRadius;
  const softCollisionRange = settings.softCollisionRange || clickRadius * 1.3;
  const hardCollisionRange = settings.hardCollisionRange || clickRadius;

  this.x = settings.x;
  this.y = settings.y;

  let readyToRemove = false;
  let enabled = true;
  let isSelected = false;
  let visible = false;

  let followers = [];

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

  this.select = function() {
    isSelected = true;
  };

  this.deselect = function() {
    isSelected = false;
  };

  this.getPosition = function() {
    return {
      x: this.x,
      y: this.y
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
    return ((this.x - point1.x) * (this.x - point2.x) < 0) &&
      ((this.y - point1.y) * (this.y - point2.y) < 0);
  };

  this.disable = function() {
    enabled = false;
  };

  this.enable = function() {
    enabled = true;
  };

  this.isEnabled = function() {
    return enabled;
  };

  this.isVisible = function() {
    return visible;
  };

  this.isClickPositionHit = function(clickPosition) {
    return distanceBetweenPointsSquared(this.getPosition(), clickPosition) < clickRadiusSquared;
  };

  this.update = function(delta) {
    if (!enabled) {
      return;
    }

    if (this._update) {
      this._update(delta);
    }

    if (this.sprite) {
      this.sprite.update(delta);
    }

    let gridBounds = Grid.getBounds();
    visible = (this.isInBox(gridBounds.topLeft, gridBounds.bottomRight));

    if (readyToRemove) {
      Game.scheduleRemoveDeadUnits();
    }
  };

  this.draw = function(interpolationPercentage) {
    if (!visible) {
      return;
    }

    if (this._draw) {
      this._draw(interpolationPercentage);
    }

    if (this.sprite) {
      this.sprite.drawAt(this.getPosition());
    }

    if (DEBUG) {
      drawStrokeCircle(gameContext, this.x, this.y, clickRadius, 100, 'green', 1);
      drawStrokeCircle(gameContext, this.x, this.y, softCollisionRange, 100, 'red', 1);
      drawStrokeCircle(gameContext, this.x, this.y, hardCollisionRange, 100, 'red', 1);
    }
    if (isSelected) {
      drawStrokeCircle(gameContext, this.x, this.y, clickRadius, 100, SELECTED_COLOR, 2);
    }
  };

  this.minimapDraw = function(mapW, mapH, color) {
    let mapX = Grid.returnMinimapX(this.x, mapW);
    let mapY = Grid.returnMinimapY(this.y, mapH);
    drawFillRect(gameContext, mapX, mapY, 2, 2, color);
  }

};
