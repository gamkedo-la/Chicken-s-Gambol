let gameCanvas, gameContext;

window.addEventListener('load', function() {
  gameCanvas = document.getElementById('gameCanvas');
  gameContext = gameCanvas.getContext('2d');

  gameContext.webkitImageSmoothingEnabled = false;
  gameContext.mozImageSmoothingEnabled = false;
  gameContext.imageSmoothingEnabled = false;

  initDrawingCanvas();

  MainLoop
    .stop()
    .setMaxAllowedFPS(FRAME_RATE)
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
  gameIsStarted = true;
  Input.initialize();
  // @todo initialize when selecting a level in the menu or from an empty level (ask for size?)
  // @todo window.prompt('Enter the number of rows for this level:')
  // @todo have user select a default tile
  Editor.initialize(levels[0]);

  MainLoop.start();
}

function getPanPosition() {
  return Editor.getPanPosition();
}

function gameUpdate(delta) {
  // Make sure we have actual seconds instead of milliseconds
  delta = delta / 1000;

  Editor.update(delta);
  HotKeysEditor.update(delta);
  Input.update(delta);
}

function gameDraw(interpolationPercentage) {
  clearCanvas();
  gameContext.save();

  let panPosition = Editor.getPanPosition();
  gameContext.translate(-panPosition.x, -panPosition.y);

  Editor.draw();

  gameContext.restore();
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
