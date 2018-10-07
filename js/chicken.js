const Chicken = function (settings) {

  const sprite = new Sprite(Sprites.chicken);
  const unit = new Unit(settings.x, settings.y);

  this.update = function(delta) {
    unit.update(delta);
    sprite.update(delta);
  };

  this.draw = function() {
    sprite.drawAt(unit.getPosition());
  };

};
