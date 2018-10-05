/**
 * frameConfig = {
 *   default: {
 *     frames: 2, // number of frames
 *     frameTime: 500, // time a single frame lasts
 *     width: 50, // Dimensions of each frame
 *     height: 50,
 *     firstFrameX: 0, // Position of the first frame
 *     firstFrameY: 0,
 *   },
 *   dying: {...}
 *   attack: {...}
 * }
 */
const Sprite = function (image, frameConfig = {}, currentState = 'default') {

  let currentFrame = 0;
  let currentFrameTime = 0;

  this.setState = function(state) {
    if (!frameConfig[state]) {
      console.log('Unnknown state: ' + state);
      return;
    }
    currentState = state;
  };

  this.update = function(delta) {
    currentFrameTime += delta;

    if (frameConfig[currentState]['frameTime'] <= currentFrameTime) {
      currentFrameTime = 0;
      currentFrame++;
      if (frameConfig[currentState]['frames'] <= currentFrame) {
        currentFrame = 0;
      }
    }
  };

  this.drawAt = function(position) {
    drawImageFrame(gameContext, image, currentFrame, frameConfig[currentState]['firstFrameX'], frameConfig[currentState]['firstFrameY'], position.x, position.y, frameConfig[currentState]['width'], frameConfig[currentState]['height']);
  };

};
