const Images = new (function() {

  let images = {
    // key: 'img/image_name.png'
    menuCursor: 'img/arrowRight.png',
    chickenEnemy: 'img/chicken2.png',
    chicken: 'img/chicken2.png',
    goblin: 'img/gobo.png',
    goblinEnemy: 'img/goboEnemy.png',
    pig: 'img/pig.png',
    pigEnemy: 'img/pigEnemy.png',
    slime: 'img/Slime.png',
    slimeEnemy: 'img/Slime.png',
    slimePatch: 'img/SlimePatch.png',
    slimePatchEnemy: 'img/SlimePatch.png',
    house: 'img/houseSprite2.png',
    houseEnemy: 'img/houseSprite2.png',
    housePreview: 'img/house-preview.png',
    mudPit: 'img/mudPitSprite.png',
    mudPitEnemy: 'img/mudPitSprite.png',
    mudPitPreview: 'img/mudPit-preview.png',
    barracks: 'img/BarnBarracksSheet.png',
    barracksEnemy: 'img/barracksSprite2.png',
    barracksPreview: 'img/barracks-preview.png',
    footprints: 'img/footprints.png',
    interfaceTopBg: 'img/interface-top-right-bg.png',
    interfaceTopContainer: 'img/interface-top-right-container.png',
    interfaceBottomBg: 'img/interface-bottom-bg.png',
    interfaceBottomContainer: 'img/interface-bottom-container.png',
    interfacePauseBg: 'img/interface-pause-bg.png',
    interfacePauseContainer: 'img/interface-pause-container.png',
    interfacePauseButtonBg: 'img/interface-pause-button-bg.png',
    pathPreviewIcon: 'img/pathPreviewIcon.png',
    buildButtonHouse: 'img/build-button-house.png',
    buildButtonMudPit: 'img/build-button-mudPit.png',
    buildButtonBarracks: 'img/build-button-barracks.png',
    buildButtonChicken: 'img/build-button-chicken.png',
    buildButtonGoblin: 'img/build-button-goblin.png',
    buildButtonPig: 'img/build-button-pig.png',
    buildButtonBg: 'img/build-button-active-bg.png',
    bottomButtonBg: 'img/bottom-button-active-bg.png',
    topButtonBg: 'img/top-button-active-bg.png',
    startMenu: 'img/startMenu.png',
    levels: 'img/levels.png',
    deadPigImg: 'img/dead-pig.png',
    deadGoblinImg: 'img/dead-goblin.png',
    deadChickenImg: 'img/dead-chicken.png',
    deadSlimeImg: 'img/dead-slime.png',
  };

  this.initialize = function(callback) {
    let numToLoad = Object.keys(images).length;
    if (DEBUG) console.log("Downloading " + numToLoad + " images...");
    if (numToLoad === 0 && callback) {
      callback();
      return;
    }

    for (let key in images) {
      if (images.hasOwnProperty(key)) {
        this[key] = this.loadImage(images[key], doneLoading);
      }
    }

    function doneLoading() {
      numToLoad--;
      if (DEBUG) console.log("Finished downloading image " + numToLoad);
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
