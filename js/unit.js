const Unit = function(settings) {

  let sprite = false;
  if (settings.sprite) {
    sprite = new Sprite(settings.sprite);
  }

  const clickRadius = settings.clickRadius;
  const clickRadiusSquared = clickRadius * clickRadius;
  const softCollisionRange = settings.softCollisionRange || clickRadius * 1.3;
  const hardCollisionRange = settings.hardCollisionRange || clickRadius;

  this.x = Math.round(settings.x);
  this.y = Math.round(settings.y);

  let readyToRemove = false;
  let enabled = true;
  let isSelected = false;
  let visible = false;

  let followers = [];

  let state;

  this.isEnemy = function() {
    return unitIsInList(this, Game.enemies);
  };

  this.getState = function() {
    return state;
  };

  this.setState = function(_state) {
    // @todo verify _state?
    if (state !== _state) {
      if (DEBUG) {
        console.log('switching to ' + _state);
      }
      state = _state;

      if (sprite) {
        sprite.setState(state);
      }
    }
  };
  this.setState(settings.state || 'default');

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
      x: Math.round(this.x),
      y: Math.round(this.y)
    };
  };

  this.getCollisionRanges = function() {
    return {
      soft: softCollisionRange,
      hard: hardCollisionRange
    };
  };

  this.remove = function() {
    readyToRemove = true;
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

    if (sprite) {
      sprite.update(delta);
    }

    // just for testing purposes - we do receive a unit but
    // FIXME: we don't yet detect TEAM (enemies not yet implemented)
    // let attackSuggestion = this.closestEnemy(maxrange);

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

    if (sprite) {
      sprite.drawAt(this.getPosition());
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

  this.minimapDraw = function(levelDimensions, mapX, mapY, mapW, mapH, color) {
    let atX = mapX + (this.x / levelDimensions.width) * mapW;
    let atY = mapY + (this.y / levelDimensions.height) * mapH;

    drawFillRect(gameContext, atX, atY, 2, 2, color);
  };

  this.closestEnemy = function(maxDistance) {
    //console.log("searching for the closest enemy...");

    let mindist = 99999999999;
    if (!maxDistance) maxDistance = 99999999999;
    let foundit = null;

    for (let num=0,len=Game.units.length; num<len; num++) {

      if (this != Game.units[num] // skip yourself
          //&& Game.units[num].team != this.team // FIXME - how to detect teams?
        ) {
        // Units have a .x and .y property, like Points
        let dist = distanceBetweenPoints(this, Game.units[num]);
        //console.log("distance " + num + " is "+dist);
        if ((dist < maxDistance) && (mindist > dist)) {
          mindist = dist;
          foundit = Game.units[num];
        }
      }
    }
    return foundit;
  }

};
