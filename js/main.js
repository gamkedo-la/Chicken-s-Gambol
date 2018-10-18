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

  for (let i = 0; i < 5; i++) {
    Game.createUnit(Chicken, {
      x: randomInt(100, 600),
      y: randomInt(100, 600)
    });
  }

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

  screenShake.draw(interpolationPercentage);

  // draw level
  Game.draw();

  let m = Input.getMousePosition();
  drawFillRect(gameContext, m.x - 10, m.y - 10, 20, 20, '#444');

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
    var discardedTime = Math.round(MainLoop.resetFrameDelta());
    console.warn('Main loop panicked, probably because the browser tab was put in the background. Discarding ' + discardedTime + 'ms');
  }
});
