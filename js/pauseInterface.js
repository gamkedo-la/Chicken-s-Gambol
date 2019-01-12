const PauseInterface = new (function() {

  let gameIsPaused = false;
  let gameIsOver = false;
  let gameOverText = '';
  let halfWidth;
  let halfHeight;
  let buttons;

  const pauseCanvas = document.createElement('canvas');
  const pauseContext = pauseCanvas.getContext('2d');

  this.initialize = function(_levelData) {
    pauseCanvas.width = gameCanvas.width;
    pauseCanvas.height = gameCanvas.height;

    halfWidth = pauseCanvas.width / 2;
    halfHeight = pauseCanvas.height / 2;

    buttons = [
      new Button(405, 241, 63, 24, true, this.resumeGame, this.drawButtonText.bind(this, 'Resume'), Images.interfacePauseButtonBg),
      new Button(302, 241, 63, 24, true, this.quitToMenu, this.drawButtonText.bind(this, 'Menu'), Images.interfacePauseButtonBg),
    ];
  };

  this.isPaused = function() {
    return gameIsPaused;
  };

  this.gameOver = function(playerWon) {
    gameIsOver = true;
    gameOverText = playerWon ? 'You won!' : 'You lost...';

    this.pauseGame();
  };

  this.pauseGame = function() {
    if (!gameIsPaused) {
      pauseContext.drawImage(gameCanvas, 0, 0);
      drawImage(pauseContext, Images.interfacePauseBg, halfWidth, halfHeight);
      if (gameIsOver) {
        drawTextWithShadow(pauseContext, halfWidth, halfHeight - 10, FONT_COLOR, MENU_FONT, 'center', 'middle', gameOverText);
        drawTextWithShadow(pauseContext, halfWidth, halfHeight + 24, FONT_COLOR, BUTTON_COUNT_FONT, 'center', 'middle', 'Click to go back to menu');
      }
      else {
        drawTextWithShadow(pauseContext, halfWidth, halfHeight - 20, FONT_COLOR, MENU_FONT, 'center', 'middle', 'Game Paused');
      }
    }

    gameIsPaused = true;
  };

  this.resumeGame = function() {
    gameIsPaused = false;
  };

  this.quitToMenu = function() {
    gameIsPaused = false;
    gameIsOver = false;

    gameUnInitialize();
  };

  this.update = function(delta) {
    if (gameIsOver) {
      if (Input.isPressed(KEY.MOUSE_LEFT)) {
        this.quitToMenu();
      }

      return;
    }
    callbackList(buttons, 'update', [delta, Input.getMousePosition()]);
  };

  this.draw = function() {
    gameContext.drawImage(pauseCanvas, 0, 0);

    if (!gameIsOver) {
      callbackList(buttons, 'draw', []);

      drawImage(gameContext, Images.interfacePauseContainer, halfWidth, halfHeight);
    }
  };

  this.drawButtonText = function(text, button) {
    let bounds = button.getBounds();
    drawTextWithShadow(gameContext, bounds.x + bounds.w / 2, bounds.y + bounds.h / 2, FONT_COLOR, BUTTON_COUNT_FONT, 'center', 'middle', text);
  }

})();
