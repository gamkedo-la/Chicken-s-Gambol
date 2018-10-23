const TileImages = [];

const Images = new (function() {

  let images = {
    // key: 'img/image_name.png'
    chicken: 'img/chicken.png'
  };

  let tileTypeImages = [
    { type: TILE.GRASS, src: 'img/grass.png' }
  ];

  this.initialize = function(callback) {
    let numToLoad = Object.keys(images).length + tileTypeImages.length;
    if (numToLoad === 0 && callback) {
      callback();
      return;
    }

    for (let key in images) {
      if (images.hasOwnProperty(key)) {
        this[key] = this.loadImage(images[key], doneLoading);
      }
    }

    for (let key = 0; key < tileTypeImages.length; key++) {
      let tileTypeImage = tileTypeImages[key];
      TileImages[tileTypeImage['type']] = this.loadImage(tileTypeImage['src'], doneLoading);
    }

    function doneLoading() {
      numToLoad--;
      if (numToLoad === 0) {
        callback();
      }
    }

    return this;
  };

  this.loadImage = function(src, callback) {
    let img = document.createElement('img');
    img.src = src;
    img.onload = callback;

    return img;
  };

})();
