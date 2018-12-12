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

function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


function rotateToTarget(vx, vy, speed, rotationEase, targetPosition, position) {
  let diffX = targetPosition.x - position.x;
  let diffY = targetPosition.y - position.y;

  return {
    dist: Math.sqrt(diffX * diffX + diffY * diffY),
    angle: Math.atan2(diffY, diffX)
  };
}

function unitIsInList(unit, list) {
  let length = list.length;
  for (let i = 0; i < length; i++) {
    if (list[i] === unit) {
      return true;
    }
  }
  return false;
}

function callbackList(items, callback, arguments) {
  let length = items.length;
  for (let index = 0; index < length; index++) {
    if (items[index] === undefined || items[index][callback] === undefined) {
      continue;
    }

    arguments.push(index);
    items[index][callback].apply(items[index], arguments);
    arguments.pop();
  }
}
