const Grid = new (function() {

  let levelData;
  let levelGrid;

  let x = 0;
  let y = 0;
  let maxX = 0;
  let maxY = 0;

  let levelCanvas = document.createElement('canvas');
  let levelContext = levelCanvas.getContext('2d');

  this.getPanPosition = function() {
    return {
      x: x,
      y: y
    };
  };

  this.getBounds = function() {
    return {
      topLeft : {
        x: x,
        y: y
      },
      bottomRight: {
        x: x + levelCanvas.width,
        y: y + levelCanvas.height
      }
    };
  };

  // @todo debug
  let d = 1;
  setInterval(function(){
    x += 10 * d;
    if (maxX < x || x < 0) {
      d = -d;
    }
  }, 300);
  // @todo debug

  this.initialize = function(_levelData) {
    levelData = _levelData;
    levelGrid = levelData.grid.slice();

    levelCanvas.width = levelData.cols * TILE_WIDTH;
    levelCanvas.height = levelData.rows * TILE_HEIGHT;

    x = y = 0;
    maxX = levelCanvas.width - gameCanvas.width;
    maxY = levelCanvas.height - gameCanvas.height;

    // draw level-tiles on the canvas
    let tileHalfWidth = TILE_WIDTH / 2;
    let tileHalfHeight = TILE_HEIGHT / 2;
    let tileIndex = 0;
    let tileX = 0, tileY = 0, tileType;
    for (let row = 0; row < levelData.rows; row++) {
      for (let col = 0; col < levelData.cols; col++) {
        tileType = processGridCell(tileX + tileHalfWidth, tileY + tileHalfHeight, tileIndex);

        drawImage(levelContext, TileImages[tileType], tileX, tileY);

        tileX += TILE_WIDTH;
        tileIndex++;
      }
      tileX = 0;
      tileY += TILE_HEIGHT;
    }

    // debug lines
    // @todo remove!
    drawStrokeRect(levelContext, 10, 10, levelCanvas.width - 20, 20, 'red', 3);
    drawStrokeRect(levelContext, 10, levelCanvas.height - 30, levelCanvas.width - 20, 20, 'red', 3);
    drawStrokeRect(levelContext, 10, 10, 20, levelCanvas.height - 20, 'red', 3);
    drawStrokeRect(levelContext, levelCanvas.width - 30, 10, 20, levelCanvas.height - 20, 'red', 3);
    drawStrokeRect(levelContext, 1, 1, levelCanvas.width - 2, levelCanvas.height - 2, 'blue', 2);
    drawStrokeRect(levelContext, levelCanvas.width / 2, 10, 2, levelCanvas.height - 20, 'red', 3);
    drawStrokeRect(levelContext, 10, levelCanvas.height / 2, levelCanvas.width - 20, 2, 'red', 3);
  };

  function processGridCell(x, y, i) {
    let tileType = levelGrid[i];
    switch (tileType) {
      case TILE.PLAYER_CHICKEN:
        Game.createUnit(Chicken2, {x: x, y: y});
        break;
//      case TILE.PLAYER_PIG:
//        Game.createUnit(Pig, {x: x, y: y});
//        break;
//      case TILE.PLAYER_GOBLIN:
//        Game.createUnit(Goblin, {x: x, y: y});
//        break;
//      case TILE.PLAYER_HOUSE:
//        Game.createUnit(House, {x: x, y: y});
//        break;
//      case TILE.PLAYER_BARRACKS:
//        Game.createUnit(Barracks, {x: x, y: y});
//        break;
//      case TILE.PLAYER_MUD_PIT:
//        Game.createUnit(MutPit, {x: x, y: y});
//        break;
      case TILE.ENEMY_CHICKEN:
        Game.createEnemy(Chicken, {x: x, y: y});
        break;
//      case TILE.ENEMY_PIG:
//        Game.createEnemy(Pig, {x: x, y: y});
//        break;
//      case TILE.ENEMY_GOBLIN:
//        Game.createEnemy(Goblin, {x: x, y: y});
//        break;
//      case TILE.ENEMY_HOUSE:
//        Game.createEnemy(House, {x: x, y: y});
//        break;
//      case TILE.ENEMY_BARRACKS:
//        Game.createEnemy(Barracks, {x: x, y: y});
//        break;
//      case TILE.ENEMY_MUD_PIT:
//        Game.createEnemy(MutPit, {x: x, y: y});
//        break;
      default:
        return tileType;
    }

    return levelGrid[i] = levelData.defaultTile;
  }

  function tileToIndex(col, row) {
    return (col + levelData.cols * row);
  }

  this.coordsToIndex = function(x, y) {
    let col = Math.floor(x / TILE_WIDTH);
    let row = Math.floor(y / TILE_HEIGHT);

    return (col + levelData.cols * row);
  };

  // @todo track mouse position to move map
  // @todo track cursor/wsad keys to move map

  this.draw = function() {
    gameContext.drawImage(levelCanvas, x, y, gameCanvas.width, gameCanvas.height, x, y, gameCanvas.width, gameCanvas.height);
  };

})();
