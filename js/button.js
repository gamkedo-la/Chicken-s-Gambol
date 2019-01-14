const Button = function(x, y, w, h, isToggle, callback, drawCallback, activeBg, sprite, toolTipText) {

  let hover = false;
  let active = false;
  let enabled = true;
  let spritePosition = {
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

  this.getBounds = function() {
    return {
      x: x,
      y: y,
      w: w,
      h: h
    };
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
      if(toolTipText) {
        Input.setToolTip(toolTipText);
      }

      if (Input.isPressed(KEY.MOUSE_LEFT)) {
        active = isToggle && !active;
        callback(this);
      }
    }

    if ((active || hover) && sprite) {
      sprite.setState('hover');
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
      drawImage(gameContext, activeBg, spritePosition.x, spritePosition.y);
    }

    if (sprite) {
      sprite.drawAt(spritePosition);
    }

    if (drawCallback) {
      drawCallback(this);
    }
  };

};
