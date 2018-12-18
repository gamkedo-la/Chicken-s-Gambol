const FakeTarget = function(team, settings) {

  settings = extend(settings, {
    collisionRange: 0,
    showHealthbar: false
  });

  this._update = function(delta) {
    if (this.getFollowers().length <= 0) {
      this.remove();
    }
  };

  Unit.call(this, team, settings);
};

FakeTarget.prototype = Object.create(Unit.prototype);
FakeTarget.prototype.constructor = FakeTarget;
