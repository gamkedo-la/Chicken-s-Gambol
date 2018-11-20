const Grid = new (function() {

  let levelData;
  let levelGrid;
  let walkableGrid;

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

  this.getPanAsPercentage = function() {
    return {
      x: x / levelCanvas.width,
      y: y / levelCanvas.height
    };
  };

  this.setPanAsPercentage = function(xPerc, yPerc) {
    x = xPerc * levelCanvas.width - (gameCanvas.width / 2);
    y = yPerc * levelCanvas.height - (gameCanvas.height / 2);
  };

  this.getBounds = function() {
    return {
      topLeft: {
        x: x,
        y: y
      },
      bottomRight: {
        x: x + gameCanvas.width,
        y: y + gameCanvas.height
      }
    };
  };

  this.getWorldDimensions = function() {
    return {
      width: levelCanvas.width,
      height: levelCanvas.height
    }
  };

  this.initialize = function(_levelData) {
    walkableGrid = [];
    levelData = _levelData;
    levelGrid = levelData.grid.slice();

    levelCanvas.width = levelData.cols * TILE_SIZE;
    levelCanvas.height = levelData.rows * TILE_SIZE;

    x = y = 0;
    maxX = levelCanvas.width - gameCanvas.width;
    maxY = levelCanvas.height - gameCanvas.height;

    Minimap.initMinimap();

    // draw level-tiles on the canvas
    let tileIndex = 0;
    let tileX = 0, tileY = 0, tileType;
    let row, col;

    for (row = 0; row < levelData.rows; row++) {
      for (col = 0; col < levelData.cols; col++) {
        walkableGrid[tileIndex] = isWalkableTileAtIndex(tileIndex);
        tileIndex++;
      }
    }

    tileIndex = 0;
    for (row = 0; row < levelData.rows; row++) {
      for (col = 0; col < levelData.cols; col++) {
        tileType = processGridCell(tileX + TILE_HALF_SIZE, tileY + TILE_HALF_SIZE, tileIndex);

        drawImage(levelContext, TileImages[tileType], tileX + TILE_HALF_SIZE, tileY + TILE_HALF_SIZE);

        tileX += TILE_SIZE;
        tileIndex++;
      }
      tileX = 0;
      tileY += TILE_SIZE;
    }
  };

  function processGridCell(x, y, i) {
    let tileType = levelGrid[i];
    let settings = { x: x, y: y };
    switch (tileType) {
      // Player units/buildings
      case TILE.PLAYER_CHICKEN:
        Game.createUnit(Chicken, settings);
        break;
//      case TILE.PLAYER_PIG:
//        Game.createUnit(Pig, settings);
//        break;
//      case TILE.PLAYER_GOBLIN:
//        Game.createUnit(Goblin, settings);
//        break;
      case TILE.PLAYER_HOUSE:
        Game.createBuilding(House, settings);
        break;
//      case TILE.PLAYER_BARRACKS:
//        Game.createBuilding(Barracks, settings);
//        break;
//      case TILE.PLAYER_MUD_PIT:
//        Game.createBuilding(MutPit, settings);
//        break;

      // Enemy units/buildings
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
//        Game.createEnemyBuilding(House, settings);
//        break;
//      case TILE.ENEMY_BARRACKS:
//        Game.createEnemyBuilding(Barracks, settings);
//        break;
//      case TILE.ENEMY_MUD_PIT:
//        Game.createEnemyBuilding(MutPit, settings);
//        break;
      default:
        return tileType;
    }

    return levelGrid[i] = levelData.defaultTile;
  }

  this.updateWalkableGridForBuilding = function(buildingX, buildingY, unwalkableGrid) {
    let tileIndex;
    let index = this.coordsToIndex(buildingX, buildingY);

    for (let r = 0; r < unwalkableGrid[1]; r++) {
      for (let c = 0; c < unwalkableGrid[0]; c++) {
        tileIndex = index + c + (r * levelData.cols);
        walkableGrid[tileIndex] = false;
      }
    }
  };

  function isWalkableTileAtIndex(tileIndex) {
    return WALKABLE_TILES.indexOf(levelGrid[tileIndex]) !== -1;
  }

  this.findCollisionWith = function(collision, currentPosition, collisionRanges) {
    let tileIndex = 0;
    let tilePosition = { x: 0, y: 0 };

    let numTilesToCheck = Math.ceil((collisionRanges.soft + TILE_COLLISION_SIZE) / TILE_SIZE);
    let currentTileIndex = this.coordsToIndex(currentPosition.x, currentPosition.y);

    // Start with a tile to the upper left
    let startRow = Math.max(0, Math.floor(currentTileIndex / levelData.cols) - numTilesToCheck);
    let startCol = Math.max(0, currentTileIndex - (startRow * levelData.cols) - numTilesToCheck);
    let startTileIndex = this.tileToIndex(startCol, startRow);

    // For example: if d = 2, then we check these columns/rows:
    // 2 before, current and 2 after
    numTilesToCheck = (numTilesToCheck * 2) + 1;

    for (let r = 0; r < numTilesToCheck; r++) {
      for (let c = 0; c < numTilesToCheck; c++) {
        tileIndex = startTileIndex + c + (r * levelData.cols);

        if (walkableGrid[tileIndex]) {
          continue;
        }

        let row = Math.floor(tileIndex / levelData.cols);
        let col = tileIndex - (row * levelData.cols);
        tilePosition.x = col * TILE_SIZE;
        tilePosition.y = row * TILE_SIZE;

        let dist = distanceBetweenPoints(currentPosition, tilePosition);
        if (collision.distance < dist) {
          continue;
        }

        if (dist < (collisionRanges.soft + TILE_COLLISION_SIZE)) {
          collision.type = 'soft';
          collision.position = tilePosition;
          collision.distance = dist;
        }
      }
    }
  };

  this.findPath = function(start, destination) {
    start = [Math.round(start.x / TILE_SIZE), Math.round(start.y / TILE_SIZE)];
    destination = [
      Math.round(destination.x / TILE_SIZE),
      Math.round(destination.y / TILE_SIZE)
    ];

    let path = findPath(levelData.cols, levelData.rows, start, destination);

    if (path[0] && path[0][0] === start[0] && path[0][1] === start[1]) {
      path.shift();
    }

    return path;
  };

  this.isWalkable = function(col, row) {
    return walkableGrid[this.tileToIndex(col, row)];
  };

  this.tileToIndex = function(col, row) {
    return (col + levelData.cols * row);
  };

  this.coordsToIndex = function(x, y) {
    let col = Math.floor(x / TILE_SIZE);
    let row = Math.floor(y / TILE_SIZE);

    return (col + levelData.cols * row);
  };

  this.update = function(delta) {
    let mousePosition = Input.getMousePosition();
    let step = scrollSpeed * delta;

    if (mousePosition.sx < maxLeftDistance || Input.isDown(KEY.A) || Input.isDown(KEY.LEFT)) {
      x -= step;
    }
    else if (maxRightDistance < mousePosition.sx || Input.isDown(KEY.D) || Input.isDown(KEY.RIGHT)) {
      x += step;
    }

    if (mousePosition.sy < maxTopDistance || Input.isDown(KEY.W) || Input.isDown(KEY.UP)) {
      y -= step;
    }
    else if (maxBottomDistance < mousePosition.sy || Input.isDown(KEY.S) || Input.isDown(KEY.DOWN)) {
      y += step;
    }

    if (x < 0) {
      x = 0;
    }
    else if (y < 0) {
      y = 0;
    }
    if (maxX < x) {
      x = maxX;
    }
    else if (maxY < y) {
      y = maxY;
    }
  };

  this.draw = function() {
    gameContext.drawImage(levelCanvas, x, y, gameCanvas.width, gameCanvas.height, x, y, gameCanvas.width, gameCanvas.height);
  };

  this.drawMinimap = function(minimapX, minimapY, minimapW, minimapH) {
    gameContext.drawImage(levelCanvas, 0, 0, levelCanvas.width, levelCanvas.height, minimapX, minimapY, minimapW, minimapH);
  };

  this.drawDebug = function() {
    if (!DEBUG) {
      return;
    }

    let tileIndex = 0;
    let tileX = 0, tileY = 0;
    for (let row = 0; row < levelData.rows; row++) {
      for (let col = 0; col < levelData.cols; col++) {
        if (!walkableGrid[tileIndex]) {
          drawFillRect(gameContext, tileX, tileY, TILE_SIZE, TILE_SIZE, 'red', .2);
          drawStrokeCircle(gameContext, tileX + TILE_HALF_SIZE, tileY + TILE_HALF_SIZE, TILE_COLLISION_SIZE, 100, 'red', 2, .5);
        }
        tileX += TILE_SIZE;
        tileIndex++;
      }
      tileX = 0;
      tileY += TILE_SIZE;
    }
  };

})();
