const Chicken = function () {

  const sprite = new Sprite(Images.chicken, {
    default: {
      frames: 2,
      frameTime: 500,
      width: 83,
      height: 76,
      firstFrameX: 0,
      firstFrameY: 0
    }
  });
  const unit = new Unit(200, 200);

  this.update = function(delta) {
    unit.update(delta);
    sprite.update(delta);
  };

  this.draw = function() {
    sprite.drawAt(unit.getPosition());
  };

};
