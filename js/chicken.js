const Chicken = function () {

  const sprite = new Sprite(Sprites.chicken);
  const unit = new Unit(200, 200);

  this.update = function(delta) {
    unit.update(delta);
    sprite.update(delta);
  };

  this.draw = function() {
    sprite.drawAt(unit.getPosition());
  };

};
