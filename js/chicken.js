const Chicken = function (x, y) {

  const sprite = new Sprite(Sprites.chicken);
  const unit = new Unit(x, y);

  this.update = function(delta) {
    unit.update(delta);
    sprite.update(delta);
  };

  this.draw = function() {
    sprite.drawAt(unit.getPosition());
  };

};
