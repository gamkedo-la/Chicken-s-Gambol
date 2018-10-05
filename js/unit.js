const Unit = function (x, y) {

  this.getPosition = function() {
    return {
      x: x,
      y: y
    };
  };

  this.update = function(delta) {};

};
