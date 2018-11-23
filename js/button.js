const Button = function(x, y, w, h, callback) {

  this.isPositionOverButton = function(position) {
    return (x < position.x && position.x < x + w &&
      y < position.y && position.y < y + h);
  };

  this.click = function(clickPosition) {
    if (this.isPositionOverButton(clickPosition)) {
      callback();
    }
  };

};
