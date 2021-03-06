const Grid = new (function() {

  let initialized = false;

  let tiles;
  let levelData;
  let levelGrid;
  let walkableGrid;

  const maxLeftDistance = 20;
  const maxRightDistance = gameCanvas.width - maxLeftDistance;
  const maxTopDistance = 20;
  const maxBottomDistance = gameCanvas.height - maxTopDistance;

  let x = 0;
  let y = 0;
  let maxX = 0;
  let maxY = 0;

  const canvasHalfWidth = gameCanvas.width / 2;
  const canvasHalfHeight = gameCanvas.height / 2;

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
    x = Math.round(xPerc * levelCanvas.width - canvasHalfWidth);
    y = Math.round(yPerc * levelCanvas.height - canvasHalfHeight);

    fixXY();
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
      height: levelCanvas.height,
      cols: levelData.cols,
      rows: levelData.rows
    }
  };

  this.isInitialized = function() {
    return initialized;
  };

  this.unInitialize = function() {
    initialized = false;
    walkableGrid = [];
    levelData = {};
    x = y = 0;
    maxX = maxY = 0;

    tiles = [];
  };

  this.initialize = function(_levelData) {
    initialized = true;

    walkableGrid = [];
    levelData = _levelData;
    levelGrid = levelData.grid.slice();

    levelCanvas.width = levelData.cols * TILE_SIZE;
    levelCanvas.height = levelData.rows * TILE_SIZE;

    x = y = 0;
    maxX = levelCanvas.width - gameCanvas.width;
    maxY = levelCanvas.height - gameCanvas.height;

    tiles = getLevelTiles(true);

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

        drawTile(tileType, tileX, tileY);

        tileX += TILE_SIZE;
        tileIndex++;
      }
      tileX = 0;
      tileY += TILE_SIZE;
    }
  };

  function drawTile(tileType, tileX, tileY) {
    drawTileImage(levelContext, Images.levels, tiles[levelData.defaultTile].x, tiles[levelData.defaultTile].y, tileX, tileY);
    drawTileImage(levelContext, Images.levels, tiles[tileType].x, tiles[tileType].y, tileX, tileY);
  }

  function processGridCell(x, y, i) {
    let tileType = levelGrid[i];
    let settings = { x: x, y: y };
    let chickenSettings = {
      x: settings.x + (MIN_COLS_FREE - 1) * TILE_SIZE,
      y: settings.y + (MIN_ROWS_FREE - 1) * TILE_SIZE
    };
    let unit;

    switch (tileType) {
      case 0:
        // do nothing, because this should be replaced with the default tile
        break;
      case TILE.TEAM_PLAYER:
        unit = Game.create(Slime, TEAM_PLAYER, settings);
        unit = Game.create(Chicken, TEAM_PLAYER, chickenSettings);
        break;
      case TILE.TEAM_ENEMY:
        unit = Game.create(SlimeEnemy, TEAM_ENEMY, settings);
        unit = Game.create(ChickenEnemy, TEAM_ENEMY, chickenSettings);
        break;
      // Player units/buildings
      case TILE.PLAYER_CHICKEN:
        Game.create(Chicken, TEAM_PLAYER, settings);
        break;
      case TILE.PLAYER_PIG:
        Game.create(Pig, TEAM_PLAYER, settings);
        break;
      case TILE.PLAYER_GOBLIN:
        Game.create(Goblin, TEAM_PLAYER, settings);
        break;
      case TILE.PLAYER_SLIME:
        unit = Game.create(Slime, TEAM_PLAYER, settings);
        break;
      case TILE.PLAYER_HOUSE:
        unit = Game.create(House, TEAM_PLAYER, settings);
        unit.setComplete();
        break;
      case TILE.PLAYER_BARRACKS:
        unit = Game.create(Barracks, TEAM_PLAYER, settings);
        unit.setComplete();
        break;
      case TILE.PLAYER_MUD_PIT:
        unit = Game.create(MudPit, TEAM_PLAYER, settings);
        unit.setComplete();
        break;

      // Enemy units/buildings
      case TILE.ENEMY_CHICKEN:
        Game.create(ChickenEnemy, TEAM_ENEMY, settings);
        break;
      case TILE.ENEMY_PIG:
        Game.create(PigEnemy, TEAM_ENEMY, settings);
        break;
      case TILE.ENEMY_GOBLIN:
        Game.create(GoblinEnemy, TEAM_ENEMY, settings);
        break;
      case TILE.ENEMY_SLIME:
        Game.create(SlimeEnemy, TEAM_ENEMY, settings);
        break;
      case TILE.ENEMY_HOUSE:
        unit = Game.create(HouseEnemy, TEAM_ENEMY, settings);
        unit.setComplete();
        break;
      case TILE.ENEMY_BARRACKS:
        unit = Game.create(BarracksEnemy, TEAM_ENEMY, settings);
        unit.setComplete();
        break;
      case TILE.ENEMY_MUD_PIT:
        unit = Game.create(MudPitEnemy, TEAM_ENEMY, settings);
        unit.setComplete();
        break;
    }

    if (tileType && tiles[tileType]) {
      return tileType;
    }

    return levelGrid[i] = levelData.defaultTile;
  }

  this.canPlaceBuildingAt = function(buildingX, buildingY, unwalkableGrid) {
    let tileIndex;
    let index = this.coordsToIndex(buildingX, buildingY);

    for (let r = 0; r < unwalkableGrid[1]; r++) {
      for (let c = 0; c < unwalkableGrid[0]; c++) {
        tileIndex = index + c + (r * levelData.cols);
        if (!walkableGrid[tileIndex]) {
          return false;
        }
      }
    }

    return true;
  };

  this.updateWalkableGridForBuilding = function(buildingX, buildingY, unwalkableGrid, state) {
    let tileIndex;
    let index = this.coordsToIndex(buildingX, buildingY);

    if (state === undefined) {
      state = false;
    }

    for (let r = 0; r < unwalkableGrid[1]; r++) {
      for (let c = 0; c < unwalkableGrid[0]; c++) {
        tileIndex = index + c + (r * levelData.cols);
        walkableGrid[tileIndex] = state;
      }
    }
  };

  function isWalkableTileAtIndex(tileIndex) {
    return levelGrid[tileIndex] === 0 || WALKABLE_TILES.indexOf(levelGrid[tileIndex]) !== -1;
  }

  this.findCollisionWith = function(collision, currentPosition, collisionRange) {
    let tileIndex = 0;
    let tilePosition = { x: 0, y: 0 };

    let numTilesToCheck = Math.ceil((collisionRange + TILE_COLLISION_SIZE) / TILE_SIZE);
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

        if (dist < (collisionRange + TILE_COLLISION_SIZE)) {
          collision.type = 'soft';
          collision.position = tilePosition;
          collision.distance = dist;
        }
      }
    }
  };

  this.findPath = function(start, destination) {
    start = [
      Math.floor(start.x / TILE_SIZE),
      Math.floor(start.y / TILE_SIZE)
    ];

    destination = [
      Math.floor((destination.x) / TILE_SIZE),
      Math.floor((destination.y) / TILE_SIZE)
    ];

    while (!this.isWalkable(destination[0], destination[1])){
      destination = this.findAlternateWalkableDestination(destination);
    }

    let path = findPath(levelData.cols, levelData.rows, start, destination);

    if (path[0] && path[0][0] === start[0] && path[0][1] === start[1]) {
      path.shift();
    }

    return path;
  };

  this.findAlternateWalkableDestination = function(destination){

    while ((destination[0] > this.getBounds().bottomRight.x ) || (destination[1] > this.getBounds().bottomRight.y)){
      while (!this.isWalkable(destination[0], destination[1])){
        destination[0]--;
        destination[1]--;
      }
      return destination;
    }

    destination[0]++;
    destination[1]++;

    return destination;

/*
    if(destination[1] > this.getBounds().bottomRight.y){
      while (!this.isWalkable(destination[0], destination[1])){
        destination[1]--;
      }
    } else {
      destination[1]++;
    }
*/
    
  };

  this.isWalkableCoords = function(x, y) {
    return this.isWalkableIndex(this.coordsToIndex(x, y));
  };

  this.isWalkable = function(col, row) {
    return this.isWalkableIndex(this.tileToIndex(col, row));
  };

  this.isWalkableIndex = function(index) {
    return walkableGrid[index];
  };

  this.tileToIndex = function(col, row) {
    return (col + levelData.cols * row);
  };

  this.coordsToIndex = function(x, y) {
    let col = Math.floor(x / TILE_SIZE);
    let row = Math.floor(y / TILE_SIZE);

    return (col + levelData.cols * row);
  };

  this.normalizeCoords = function(coords) {
    let col = Math.floor(coords.x / TILE_SIZE);
    let row = Math.floor(coords.y / TILE_SIZE);

    coords.x = col * TILE_SIZE + TILE_HALF_SIZE;
    coords.y = row * TILE_SIZE + TILE_HALF_SIZE;
  };

  this.update = function(delta) {
    let oldX = x;
    let oldY = y;
    let mousePosition = Input.getMousePosition();
    if (Interface.hasMouseOver(mousePosition)) {
      document.body.style.cursor = "url('img/chickenCursor.png'), auto";
      return;
    }

    let step = GRID_SCROLL_SPEED * delta;

    if (mousePosition.sx < maxLeftDistance || Input.isDown(KEY.A) || Input.isDown(KEY.LEFT)) {
      x -= step;
      document.body.style.cursor = "url('img/arrowLeft.png'), auto";
    }
    else if (maxRightDistance < mousePosition.sx || Input.isDown(KEY.D) || Input.isDown(KEY.RIGHT)) {
      x += step;
      document.body.style.cursor = "url('img/arrowRight.png'), auto";
    }

    if (mousePosition.sy < maxTopDistance || Input.isDown(KEY.W) || Input.isDown(KEY.UP)) {
      y -= step;
      document.body.style.cursor = "url('img/arrowUp.png'), auto";
    }
    else if (maxBottomDistance < mousePosition.sy || Input.isDown(KEY.S) || Input.isDown(KEY.DOWN)) {
      y += step;
      document.body.style.cursor = "url('img/arrowDown.png'), auto";
    }

    if (oldX === x && oldY === y) {
      document.body.style.cursor = "url('img/chickenCursor.png'), auto";
    }

    fixXY();
  };

  function fixXY() {
    if (x < 0) {
      x = 0;
      document.body.style.cursor = "url('img/noArrowLeft.png'), auto";
    }
    else if (maxX < x) {
      x = maxX;
      document.body.style.cursor = "url('img/noArrowRight.png'), auto";
    }
    if (y < 0) {
      y = 0;
      document.body.style.cursor = "url('img/noArrowUp.png'), auto";
    }
    else if (maxY < y) {
      y = maxY;
      document.body.style.cursor = "url('img/noArrowDown.png'), auto";
    }
  }

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
