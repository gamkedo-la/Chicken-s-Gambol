const TileImages = [];

const Images = new (function() {

  let images = {
    // key: 'img/image_name.png'
    chickenEnemy: 'img/chicken.png',
    chicken: 'img/chicken2.png',
    goblin: 'img/gobo.png',
    house: 'img/houseSprite2.png',
    footprints: 'img/footprints.png',
    interfaceTopBg: 'img/interface-top-right-bg.png',
    interfaceTopContainer: 'img/interface-top-right-container.png',
    interfaceBottomBg: 'img/interface-bottom-bg.png',
    interfaceBottomContainer: 'img/interface-bottom-container.png',
    pathPreviewIcon: 'img/pathPreviewIcon.png',
    buildButtonHouse: 'img/build-button-house.png',
    buildButtonChicken: 'img/build-button-chicken.png',
    buildButtonBg: 'img/build-button-active-bg.png',
    bottomButtonBg: 'img/bottom-button-active-bg.png',
    topButtonBg: 'img/top-button-active-bg.png'
  };

  let tileTypeImages = [
    { type: TILE.GRASS, src: 'img/grass.png' },
    { type: TILE.TREES, src: 'img/trees.png' }
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
    if (DEBUG) {
      console.log('Loading image: ' + src);
    }
    let img = document.createElement('img');
    img.src = src;
    img.onload = callback;
    return img;
  };

})();
