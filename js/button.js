const Button = function(x, y, w, h, callback, sprite) {

  let enabled = false;
  let position = {
    x: x + w / 2,
    y: y + h / 2
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

  this.isPositionOverButton = function(mousePosition) {
    return (x < mousePosition.sx && mousePosition.sx < x + w &&
      y < mousePosition.sy && mousePosition.sy < y + h);
  };


  this.update = function(delta, mousePosition) {
    if (!enabled) {
      return;
    }

    if (this.isPositionOverButton(mousePosition)) {
      if (sprite) {
        sprite.setState('hover');
      }
      if (Input.isPressed(KEY.MOUSE_LEFT)) {
        callback();
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

    if (sprite) {
      sprite.drawAt(position);
    }
  };

};
