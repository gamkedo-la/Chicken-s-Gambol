const Unit = function(settings) {

  settings = extend(settings, {
    selectionY: TILE_HALF_SIZE,
    healthbarY: TILE_HALF_SIZE * 1.1,
    showHealthbar: true,
    maxHealth: 13
  });

  let sprite = false;
  if (settings.sprite) {
    sprite = new Sprite(settings.sprite);
  }

  const clickRadius = settings.clickRadius;
  const clickRadiusSquared = clickRadius * clickRadius;
  const collisionRange = settings.collisionRange || clickRadius * 1.3;
  const AI_ENEMY_DETECT_RANGE = 100;

  this.x = Math.round(settings.x);
  this.y = Math.round(settings.y);

  let readyToRemove = false;
  let enabled = true;
  let isSelected = false;
  let visible = false;

  let followers = [];

  let state;

  let health = settings.maxHealth;

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

  this.getFollowers = function() {
    return followers;
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

  this.getCollisionRange = function() {
    return collisionRange;
  };

  this.remove = function() {
    readyToRemove = true;

    if (this._remove) {
      this._remove();
    }
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

    // just for testing purposes - we do receive a unit!
    let attackSuggestion = this.closestEnemy(AI_ENEMY_DETECT_RANGE);

    let gridBounds = Grid.getBounds();
    // expand so that sprites straddling the edge don't pop in or out
    gridBounds.topLeft.x -= TILE_SIZE; // maybe this.sprite.width would be better?
    gridBounds.topLeft.y -= TILE_SIZE;
    gridBounds.bottomRight.x += TILE_SIZE;
    gridBounds.bottomRight.y += TILE_SIZE;
    visible = (this.isInBox(gridBounds.topLeft, gridBounds.bottomRight));

    if (readyToRemove) {
      Game.scheduleRemoveDeadUnits();
    }
  };

  this.draw = function(interpolationPercentage) {
    if (!visible) {
      return;
    }

    if (isSelected) {
      drawStrokeEllipse(gameContext, this.x, this.y + settings.selectionY, clickRadius, clickRadius / 1.7, SELECTED_COLOR, 2);
    }

    if (sprite) {
      sprite.drawAt(this.getPosition());
    }

    if (this._draw) {
      this._draw(interpolationPercentage);
    }

    if (settings.showHealthbar && 0 < health) {
      let barWidth = HEALTH_BAR_WIDTH * (health / settings.maxHealth);
      drawFillRect(gameContext, this.x - (barWidth / 2), this.y - settings.healthbarY, barWidth, 3, HEALTH_BAR_COLOR);
    }

    if (DEBUG) {
      drawStrokeCircle(gameContext, this.x, this.y, clickRadius, 100, 'green', 1);
      drawStrokeCircle(gameContext, this.x, this.y, collisionRange, 100, 'red', 1);
      drawStrokeCircle(gameContext, this.x, this.y, 2, 100, 'red', 2);
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

    // search the correct list of units
    let searchList = Game.enemies;
    if (this.isEnemy()) {
      searchList = Game.units;
    }

    for (let num=0,len=searchList.length; num<len; num++) {

      if (this != searchList[num]) { // skip yourself
        // Units have a .x and .y property, like Points
        let dist = distanceBetweenPoints(this, searchList[num]);
        //console.log("distance " + num + " is "+dist);
        if ((dist < maxDistance) && (mindist > dist)) {
          mindist = dist;
          foundit = searchList[num];
        }
      }
    }
    if (foundit) console.log("Nearest enemy is: ", foundit);
    return foundit;
  }

};
