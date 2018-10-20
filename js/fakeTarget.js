const FakeTarget = function(settings) {

  this.update = function(delta) {
    readyToRemove = (followers.length <= 0);
    if (readyToRemove) {
      Game.scheduleRemoveDeadUnits();
    }
  };

  Unit.call(this, settings);
};

FakeTarget.prototype = Object.create(Unit.prototype);
FakeTarget.prototype.constructor = FakeTarget;
