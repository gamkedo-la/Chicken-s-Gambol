const Unit = function(settings) {

  const sprite = new Sprite(settings.sprite);

  let x = settings.x;
  let y = settings.y;

  let enabled = true;
  let clickRadius = settings.clickRadius;
  let clickRadiusSquared = clickRadius * clickRadius;
  let isSelected = false;

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

  this.update = function(delta) {
    if (!enabled) {
      return;
    }

    sprite.update(delta);
  };

  this.draw = function(interpolationPercentage) {
    sprite.drawAt(this.getPosition());
    if (DEBUG) {
      drawStrokeCircle(gameContext, x, y, clickRadius, 100, 'red', 2);
    }
    if (isSelected) {
      drawStrokeCircle(gameContext, x, y, clickRadius, 100, SELECTED_COLOR, 2);
    }
  };

};
