let gameCanvas, gameContext;

window.addEventListener('load', function() {
  gameCanvas = document.getElementById('gameCanvas');
  gameContext = gameCanvas.getContext('2d');

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
  Input.initialize();

  Grid.initialize(levels[0]);

  MainLoop.start();

  Input.bindMouseMove(function(pos) {
    document.getElementById('test').innerHTML = Math.round(pos.x) + ',' + Math.round(pos.y);
  });
}

function gameUpdate(delta) {
  Game.update(delta);

  HotKeys.update(delta);
  Input.update(delta);
}

function gameDraw(interpolationPercentage) {
  clearCanvas();
  gameContext.save();

  let panPosition = Grid.getPanPosition();
  gameContext.translate(-panPosition.x, -panPosition.y);

  screenShake.draw(interpolationPercentage);

  Grid.draw();
  Game.draw();

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
