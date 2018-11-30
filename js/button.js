const Button = function(x, y, w, h, callback, activeBg, sprite) {

  let hover = false;
  let active = false;
  let enabled = true;
  let position = {
    x: Math.floor(x + w / 2),
    y: Math.floor(y + h / 2)
  };

  if (sprite) {
    sprite = new Sprite(sprite);
  }

  this.enable = function() {
    enabled = true;
  };

  this.disable = function() {
    enabled = false;
  };

  this.activate = function() {
    active = true;
  };

  this.deactivate = function() {
    active = false;
  };

  this.isPositionOverButton = function(mousePosition) {
    return (x < mousePosition.sx && mousePosition.sx < x + w &&
      y < mousePosition.sy && mousePosition.sy < y + h);
  };


  this.update = function(delta, mousePosition) {
    if (!enabled) {
      return;
    }

    hover = false;

    if (this.isPositionOverButton(mousePosition)) {
      hover = true;

      if (sprite) {
        sprite.setState('hover');
      }
      if (Input.isPressed(KEY.MOUSE_LEFT)) {
        active = true;
        callback(this);
      }
    }
    else if (sprite) {
      sprite.setState('default');
    }

    if (sprite) {
      sprite.update(delta);
    }
  };

  this.draw = function(delta) {
    if (!enabled) {
      return;
    }

    if ((active || hover) && activeBg) {
      drawImage(gameContext, activeBg, position.x, position.y);
    }

    if (sprite) {
      sprite.drawAt(position);
    }
  };

};
