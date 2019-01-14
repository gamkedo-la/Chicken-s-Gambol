let gameCanvas, gameContext;
let gameIsStarted = false;

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
    Sprites.initialize(menuInitialize);
  });

  window.addEventListener('blur', windowOnBlur);
  window.addEventListener('focus', windowOnFocus);
});

function windowOnBlur() {
  if (gameIsStarted) {
    PauseInterface.pauseGame();
    gameDraw(0);
  }

  if (MainLoop.isRunning()) {
    MainLoop.stop();
  }
}

function windowOnFocus() {
  if (!MainLoop.isRunning()) {
    MainLoop.start();
  }
}

function playSong(filename) {
  music_sound.pause();
  music_sound.src = "audio/background_tracks/"+filename+".mp3";
  music_sound.autoplay = false;
  music_sound.loop = false;
  music_sound.volume = 0.1;
  music_sound.play();
}

function menuInitialize() {
  playSong("chickens_intro_V2");

  Input.initialize();
  Menu.initialize();

  gameIsStarted = false;

  Input.bindMouseMove(debugMousePos);

  MainLoop.start();
}

function gameInitialize(levelId) {
  playSong("hard_boiled_chicken-klaim");

  if (!levels[levelId]) {
    alert('Level does not exists!?');
    return;
  }

  Game.initialize();
  Interface.initialize();
  PauseInterface.initialize();

  Grid.initialize(levels[levelId]);
  Minimap.initialize();

  gameIsStarted = true;
}

function gameUnInitialize() {
  playSong("chickens_intro_V2");

  gameIsStarted = false;
  Grid.unInitialize();
  Interface.unInitialize();
  Selection.clearSelection();
  Game.unInitialize();

  decalPositions = [];

  AIPlayer.clearEnemyAndPlayerUnitArrays();
}

function debugMousePos(pos) {
  let t = Math.round(pos.x) + ',' + Math.round(pos.y) + '<br>' + Math.round(pos.sx) + ',' + Math.round(pos.sy) +
    '<br>' + Math.floor(pos.x / TILE_SIZE) + ',' + Math.floor(pos.y / TILE_SIZE);

  if (Grid.isInitialized()) {
    t +='<br>' + Grid.coordsToIndex(pos.x, pos.y);
  }

  // document.getElementById('test').innerHTML = t;
}

function getPanPosition() {
  return Grid.getPanPosition();
}

function gameUpdate(delta) {
  // Make sure we have actual seconds instead of milliseconds
  delta = delta / 1000;
  if (gameIsStarted === false) {
    Menu.update();
  }
  else {
    if (PauseInterface.isPaused()) {
      PauseInterface.update();
    }
    else {
      Grid.update(delta);
      Game.update(delta);
      Selection.update(delta);
      if (AI_ENABLED) {
        AIPlayer.update(delta);
      }
      if (DEBUG) {
        pathPreview.update(delta);
      }

      updateParticles(delta);

      Interface.update(delta);
    }

    HotKeys.update(delta);
  }

  Input.update(delta);
}

function gameDraw(interpolationPercentage) {
  if (gameIsStarted === false) {
    Menu.draw();
    redrawCanvas();
    return; // skip game logic below
  }
  clearCanvas();
  gameContext.save();

  if (PauseInterface.isPaused()) {
    PauseInterface.draw();
  }
  else {
    let panPosition = Grid.getPanPosition();
    gameContext.translate(-panPosition.x, -panPosition.y);

    screenShake.draw(interpolationPercentage);

    Grid.draw();
    if (DEBUG) {
      pathPreview.draw();
    }
    Selection.draw();
    Game.draw();
    drawParticles();

    if (DEBUG) {
      Grid.drawDebug();

      let pos = Input.getMousePosition();
      let col = Math.floor(pos.x / TILE_SIZE);
      let row = Math.floor(pos.y / TILE_SIZE);
      drawStrokeRect(gameContext, col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE, 'white', 2);
    }
  }

  gameContext.restore();

  if (!PauseInterface.isPaused()) {
    Interface.draw();
  }

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
