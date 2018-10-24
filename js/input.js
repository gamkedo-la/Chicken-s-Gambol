// Prevents player from drag selecting
document.onselectstart = function() {
  window.getSelection().removeAllRanges();
};
document.onmousedown = function() {
  window.getSelection().removeAllRanges();
};
document.oncontextmenu = function() {
  return false;
};

// Inspired by https://github.com/maryrosecook/coquette/blob/master/src/inputter.js

/*
 * @todo
 * - add callbacks for keydown/keyup (with or without button id?)
 */
const Input = new (function() {
  let buttonsDown = {};
  let buttonsPressed = {};
  let mousePosition = {};
  let moveCallbacks = [];

  let canvasRect;

  this.initialize = function() {
    refreshBoundingClientRect();
    const self = this;

    window.addEventListener('resize', refreshBoundingClientRect);
    document.addEventListener('keydown', function(event) {
      buttonDown(getButtonId(event));
    }, false);
    document.addEventListener('keyup', function(event) {
      buttonUp(getButtonId(event));
    }, false);
    drawCanvas.addEventListener('mousedown', function(event) {
      buttonDown(getMouseButtonId(event));
    }, false);
    drawCanvas.addEventListener('mouseup', function(event) {
      buttonUp(getMouseButtonId(event));
    }, false);
    drawCanvas.addEventListener('mousemove', function(event) {
      updateMousePosition(event);

      let length = moveCallbacks.length;
      for (let i = 0; i < length; i++) {
        moveCallbacks[i](self.getMousePosition());
      }
    }, false);

    document.addEventListener('keydown', function(event) {
      let suppressedKeys = [
        KEY.SPACE, KEY.UP, KEY.LEFT, KEY.RIGHT, KEY.DOWN
      ];
      let length = suppressedKeys.length;
      for (let i = 0; i < length; i++) {
        if (suppressedKeys[i] === getButtonId(event)) {
          event.preventDefault();
          return;
        }
      }
    }, false);
  };

  function refreshBoundingClientRect() {
    canvasRect = drawCanvas.getBoundingClientRect();
  }

  function buttonDown(buttonId) {
    buttonsDown[buttonId] = true;
    if (buttonsPressed[buttonId] === undefined) {
      buttonsPressed[buttonId] = true;
    }
  }

  function buttonUp(buttonId) {
    buttonsDown[buttonId] = false;
    if (buttonsPressed[buttonId] === false) {
      buttonsPressed[buttonId] = undefined;
    }
  }

  function updateMousePosition(event) {
    let mouseRaw;
    if (event.pageX) {
      mouseRaw = { x: event.pageX, y: event.pageY };
    }
    else if (event.clientX) {
      mouseRaw = { x: event.clientX, y: event.clientY };
    }
    else {
      throw "Which mouse position?";
    }

    mousePosition.ux = mouseRaw.x - canvasRect.left;
    mousePosition.uy = mouseRaw.y - canvasRect.top;
    let scaled = scaleCoordinates(mousePosition.ux, mousePosition.uy);
    let panPosition = Grid.getPanPosition();
    mousePosition.x = scaled.x + panPosition.x;
    mousePosition.y = scaled.y + panPosition.y;
  }

  this.isDown = function(buttonId) {
    return buttonsDown[buttonId] || false;
  };

  this.isPressed = function(buttonId) {
    return buttonsPressed[buttonId] || false;
  };

  this.getMousePosition = function() {
    return {
      x: mousePosition.x,
      y: mousePosition.y
    };
  };

  this.bindMouseMove = function(fn) {
    moveCallbacks.push(fn);
  };

  this.unbindMouseMove = function(fn) {
    let length = moveCallbacks.length;
    for (let i = 0; i < length; i++) {
      if (moveCallbacks[i] === fn) {
        moveCallbacks.splice(i, 1);
        return;
      }
    }
  };

  this.update = function() {
    for (let i in buttonsPressed) {
      if (buttonsPressed[i] === true) {
        buttonsPressed[i] = false;
      }
    }
  };

  function getButtonId(event) {
    if (event.keyCode !== undefined) {
      return event.keyCode;
    }

    throw "What button to use?";
  }

  function getMouseButtonId(event) {
    if (event.which !== undefined || event.button !== undefined) {
      if (event.which === 3 || event.button === 2) {
        return KEY.MOUSE_RIGHT;
      }
      else if (event.which === 1 || event.button === 0 || event.button === 1) {
        return KEY.MOUSE_LEFT;
      }
    }
  }

})();
