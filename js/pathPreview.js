
function pathPreviewer() {

  let path = null;
  let elapsedSinceUpdate = 0;
  const updateInterval = 1; // in seconds (so we don't calculate every single frame)

  this.update = function(delta) {
    elapsedSinceUpdate += delta;
    if (elapsedSinceUpdate >= updateInterval) {
      //console.log("time to update the path previews!");
      elapsedSinceUpdate -= updateInterval;
      let pos = Input.getMousePosition();
      // TODO:
      // for (unit in Selection.selection)
      //  path = Grid.findPath([pos.x,pos.y], [unit.x,unit.y]);
    }
  }

  this.draw = function() {
    if (path && path.length) {
      for (let step=0,len=path.length; step<len; step++) {
        let x = path[step][0];
        let y = path[step][1];
        // TODO: render sprites
        //console.log("pathPreview is drawing!");
      }
    }
  }

}
