function extend(options, defaults) {
  let extended = {};
  let prop;

  for (prop in defaults) {
    if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
      extended[prop] = defaults[prop];
    }
  }

  for (prop in options) {
    if (Object.prototype.hasOwnProperty.call(options, prop)) {
      extended[prop] = options[prop];
    }
  }

  return extended;
}

function distanceBetweenPoints(point1, point2) {
  return Math.sqrt(distanceBetweenPointsSquared(point1, point2));
}

function distanceBetweenPointsSquared(point1, point2) {
  return Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2);
}

function randomInt(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min))
}

function rotateToTarget(vx, vy, speed, rotationEase, targetPosition, position) {
  let diffX = targetPosition.x - position.x;
  let diffY = targetPosition.y - position.y;
  let dist = Math.sqrt(diffX * diffX + diffY * diffY);
  let newVX = (diffX / dist) * speed;
  let newVY = (diffY / dist) * speed;

  return {
    vx: vx * rotationEase + newVX * (1.0 - rotationEase),
    vy: vy * rotationEase + newVY * (1.0 - rotationEase),
    dist: dist
  };
}
