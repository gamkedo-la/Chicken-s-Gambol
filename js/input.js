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
    canvasRect = drawCanvas.getBoundingClientRect();

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
    }, false);

    document.addEventListener('keydown', function(event) {
      let suppressedKeys = [
        KEY.SPACE, KEY.UP, KEY.LEFT, KEY.RIGHT, KEY.DOWN
      ];
      for (let i = 0; i < suppressedKeys.length; i++) {
        if (suppressedKeys[i] === getButtonId(event)) {
          event.preventDefault();
          return;
        }
      }
    }, false);
  };

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
    mousePosition.x = scaled.x;
    mousePosition.y = scaled.y;
  }

  this.isDown = function(buttonId) {
    return buttonsDown[buttonId] || false;
  };

  this.isPressed = function(buttonId) {
    return buttonsPressed[buttonId] || false;
  };

  this.getMousePosition = function() {
    return mousePosition;
  };

  this.bindMouseMove = function(fn) {
    moveCallbacks.push(fn);
  };

  this.unbindMouseMove = function(fn) {
    for (var i = 0; i < moveCallbacks.length; i++) {
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
    if (event.key !== undefined) {
      return event.key;
    }

    if (event.keyIdentifier !== undefined) {
      return event.keyIdentifier;
    }

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
