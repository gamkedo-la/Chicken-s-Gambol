const minimap = new(function () {
    var minimapH;
    var minimapW;
    
    this.initMinimap = function() {
        minimapH = 100
        minimapW = minimapH * Grid.returnMapRatio()
    }
    
    this.draw = function () {
        drawFillRect(gameContext, MINI_MAP_MARGIN,
            gameCanvas.height - minimapH - MINI_MAP_MARGIN,
            minimapW, minimapH, "green");

        callbackList(Game.units, "minimapDraw", [minimapW, minimapH, "yellow"]);
        callbackList(Game.enemies, "minimapDraw", [minimapW, minimapH, "red"]);
    }
})();
