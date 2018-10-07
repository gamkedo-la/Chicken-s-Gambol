let Game = new (function() {
  let enemies = new Collection();
  let units = new Collection();

  this.createEnemy = function(Constructor, settings) {
    return create(enemies, Constructor, settings);
  };

  this.createUnit = function(Constructor, settings) {
    return create(units, Constructor, settings);
  };

  function create(collection, Constructor, settings) {
    let unit = new Constructor(settings);
    collection.add(unit);

    return unit;
  }

  this.update = function(delta) {
    units.update(delta);
    enemies.update(delta);
  };

  this.draw = function(delta) {
    enemies.draw(delta);
    units.draw(delta);
  };
})();
