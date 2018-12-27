const Minimap = new (function() {
  let minimapX = 654;
  let minimapY = 36;
  let minimapH = 106;
  let minimapW = 106;
  let mainViewRatio;
  let mainViewToMapScale;

  let levelDimensions;

  this.initialize = function() {
    levelDimensions = Grid.getWorldDimensions();

    mainViewRatio = gameCanvas.height / gameCanvas.width;
    mainViewToMapScale = gameCanvas.width / levelDimensions.width;
  };

  this.hasMouseOver = function(mousePos) {
    return (minimapX < mousePos.sx && mousePos.sx < minimapX + minimapW &&
      minimapY < mousePos.sy && mousePos.sy < minimapY + minimapH);
  };

  this.update = function(delta) {
    if (!Input.isPressed(KEY.MOUSE_LEFT)) {
      return;
    }

    let mousePos = Input.getMousePosition();
    if (!this.hasMouseOver(mousePos)) {
      return;
    } else {
      document.body.style.cursor = "url('img/chickenCursor.png'), auto";
    }

    let mapX = mousePos.sx - minimapX;
    let mapY = mousePos.sy - minimapY;
    let mapXPerc = mapX / minimapW;
    let mapYPerc = mapY / minimapH;
    if (DEBUG) {
      console.log('mapX: ' + mapX);
      console.log('mapY:' + mapY);
      console.log('mapXP:' + mapXPerc);
      console.log('mapYP:' + mapYPerc);
    }

    Grid.setPanAsPercentage(mapXPerc, mapYPerc);
  };

  this.draw = function() {
    Grid.drawMinimap(minimapX, minimapY, minimapW, minimapH);

    let camPan = Grid.getPanAsPercentage();
    drawStrokeRect(gameContext, minimapX + camPan.x * minimapW,
      minimapY + camPan.y * minimapW,
      mainViewToMapScale * minimapW,
      mainViewToMapScale * minimapW * mainViewRatio, 'white', 1);

    callbackList(Game.units, 'minimapDraw', [
      levelDimensions,
      minimapX,
      minimapY,
      minimapW,
      minimapH,
    ]);
  };

})();
