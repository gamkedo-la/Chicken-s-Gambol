var Images = new (function() {

  var images = {
    // key: 'img/image_name.png'
    grass: 'img/grass.png',
    chicken: 'img/chicken.png'
  };

  this.initialize = function(callback) {
    var numToLoad = Object.keys(images).length;
    if (numToLoad === 0 && callback) {
      callback();
      return;
    }

    for (var key in images) {
      if (images.hasOwnProperty(key)) {
        this.loadImage(key, images[key]);
        this[key].onload = doneLoading;
      }
    }

    function doneLoading() {
      numToLoad--;
      if (numToLoad === 0) {
        callback();
      }
    }

    return this;
  };

  this.loadImage = function(key, src) {
    var img = document.createElement('img');
    img.src = src;
    this[key] = img;
    img.onload = function() {
      this.downloaded = true;
    }
  };

})();
