let gameCanvas, gameContext;

window.onload = function() {
  gameCanvas = document.getElementById('gameCanvas');
  gameContext = gameCanvas.getContext('2d');

  initDrawingCanvas();

  MainLoop
    .stop()
    .setMaxAllowedFPS(FRAME_RATE)
    .setUpdate(gameUpdate)
    .setDraw(gameDraw);

  Images.initialize(gameInitialize);
};

function windowOnBlur() {
  if (MainLoop.isRunning()) {
    // Pause gameloop and show pause screen ?
  }
}
let c;
function gameInitialize() {
  c = new Chicken();

  MainLoop.start();
}

function gameUpdate(delta) {
  c.update(delta);
}

function gameDraw(interpolationPercentage) {
  clearCanvas();
  gameContext.save();

  screenShake.draw(interpolationPercentage);

  // draw level
  // all other draws
  c.draw();


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
