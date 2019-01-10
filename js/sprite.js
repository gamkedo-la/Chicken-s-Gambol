const Sprite = function (spriteConfig, currentState = 'default') {
    
    //Hellow World, Test practice using git -Neveen;

  const image = spriteConfig.image;
  const frameConfig = spriteConfig.frames;

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
    currentFrameIndex = 0;
  };
  this.setState(currentState);

  this.getState = function() {
    return currentState;
  };

  this.update = function(delta) {
    currentFrameTime += delta;

    if (currentFrameConfig['frameTimings'][currentFrameIndex] <= currentFrameTime) {
      currentFrameTime = 0;
      currentFrameIndex++;
      if (currentFrameConfig['frames'] <= currentFrameIndex) {
        currentFrameIndex = 0;
      }
    }
  };

  this.drawAt = function(position) {
    drawImageFrame(gameContext, image, currentFrameIndex, currentFrameConfig['firstFrameX'], currentFrameConfig['firstFrameY'], position.x, position.y, currentFrameConfig['width'], currentFrameConfig['height']);
  };

};
