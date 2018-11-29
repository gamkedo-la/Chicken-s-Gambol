function pathPreviewer() {

  let path = null;
  let multiPaths = []; // since we might have >1 unit selected
  let elapsedSinceUpdate = 0;
  const updateInterval = 0.05; // in seconds (so we don't calculate every single frame)

  this.update = function(delta) {
    elapsedSinceUpdate += delta;
    if (updateInterval <= elapsedSinceUpdate) {
      multiPaths = []; // reset
      elapsedSinceUpdate -= updateInterval;
      let pos = Input.getMousePosition();
      let selection = Selection.getSelection();
      let len = selection.length;
      //console.log("time to update " + len + " path previews!");
      for (let num = 0; num < len; num++) {
        path = Grid.findPath(pos, selection[num]);
        if (path && path.length) {
          multiPaths.push(path);
        }
      }
    }
  };

  this.draw = function() {
    if (Interface.hasMouseOver(Input.getMousePosition())) {
      return;
    }

    //if (multiPaths.length) { console.log("pathPreview.drawing " + multiPaths.length); }
    for (let pathNum = 0; pathNum < multiPaths.length; pathNum++) {
      let path = multiPaths[pathNum];
      for (let step = 0, len = path.length - 1; step < len; step++) {
        let x = path[step][0];
        let y = path[step][1];
        let nx = path[step + 1][0];
        let ny = path[step + 1][1];
        let angle = Math.atan2(y - ny, x - nx);
        drawImageRotatedAlpha(gameContext, Images.pathPreviewIcon, x * TILE_SIZE + TILE_HALF_SIZE, y * TILE_SIZE + TILE_HALF_SIZE, angle);
      }
    }
  };

}
