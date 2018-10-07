let Collection = function() {
  let items = [];

  this.create = function(Constructor, settings) {
    let item = new Constructor(settings);
    this.add(item);

    return item;
  };

  this.add = function(item) {
    items.push(item);
  };

  this.remove = function(item) {
    let l = items.length;
    for (var i = 0; i < l; i++) {
      if (items[i] === fn) {
        items.splice(i, 1);
        return;
      }
    }
  };

  this.update = function(delta) {
    let l = items.length;
    for (var i = 0; i < l; i++) {
      if (items[i].update === undefined) {
        continue;
      }

      items[i].update(delta);
    }
  };

  this.draw = function(delta) {
    let l = items.length;
    for (var i = 0; i < l; i++) {
      if (items[i].draw === undefined) {
        continue;
      }

      items[i].draw(delta);
    }
  };
};
