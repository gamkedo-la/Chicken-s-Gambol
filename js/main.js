let gameCanvas, gameContext;
let gameIsRunning = false;

window.addEventListener('load', function() {
  gameCanvas = document.getElementById('gameCanvas');
  gameContext = gameCanvas.getContext('2d');

  gameContext.webkitImageSmoothingEnabled = false;
  gameContext.mozImageSmoothingEnabled = false;
  gameContext.imageSmoothingEnabled = false;

  initDrawingCanvas();

  MainLoop
    .stop()
    .setMaxAllowedFPS(FRAME_RATE/4) // @todo debug
    .setUpdate(gameUpdate)
    .setDraw(gameDraw);

  Images.initialize(function() {
    Sprites.initialize(gameInitialize);
  });

  window.addEventListener('blur', windowOnBlur);
  window.addEventListener('focus', windowOnFocus);
});

function windowOnBlur() {
  if (MainLoop.isRunning()) {
    // Pause gameloop and show pause screen ?
    console.log('pause');
    MainLoop.stop();
  }
}

function windowOnFocus() {
  if (!MainLoop.isRunning()) {
    console.log('resume');
    MainLoop.start();
  }
}

function gameInitialize() {
/*  if (gameIsRunning) {
    return;
  } else {
    runMenu();
  } */
  Input.initialize();
  Interface.initialize();

  Grid.initialize(levels[0]);

  MainLoop.start();

  Input.bindMouseMove(function(pos) {
    document.getElementById('test').innerHTML = Math.round(pos.x) + ',' + Math.round(pos.y) + '<br>'+ Math.round(pos.sx) + ',' + Math.round(pos.sy) +
      '<br>' + Grid.coordsToIndex(pos.x, pos.y) +
      '<br>' + Math.floor(pos.x / TILE_SIZE) +','+ Math.floor(pos.y / TILE_SIZE);
  });
}

function gameUpdate(delta) {
  // Make sure we have actual seconds instead of milliseconds
  delta = delta / 1000;
  Grid.update(delta);
  Game.update(delta);
  Selection.update(delta);
  if (DEBUG) { pathPreview.update(delta); }

  HotKeys.update(delta);
  Interface.update(delta);
  Input.update(delta); 
}

function gameDraw(interpolationPercentage) {
  clearCanvas();
  gameContext.save();

  let panPosition = Grid.getPanPosition();
  gameContext.translate(-panPosition.x, -panPosition.y);

  screenShake.draw(interpolationPercentage);

  Grid.draw();
  if (DEBUG) { pathPreview.draw(); }
  Selection.draw();
  Game.draw();

  if (DEBUG) {
    Grid.drawDebug();

    let pos = Input.getMousePosition();
    let col = Math.floor(pos.x / TILE_SIZE);
    let row = Math.floor(pos.y / TILE_SIZE);
    drawStrokeRect(gameContext, col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE, 'white', 2);
  }

  gameContext.restore();
  Interface.draw();
  redrawCanvas();
}

function clearCanvas() {
  gameContext.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
  drawContext.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
}

// Make sure we can handle the game when it has fallen too far behind real time.
// For example when the browser window is hidden or moved to the background.
MainLoop.setEnd(function(fps, panic) {
  if (panic) {
    let discardedTime = Math.round(MainLoop.resetFrameDelta());
    console.warn('Main loop panicked, probably because the browser tab was put in the background. Discarding ' + discardedTime + 'ms');
  }
});
