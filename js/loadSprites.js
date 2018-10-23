let Sprites = new (function() {
  /**
   * this.spriteName = {
   *   image: Images.imageName,
   *   frames: {
   *     default: {
   *       frames: 2, // number of frames
   *       frameTime: 500, // time a single frame lasts
   *       width: 50, // Dimensions of each frame
   *       height: 50,
   *       firstFrameX: 0, // Position of the first frame
   *       firstFrameY: 0,
   *     },
   *     dying: {...}
   *     attack: {...}
   *   }
   * }
   */
  const sprites = {
    chicken: {
      image: 'chicken',
      frames: {
        default: {
          frames: 2,
          frameTime: 500,
          width: 83,
          height: 76,
          firstFrameX: 0,
          firstFrameY: 318
        },
        moveRight: {
          frames: 2,
          frameTime: 500,
          width: 83,
          height: 76,
          firstFrameX: 0,
          firstFrameY: 0
        },
        moveLeft: {
          frames: 2,
          frameTime: 500,
          width: 83,
          height: 76,
          firstFrameX: 0,
          firstFrameY: 76
        },
        moveUp: {
          frames: 2,
          frameTime: 500,
          width: 76,
          height: 83,
          firstFrameX: 0,
          firstFrameY: 152
        },
        moveDown: {
          frames: 2,
          frameTime: 500,
          width: 76,
          height: 83,
          firstFrameX: 0,
          firstFrameY: 235
        }
      }
    },
    chicken2: {
      image: 'chicken2',
      frames: {
        default: {
          frames: 2,
          frameTime: 500,
          width: 32,
          height: 32,
          firstFrameX: 0,
          firstFrameY: 0
        },
        moveRight: {
          frames: 6,
          frameTime: 500,
          width: 32,
          height: 32,
          firstFrameX: 0,
          firstFrameY: 0
        },
        moveLeft: {
          frames: 6 ,
          frameTime: 500,
          width: 32,
          height: 32,
          firstFrameX: 0,
          firstFrameY: 32
        },
        moveUp: {
          frames: 2,
          frameTime: 500,
          width: 32,
          height: 32,
          firstFrameX: 0,
          firstFrameY: 96
        },
        moveDown: {
          frames: 3,
          frameTime: 500,
          width: 32,
          height: 32,
          firstFrameX: 0,
          firstFrameY: 64
        }
      }
    }
  };

  this.initialize = function(callback) {
    for (let key in sprites) {
      if (!sprites.hasOwnProperty(key)) {
        continue;
      }

      sprites[key]['image'] = Images[sprites[key]['image']];
      this[key] = sprites[key];
    }

    if (callback) {
      callback();
    }
  };
})();
