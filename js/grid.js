const Grid = new (function() {

  let levelData;
  let levelGrid;

  const scrollSpeed = 200;

  const maxLeftDistance = 20;
  const maxRightDistance = gameCanvas.width - maxLeftDistance;
  const maxTopDistance = 20;
  const maxBottomDistance = gameCanvas.height - maxTopDistance;

  let x = 0;
  let y = 0;
  let maxX = 0;
  let maxY = 0;

  const levelCanvas = document.createElement('canvas');
  const levelContext = levelCanvas.getContext('2d');

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
//  let d = 1;
//  setInterval(function(){
//    x += 10 * d;
//    if (maxX < x || x < 0) {
//      d = -d;
//    }
//  }, 300);
  // @todo debug
    
 this.returnMapRatio = function() {
     return levelCanvas.width/levelCanvas.height;      
 }
 
 this.returnMinimapX = function(worldX, mapW) {
     return (worldX / levelCanvas.width) * mapW + MINI_MAP_MARGIN;
 }
 
 this.returnMinimapY = function(worldY, mapH) {
     return gameCanvas.height - mapH - MINI_MAP_MARGIN + (worldY / levelCanvas.height) * mapH;
 }

  this.initialize = function(_levelData) {
    levelData = _levelData;
    levelGrid = levelData.grid.slice();

    levelCanvas.width = levelData.cols * TILE_WIDTH;
    levelCanvas.height = levelData.rows * TILE_HEIGHT;

    x = y = 0;
    maxX = levelCanvas.width - gameCanvas.width;
    maxY = levelCanvas.height - gameCanvas.height;

    // draw level-tiles on the canvas
    let tileIndex = 0;
    let tileX = 0, tileY = 0, tileType;
    for (let row = 0; row < levelData.rows; row++) {
      for (let col = 0; col < levelData.cols; col++) {
        tileType = processGridCell(tileX + TILE_HALF_WIDTH, tileY + TILE_HALF_HEIGHT, tileIndex);

        drawImage(levelContext, TileImages[tileType], tileX, tileY);

        tileX += TILE_WIDTH;
        tileIndex++;
      }
      tileX = 0;
      tileY += TILE_HEIGHT;
    }
  };


  function processGridCell(x, y, i) {
    let tileType = levelGrid[i];
    let settings = {x: x, y: y};
    switch (tileType) {
      case TILE.PLAYER_CHICKEN:
        Game.createUnit(Chicken, settings);
        break;
//      case TILE.PLAYER_PIG:
//        Game.createUnit(Pig, settings);
//        break;
//      case TILE.PLAYER_GOBLIN:
//        Game.createUnit(Goblin, settings);
//        break;
//      case TILE.PLAYER_HOUSE:
//        Game.createUnit(House, settings);
//        break;
//      case TILE.PLAYER_BARRACKS:
//        Game.createUnit(Barracks, settings);
//        break;
//      case TILE.PLAYER_MUD_PIT:
//        Game.createUnit(MutPit, settings);
//        break;
      case TILE.ENEMY_CHICKEN:
        Game.createEnemy(ChickenEnemy, settings);
        break;
//      case TILE.ENEMY_PIG:
//        Game.createEnemy(Pig, settings);
//        break;
//      case TILE.ENEMY_GOBLIN:
//        Game.createEnemy(Goblin, settings);
//        break;
//      case TILE.ENEMY_HOUSE:
//        Game.createEnemy(House, settings);
//        break;
//      case TILE.ENEMY_BARRACKS:
//        Game.createEnemy(Barracks, settings);
//        break;
//      case TILE.ENEMY_MUD_PIT:
//        Game.createEnemy(MutPit, settings);
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

  this.update = function(delta) {
    let mousePosition = Input.getMousePosition();
    let step = scrollSpeed * delta;

    if (mousePosition.sx < maxLeftDistance || Input.isDown(KEY.A) || Input.isDown(KEY.LEFT)) {
      x = Math.max(0, x - step);
    }
    else if (maxRightDistance < mousePosition.sx || Input.isDown(KEY.D) || Input.isDown(KEY.RIGHT)) {
      x = Math.min(maxX, x + step);
    }

    if (mousePosition.sy < maxTopDistance || Input.isDown(KEY.W) || Input.isDown(KEY.UP)) {
      y = Math.max(0, y - step);
    }
    else if (maxBottomDistance < mousePosition.sy || Input.isDown(KEY.S) || Input.isDown(KEY.DOWN)) {
      y = Math.min(maxY, y + step);
    }
  };

  this.draw = function() {
    gameContext.drawImage(levelCanvas, x, y, gameCanvas.width, gameCanvas.height, x, y, gameCanvas.width, gameCanvas.height);
  };

})();
