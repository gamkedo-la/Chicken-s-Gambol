let Sprites = new (function() {
  /**
   * this.spriteName = {
   *   image: Images.imageName,
   *   frames: {
   *     default: {
   *       frames: 2, // number of frames
   *       frameTime: .2, // time a single frame lasts in seconds
   *       // Optional property to specify different timings per frame
   *       frameSpecificTimings: {2, .75, 3: .75}, // frameIndex: specificTiming in seconds
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
    chickenEnemy: {
      image: 'chickenEnemy',
      frames: {
        default: {
          frames: 2,
          frameTime: .2,
          width: 83,
          height: 76,
          firstFrameX: 0,
          firstFrameY: 318
        },
        attack: {
          frames: 2,
          frameTime: .2,
          width: 83,
          height: 76,
          firstFrameX: 0,
          firstFrameY: 318
        },
        harvest: {
          frames: 2,
          frameTime: .2,
          width: 83,
          height: 76,
          firstFrameX: 0,
          firstFrameY: 318
        },
        moveRight: {
          frames: 2,
          frameTime: .2,
          width: 83,
          height: 76,
          firstFrameX: 0,
          firstFrameY: 0
        },
        moveLeft: {
          frames: 2,
          frameTime: .2,
          width: 83,
          height: 76,
          firstFrameX: 0,
          firstFrameY: 76
        },
        moveUp: {
          frames: 2,
          frameTime: .2,
          width: 76,
          height: 83,
          firstFrameX: 0,
          firstFrameY: 152
        },
        moveDown: {
          frames: 2,
          frameTime: .2,
          width: 76,
          height: 83,
          firstFrameX: 0,
          firstFrameY: 235
        }
      }
    },
    chicken: {
      image: 'chicken',
      frames: {
        default: {
          frames: 2,
          frameTime: .2,
          width: 32,
          height: 32,
          firstFrameX: 0,
          firstFrameY: 4
        },
        attack: {
          frames: 2,
          frameTime: .2,
          width: 32,
          height: 32,
          firstFrameX: 0,
          firstFrameY: 4
        },
        build: {
          frames: 2,
          frameTime: .2,
          width: 32,
          height: 32,
          firstFrameX: 0,
          firstFrameY: 4
        },
        harvest: {
          frames: 2,
          frameTime: .2,
          width: 32,
          height: 32,
          firstFrameX: 0,
          firstFrameY: 4
        },
        moveRight: {
          frames: 6,
          frameTime: .2,
          width: 32,
          height: 32,
          firstFrameX: 0,
          firstFrameY: 4
        },
        moveLeft: {
          frames: 6 ,
          frameTime: .2,
          width: 32,
          height: 32,
          firstFrameX: 0,
          firstFrameY: 36
        },
        moveUp: {
          frames: 2,
          frameTime: .2,
          width: 32,
          height: 32,
          firstFrameX: 0,
          firstFrameY: 100
        },
        moveDown: {
          frames: 3,
          frameTime: .2,
          width: 32,
          height: 32,
          firstFrameX: 0,
          firstFrameY: 68
        }
      }
    },
	 goblin: {
      image: 'goblin',
      frames: {
        default: {
          frames: 6,
          frameTime: .2,
          width: 32,
          height: 32,
          firstFrameX: 0,
          firstFrameY: 0
        },
        attack: {
          frames: 6,
          frameTime: .2,
          width: 32,
          height: 32,
          firstFrameX: 0,
          firstFrameY: 0
        },
        moveRight: {
          frames: 6,
          frameTime: .2,
          width: 32,
          height: 32,
          firstFrameX: 0,
          firstFrameY: 32
        },
        moveLeft: {
          frames: 6,
          frameTime: .2,
          width: 32,
          height: 32,
          firstFrameX: 0,
          firstFrameY: 64
        },
        moveUp: {
          frames: 6,
          frameTime: .2,
          width: 32,
          height: 32,
          firstFrameX: 0,
          firstFrameY: 128
        },
        moveDown: {
          frames: 6,
          frameTime: .2,
          width: 32,
          height: 32,
          firstFrameX: 0,
          firstFrameY: 96
        }
      }
    },
    house: {
      image: 'house',
      frames: {
        default: {
          frames: 1,
          frameTime: .2,
          width: 64,
          height: 64,
          firstFrameX: 320,
          firstFrameY: 0
        },
        step0: {
          frames: 1,
          frameTime: .2,
          width: 64,
          height: 64,
          firstFrameX: 0,
          firstFrameY: 0
        },
        step1: {
          frames: 1,
          frameTime: .2,
          width: 64,
          height: 64,
          firstFrameX: 64,
          firstFrameY: 0
        },
        step2: {
          frames: 1,
          frameTime: .2,
          width: 64,
          height: 64,
          firstFrameX: 128,
          firstFrameY: 0
        },
        step3: {
          frames: 1,
          frameTime: .2,
          width: 64,
          height: 64,
          firstFrameX: 192,
          firstFrameY: 0
        },
        step4: {
          frames: 1,
          frameTime: .2,
          width: 64,
          height: 64,
          firstFrameX: 256,
          firstFrameY: 0
        }
      },
    },
    buildButtonHouse: {
      image: 'buildButtonHouse',
      frames: {
        default: {
          frames: 2,
          frameTime: .8,
          width: 50,
          height: 50,
          firstFrameX: 0,
          firstFrameY: 0
        },
        hover: {
          frames: 1,
          frameTime: .8,
          width: 50,
          height: 50,
          firstFrameX: 0,
          firstFrameY: 50
        }
      },
    },
    mudPit: {
      image: 'mudPit',
      frames: {
        default: {
          frames: 1,
          frameTime: .2,
          width: 64,
          height: 64,
          firstFrameX: 320,
          firstFrameY: 0
        },
        step0: {
          frames: 1,
          frameTime: .2,
          width: 64,
          height: 64,
          firstFrameX: 0,
          firstFrameY: 0
        },
        step1: {
          frames: 1,
          frameTime: .2,
          width: 64,
          height: 64,
          firstFrameX: 64,
          firstFrameY: 0
        },
        step2: {
          frames: 1,
          frameTime: .2,
          width: 64,
          height: 64,
          firstFrameX: 128,
          firstFrameY: 0
        },
        step3: {
          frames: 1,
          frameTime: .2,
          width: 64,
          height: 64,
          firstFrameX: 192,
          firstFrameY: 0
        },
        step4: {
          frames: 1,
          frameTime: .2,
          width: 64,
          height: 64,
          firstFrameX: 256,
          firstFrameY: 0
        }
      },
    },
    buildButtonMudPit: {
      image: 'buildButtonMudPit',
      frames: {
        default: {
          frames: 1,
          frameTime: .8,
          width: 50,
          height: 50,
          firstFrameX: 0,
          firstFrameY: 0
        },
        hover: {
          frames: 1,
          frameTime: .8,
          width: 50,
          height: 50,
          firstFrameX: 0,
          firstFrameY: 50
        }
      },
    },
    buildButtonChicken: {
      image: 'buildButtonChicken',
      frames: {
        default: {
          frames: 2,
          frameTime: .8,
          width: 50,
          height: 50,
          firstFrameX: 0,
          firstFrameY: 0
        },
        hover: {
          frames: 1,
          frameTime: .8,
          width: 50,
          height: 50,
          firstFrameX: 0,
          firstFrameY: 50
        }
      },
    },
    houseEnemy: {
      image: 'house',
      frames: {
        default: {
          frames: 1,
          frameTime: .2,
          width: 64,
          height: 64,
          firstFrameX: 0,
          firstFrameY: 0
        }
      },
    },
    mudPitEnemy: {
      image: 'mudPit',
      frames: {
        default: {
          frames: 1,
          frameTime: .2,
          width: 64,
          height: 64,
          firstFrameX: 0,
          firstFrameY: 0
        }
      },
    },
    slime: {
      image: 'slime',
      frames: {
        default: {
          frames: 12,
          frameTime: .2,
          width: 93,
          height: 62,
          firstFrameX: 0,
          firstFrameY: 0
        }
      },
    },
    slimeEnemy: {
      image: 'slime',
      frames: {
        default: {
          frames: 12,
          frameTime: .2,
          width: 93,
          height: 62,
          firstFrameX: 0,
          firstFrameY: 0
        }
      },
    },
    slimePatch: {
      image: 'slimePatch',
      frames: {
        default: {
          frames: 4,
          frameTime: .2,
          width: 32,
          height: 22,
          firstFrameX: 0,
          firstFrameY: 0
        }
      },
    },
    slimePatchEnemy: {
      image: 'slimePatch',
      frames: {
        default: {
          frames: 4,
          frameTime: .2,
          width: 32,
          height: 22,
          firstFrameX: 0,
          firstFrameY: 0
        }
      },
    }
  };

  this.initialize = function(callback) {
    for (let key in sprites) {
      if (!sprites.hasOwnProperty(key)) {
        continue;
      }

      sprites[key]['image'] = Images[sprites[key]['image']];
      sprites[key]['frames'] = processFrameTimings(sprites[key]['frames']);
      this[key] = sprites[key];
    }

    if (callback) {
      callback();
    }
  };

  function processFrameTimings(frames) {
    for (let key in frames) {
      if (!frames.hasOwnProperty(key)) {
        continue;
      }

      let frame = frames[key];
      let timings = [];

      for (let i = 0; i < frame.frames; i++) {
        timings[i] = frame.frameTime;
      }

      if (frame.frameSpecificTimings) {
        for (let index in frame.frameSpecificTimings) {
          if (!frame.frameSpecificTimings.hasOwnProperty(index)) {
            continue;
          }

          timings[index] = frame.frameSpecificTimings[index];
        }
      }

      frames[key]['frameTimings'] = timings;
    }

    return frames;
  }
})();
