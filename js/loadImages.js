const TileImages = [];

const Images = new (function() {

  let images = {
    // key: 'img/image_name.png'
    chickenEnemy: 'img/chicken.png',
    chicken: 'img/chicken2.png',
    house: 'img/Untitled.png',
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

    let length = tileTypeImages.length;
    for (let key = 0; key < length; key++) {
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
