const Sprite = function (spriteConfig, currentState = 'default') {

  let image = spriteConfig.image;
  let frameConfig = spriteConfig.frames;

  let currentFrameIndex = 0;
  let currentFrameTime = 0;
  let currentFrameConfig;

  this.setState = function(state) {
    if (!frameConfig[state]) {
      console.log('Unknown state: ' + state);
      return;
    }
    currentState = state;
    currentFrameConfig = frameConfig[currentState];
  };
  this.setState(currentState);

  this.update = function(delta) {
    currentFrameTime += delta;

    if (frameConfig[currentState]['frameTime'] <= currentFrameTime) {
      currentFrameTime = 0;
      currentFrameIndex++;
      if (frameConfig[currentState]['frames'] <= currentFrameIndex) {
        currentFrameIndex = 0;
      }
    }
  };

  this.drawAt = function(position) {
    drawImageFrame(gameContext, image, currentFrameIndex, currentFrameConfig['firstFrameX'], currentFrameConfig['firstFrameY'], position.x, position.y, currentFrameConfig['width'], currentFrameConfig['height']);
  };

};
