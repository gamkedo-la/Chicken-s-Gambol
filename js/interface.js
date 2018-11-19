const Interface = new (function() {

  let topXOffset = 0;
  let topYOffset = 0;
  let bottomYOffset = 0;

  let numUnits = 3;
  let maxNumUnits = 5;

  let numSlime = 0;

  this.initialize = function() {
    topXOffset = (Images.interfaceTopBg.width / 2);
    topYOffset = (Images.interfaceTopBg.height / 2);
    bottomYOffset = (Images.interfaceBottomBg.height / 2);
  };

  this.addUnit = function() {
    numUnits++;
  };
  this.subUnit = function() {
    numUnits--;
  };

  this.addNumMaxUnits = function(amount) {
    maxNumUnits += amount;
  };
  this.subNumMaxUnits = function(amount) {
    maxNumUnits -= amount;
  };

  this.addSlime = function(amount) {
    numSlime += amount;
  };
  this.subSlime = function(amount) {
    numSlime -= amount;
  };

  this.update = function(delta) {};

  this.draw = function() {
    // draw background
    drawImage(gameContext, Images.interfaceTopBg, 705, 93);
    drawImage(gameContext, Images.interfaceBottomBg, 384, 428);

    // draw Minimap
    Minimap.draw();

    // draw containers
    drawImage(gameContext, Images.interfaceTopContainer, 705, 93);
    drawImage(gameContext, Images.interfaceBottomContainer, 384, 428);

    // draw  text
    setShadow(SHADOW_COLOR, 2, 2, 2);
    drawText(gameContext, 658, 160, FONT_COLOR, UNITS_FONT, 'left', 'middle', 'Units');
    drawText(gameContext, 757, 160, FONT_COLOR, UNITS_FONT, 'right', 'middle', numUnits+'/'+maxNumUnits);
    drawText(gameContext, 315, 403, FONT_COLOR, SLIME_FONT, 'left', 'middle', 'Slime');
    drawText(gameContext, 450, 403, FONT_COLOR, SLIME_FONT, 'right', 'middle', numSlime);
    resetShadow();
  };

})();
