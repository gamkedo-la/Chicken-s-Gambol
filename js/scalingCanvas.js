let drawCanvas, drawContext;
let drawScaleX, drawScaleY, aspectRatio;

function initDrawingCanvas() {
  drawCanvas = document.getElementById('drawCanvas');
  drawContext = drawCanvas.getContext('2d');

  window.addEventListener('resize', resizeWindow);

  aspectRatio = gameCanvas.width / gameCanvas.height;

  setTimeout(resizeWindow, 1);
}

function scaleCoordinates(x, y) {
  return {
    x: x / drawScaleX,
    y: y / drawScaleY
  };
}

function redrawCanvas() {
  drawContext.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
  drawContext.drawImage(gameCanvas, 0, 0, gameCanvas.width, gameCanvas.height, 0, 0, drawCanvas.width, drawCanvas.height);
}

function resizeWindow() {
  var maxHeight = window.innerHeight - 2;
  var maxWidth = window.innerWidth - 2;

  if (maxWidth / maxHeight < aspectRatio) {
    drawCanvas.width = maxWidth;
    drawCanvas.height = Math.floor(maxWidth / aspectRatio);
  }
  else {
    drawCanvas.height = maxHeight;
    drawCanvas.width = Math.floor(maxHeight * aspectRatio);
  }

  drawCanvas.width -= CANVAS_PADDING;
  drawCanvas.height -= CANVAS_PADDING;

  drawScaleX = drawCanvas.width / gameCanvas.width;
  drawScaleY = drawCanvas.height / gameCanvas.height;

  console.log('resized', drawScaleX, drawScaleY);
}
